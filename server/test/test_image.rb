require 'minitest/autorun'
require './lib/image'

class ImageTest < Minitest::Test
  def test_factory
    assert_equal(TestImage, ImageServiceFactory.get_service)
    ENV['bing_key'] = 'anything'
    assert_equal(Image, ImageServiceFactory.get_service)
    ENV['bing_key'] = nil
  end
end
