require 'httparty'

module Speech
  class MSService
    class << self
    # Implementation of https://www.microsoft.com/cognitive-services/en-us/speech-api/documentation/API-Reference-REST/BingVoiceRecognition#authenticate-the-api-call
      def authenticate(client_id:, client_secret:)
        response = HTTParty.post(
          "https://oxford-speech.cloudapp.net/token/issueToken",
          {
          headers: {"Content-Type" => "application/x-www-form-urlencoded" },
          body: "grant_type=client_credentials&client_id=#{opts[:client_id]}&client_secret=#{opts[:client_secret]}&scope=https%3A%2F%2Fspeech.platform.bing.com"
        })

        response.body

      end
    end
  end
end
