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

    assert last_response.ok?
    assert JSON.parse(last_response.body).has_key?('text')
    assert Speech.recognize_called
  end
end

class Speech
  class << self
    attr_reader :recognize_called
    def recognize
      @recognize_called = true
      ""
    end
  end
end

