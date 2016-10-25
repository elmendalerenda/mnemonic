require 'minitest/autorun'
require 'rack/test'
require './api'

class RouteTest < Minitest::Test
  include Rack::Test::Methods

  def app
    API
  end

  def test_recognize_returns_json_with_text
    post '/recognize'

    assert_equal JSON.parse(last_response.body)['message'], 'invalid credentials'
  end

  def test_recognize_integration
    skip
    VoiceRecognitionBing.configure do |config|
      config.subscription_key = ENV['subscription_key']
    end

    post '/recognize', Rack::Test::UploadedFile.new("./test/fixture/88.wav", "audio/wav")

    assert_equal JSON.parse(last_response.body)['text'], 'ochenta y ocho'
    assert_equal JSON.parse(last_response.body)['number'], 88
  end
end
