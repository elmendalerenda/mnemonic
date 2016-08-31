require 'minitest/autorun'
require './lib/speech/authorization'
require './lib/speech/service'
require './test/stubs'

class RecognizerTest < Minitest::Test
  include Stubs

  def test_obtain_token
    authorization = Speech::Authorization.new
    authorization.ms_service = stub(authenticate: {'access_token' => 'my_token'}.to_json)

    assert_equal 'my_token', authorization.credentials({client_id: 'invalid', client_secret: 'invalid'}).token
  end

  def test_authentication_fails
    authorization = Speech::Authorization.new
    ms_service = Minitest::Mock.new
    authorization.ms_service = stub(authenticate: { }.to_json)

    credentials = authorization.credentials({client_id: 'invalid', client_secret: 'invalid'})
    assert !credentials.valid?
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

end
