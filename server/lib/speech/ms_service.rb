require 'httparty'
require 'securerandom'

module Speech
  class MSService
    class << self
      # https://www.microsoft.com/cognitive-services/en-us/speech-api/documentation/API-Reference-REST/BingVoiceRecognition#authenticate-the-api-call
      def authenticate(subscription_key:)
        response = HTTParty.post(
          "https://api.cognitive.microsoft.com/sts/v1.0/issueToken",
          { headers: {"Ocp-Apim-Subscription-Key" => subscription_key } }
        )

        response.body
      end

      # https://www.microsoft.com/cognitive-services/en-us/speech-api/documentation/API-Reference-REST/BingVoiceRecognition#access-the-speech-service-endpoint
      def recognize(content:, token:)
        url = 'https://speech.platform.bing.com/recognize?version=3.0' +
          "&requestid=#{SecureRandom.uuid}" +
          "&appID=#{SecureRandom.uuid}" +
          "&instanceid=#{SecureRandom.uuid}" +
          '&format=json&locale=es-ES&device.os=linux&scenarios=ulm'

          opts = { headers: {"Authorization" => "Bearer #{token}",
                             "Content-Type" => "audio/wav; codec=audio/pcm; samplerate=16000; sourcerate=8000; trustsourcerate=false" },
                             body: content.to_s }

          HTTParty.post(url, opts).body
      end
    end
  end
end
