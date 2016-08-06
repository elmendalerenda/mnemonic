require 'minitest/autorun'
require './lib/speech/authentication'

module HTTParty
  Response = Struct.new(:body)
  class << self
    attr_reader :last_params
    def post(*params)
      @last_params = params
      Response.new({'access_token' => 'my_token'})
    end
  end
end

class RecognizerTest < Minitest::Test
  def test_obtain_token
    token = Speech::Authentication.token

    assert_equal 'my_token', token
  end

  def test_authentication_calls_ms_service
    Speech::Authentication.token(client_id: 'any_client_id', client_secret: 'any_client_secret')

    assert_equal HTTParty.last_params[0], "https://oxford-speech.cloudapp.net/token/issueToken"
    assert_equal HTTParty.last_params[1][:headers], {"Content-Type" => "application/x-www-form-urlencoded" }
    assert_equal HTTParty.last_params[1][:body],  "grant_type=client_credentials&client_id=any_client_id&client_secret=any_client_secret&scope=https%3A%2F%2Fspeech.platform.bing.com"
  end
end

