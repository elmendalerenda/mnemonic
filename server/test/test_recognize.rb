require 'minitest/autorun'
require './lib/speech/authorization'
require './lib/speech/service'
require './test/stubs'

class RecognizerTest < Minitest::Test
  include Stubs

  def test_obtain_token
    authorization = Speech::Authorization.new
    authorization.http_lib = stub(post: authentication_response)

    assert_equal 'my_token', authorization.credentials({client_id: '', client_secret: ''}).token
  end

  def test_authentication_calls_ms_service
    authorization = Speech::Authorization.new
    http_mock = Minitest::Mock.new
    authorization.http_lib = http_mock

    http_mock.expect :post, authentication_response,
      [ "https://oxford-speech.cloudapp.net/token/issueToken",
        { headers: {"Content-Type" => "application/x-www-form-urlencoded" },
          body: "grant_type=client_credentials&client_id=any_client_id&client_secret=any_client_secret&scope=https%3A%2F%2Fspeech.platform.bing.com"
    }]
    authorization.credentials(client_id: 'any_client_id', client_secret: 'any_client_secret')

    http_mock.verify
  end

  def test_recognize_returns_the_recognized_string
    service = Speech::Service.new
    service.http_lib = stub(post: recognize_service_response)

    assert_equal 'hey hello', service.recognize('', Speech::Credentials.new('valid'))
  end

  def test_recognize_calls_ms_service
    service = Speech::Service.new
    httpMock = Minitest::Mock.new
    service.http_lib = httpMock
    httpMock.expect :post, recognize_service_response,
      ["https://speech.platform.bing.com/recognize?version=3.0&requestid=random&appID=random&instanceid=random&format=json&locale=es-ES&device.os=linux&scenarios=ulm",
       {headers: {"Authorization" => "Bearer tokenwadus",
                  "Content-Type" => "audio/wav; codec=audio/pcm; samplerate=16000; sourcerate=8000; trustsourcerate=false" },
                  body: 'mybinarycontent' }]

    SecureRandom.stub :uuid, 'random' do
      service.recognize('mybinarycontent', Speech::Credentials.new('tokenwadus'))
    end

    httpMock.verify
  end

  def test_recognize_raises_when_invalid_credentials
    assert_raises(Speech::InvalidCredentials) {
      Speech::Service.recognize('', Speech::NullCredentials.new)
    }
  end

  MockResponse = Struct.new(:body)
  def recognize_service_response
    MockResponse.new({'results' => [{'lexical' => 'hey hello'}]}.to_json)
  end

  def authentication_response
    MockResponse.new({'access_token' => 'my_token'}.to_json)
  end
end
