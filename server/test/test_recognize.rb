require 'minitest/autorun'
require './lib/speech/authentication'
require './lib/speech/service'

module HTTParty
  MockResponse = Struct.new(:body)
  class << self
    attr_reader :last_params
    def post(*params)
      @last_params = params
      MockResponse.new({'access_token' => 'my_token'}.to_json)
    end
  end
end


class RecognizerTest < Minitest::Test
  MockResponse = Struct.new(:body)

  def test_obtain_token
    HTTParty.stub :post, authentication_response do
      assert_equal 'my_token', Speech::Authentication.token
    end
  end

  def test_authentication_calls_ms_service
    Speech::Authentication.token(client_id: 'any_client_id', client_secret: 'any_client_secret')

    assert_equal HTTParty.last_params[0], "https://oxford-speech.cloudapp.net/token/issueToken"
    assert_equal HTTParty.last_params[1][:headers], {"Content-Type" => "application/x-www-form-urlencoded" }
    assert_equal HTTParty.last_params[1][:body],  "grant_type=client_credentials&client_id=any_client_id&client_secret=any_client_secret&scope=https%3A%2F%2Fspeech.platform.bing.com"
  end

  def test_recognize_returns_the_recognized_string
    service = Speech::Service.new

    HTTParty.stub :post, recognize_service_response do
      assert_equal 'hey hello', service.recognize('', '')
    end
  end

  def test_recognize_calls_ms_service
    service = Speech::Service.new
    httpMock = Minitest::Mock.new
    service.httpLib = httpMock
    httpMock.expect :post, recognize_service_response,
    ["https://speech.platform.bing.com/recognize?version=3.0&requestid=random&appID=random&instanceid=random&format=json&locale=es-ES&device.os=linux&scenarios=ulm",
    {headers: {"Authorization" => "Bearer tokenwadus",
               "Content-Type" => "audio/wav; codec=audio/pcm; samplerate=16000; sourcerate=8000; trustsourcerate=false" },
     body: 'mybinarycontent' }]

    SecureRandom.stub :uuid, 'random' do
      service.recognize('mybinarycontent', 'tokenwadus')
    end

    httpMock.verify
  end

  def recognize_service_response
    MockResponse.new({'results' => [{'lexical' => 'hey hello'}]}.to_json)
  end

  def authentication_response
    MockResponse.new({'access_token' => 'my_token'}.to_json)
  end
end
