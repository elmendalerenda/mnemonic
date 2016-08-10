require 'httparty'
require 'securerandom'

module Speech
  class InvalidCredentials < StandardError; end
  class Service
    attr_writer :http_lib

    def self.recognize(content, credentials)
      new.recognize(content, credentials)
    end

    def post(url, opts)
      klass = @http_lib || HTTParty
      klass.post(url, opts)
    end

    # Implementation of https://www.microsoft.com/cognitive-services/en-us/speech-api/documentation/API-Reference-REST/BingVoiceRecognition#access-the-speech-service-endpoint
    def recognize(content, credentials)
      raise InvalidCredentials unless credentials.valid?

      url = 'https://speech.platform.bing.com/recognize?version=3.0' +
        "&requestid=#{SecureRandom.uuid}" +
        "&appID=#{SecureRandom.uuid}" +
        "&instanceid=#{SecureRandom.uuid}" +
        '&format=json&locale=es-ES&device.os=linux&scenarios=ulm'

        opts = { headers: {"Authorization" => "Bearer #{credentials.token}",
                          "Content-Type" => "audio/wav; codec=audio/pcm; samplerate=16000; sourcerate=8000; trustsourcerate=false" },
                          body: content.to_s }

      response = post(url, opts)
      JSON.parse(response.body)['results'].first['lexical']
    end
  end
end
