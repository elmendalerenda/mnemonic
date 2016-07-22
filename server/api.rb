require 'roda'
require 'searchbing'

class API < Roda
  plugin :json
  route do |r|
    r.is "search" do
      r.get do
        { images: ImageServiceFactory.get_service.retrieve(r['q']) }
      end

    end
  end
end

class ImageServiceFactory
  def self.get_service
    imageService = Image
    imageService = TestImage if(ENV['bing_key'].nil?)

    return imageService
  end
end

class TestImage
  def self.retrieve(_, _=nil)
    image = ['test_1.jpg', 'test_2.jpg'].shuffle.first
    ["images/#{image}"]
  end
end

class Image
  def self.retrieve(criteria, n=9)
    bing_image = Bing.new(ENV['bing_key'], n, 'Image', { Market: 'ES-es' })
    bing_results = bing_image.search(criteria)
    bing_results[0][:Image].map { |e| e[:MediaUrl] }
  end
end
