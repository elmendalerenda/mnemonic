require 'roda'
require 'searchbing'
require 'voice_recognition_bing'
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
          credentials = VoiceRecognitionBing::Authorization.credentials
          text = VoiceRecognitionBing::Service.recognize(request.body.read.to_s, credentials)
          num = Word2Num.translate(text)
          { text: text, number: num }
        rescue VoiceRecognitionBing::InvalidCredentials
          response.status = 500
          { message: "invalid credentials" }
        end
      end
    end
  end
end
