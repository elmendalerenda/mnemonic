require 'roda'
require 'searchbing'
require './lib/speech/authorization'
require './lib/speech/service'
require './lib/image'
require './lib/word2num'

class API < Roda
  plugin :json
  route do |r|
    r.is "search" do
      r.get do
        { images: ImageServiceFactory.get_service.retrieve(r['q']) }
      end
    end

    r.is "recognize" do
      r.post do
        begin
          credentials = Speech::Authorization.credentials(client_id: ENV['client_id'], client_secret: ENV['client_secret'])
          text = Speech::Service.recognize(request.body.read.to_s, credentials)
          num = Word2Num.translate(text)
          { text: text, number: num }
        rescue Speech::InvalidCredentials
          response.status = 500
          { message: "invalid credentials" }
        end
      end
    end
  end
end
