require 'httparty'
require 'securerandom'

module Speech
  class Service

    attr_writer :httpLib

    def post(url, opts)
      klass = @httpLib || HTTParty
      klass.post(url, opts)
    end

    # Implementation of https://www.microsoft.com/cognitive-services/en-us/speech-api/documentation/API-Reference-REST/BingVoiceRecognition#access-the-speech-service-endpoint
    def recognize(content, token)
      url = 'https://speech.platform.bing.com/recognize?version=3.0' +
        "&requestid=#{SecureRandom.uuid}" +
        "&appID=#{SecureRandom.uuid}" +
        "&instanceid=#{SecureRandom.uuid}" +
        '&format=json&locale=es-ES&device.os=linux&scenarios=ulm'

        opts = { headers: {"Authorization" => "Bearer #{token}",
                          "Content-Type" => "audio/wav; codec=audio/pcm; samplerate=16000; sourcerate=8000; trustsourcerate=false" },
                body: content }

      response = post(url, opts)
      response.body['results'].first['lexical']
    end
  end
end
