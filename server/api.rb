require 'grape'
require 'searchbing'

class API < Grape::API
  format :json

  params do
    requires :q, type: String
  end

  get :search do
    { images: ImageServiceFactory.get_service.retrieve(params[:q]) }
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
  def self.retrieve(criteria, n=1)
    bing_image = Bing.new(ENV['bing_key'], n, 'Image')
    bing_results = bing_image.search(criteria)
    bing_results.map { |e| e[:Image][0][:MediaUrl] }
  end
end
