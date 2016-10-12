require 'minitest/autorun'
require './lib/speech/authorization'
require './lib/speech/service'
require './test/stubs'

class RecognizerTest < Minitest::Test
  include Stubs

  def test_obtain_token
    authorization = Speech::Authorization.new
    authorization.ms_service = stub(authenticate: 'my_token')

    assert_equal 'my_token', authorization.credentials({subscription_key: 'invalid'}).token
  end

  def test_authentication_fails
    authorization = Speech::Authorization.new
    ms_service = Minitest::Mock.new
    authorization.ms_service = stub(authenticate: { }.to_json)

    credentials = authorization.credentials({subscription_key: 'invalid'})
    assert !credentials.valid?
  end

  def test_recognize_returns_the_recognized_string
    service = Speech::Service.new
    service.ms_service = stub(recognize: recognize_service_response)

    assert_equal 'hey hello', service.recognize('', Speech::Credentials.new('valid'))
  end

  def test_recognize_raises_when_invalid_credentials
    assert_raises(Speech::InvalidCredentials) {
      Speech::Service.recognize('', Speech::NullCredentials.new)
    }
  end

  def test_integration
    skip
    client_id = ENV['subscription_key']
    content = File.binread('./test/fixture/88.wav')

    credentials = Speech::Authorization.credentials({subscription_key: client_id})

    response = Speech::Service.recognize(content, credentials)

    assert_equal "ochenta y ocho", response
  end

  def recognize_service_response
    {'results' => [{'lexical' => 'hey hello'}]}.to_json
  end
end
