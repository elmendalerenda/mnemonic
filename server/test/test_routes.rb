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

    assert JSON.parse(last_response.body)['message'], 'invalid credentials'
  end
end
