require 'grape'
require 'searchbing'

class API < Grape::API
  format :json

  params do
    requires :q, type: String
  end
  get :images do
    { images: Image.retrieve(params[:q]) }
  end
end

class Image
  def self.retrieve(criteria, n=1)
    bing_image = Bing.new(ENV['bing_key'], n, 'Image')
    bing_results = bing_image.search(criteria)
    bing_results.map { |e| e[:Image][0][:MediaUrl] }
  end
end
