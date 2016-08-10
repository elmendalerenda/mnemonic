require 'httparty'
require './lib/speech/credentials'

module Speech
  class Authorization
    attr_writer :http_lib

    def self.credentials(opts={})
      new.credentials(opts)
    end

    def post(url, opts)
      klass = @http_lib || HTTParty
      klass.post(url, opts)
    end

    # Implementation of https://www.microsoft.com/cognitive-services/en-us/speech-api/documentation/API-Reference-REST/BingVoiceRecognition#authenticate-the-api-call
    def credentials(opts={})
      return NullCredentials.new if opts[:client_id].nil? || opts[:client_secret].nil?

      response = post(
        "https://oxford-speech.cloudapp.net/token/issueToken",
        {
        headers: {"Content-Type" => "application/x-www-form-urlencoded" },
        body: "grant_type=client_credentials&client_id=#{opts[:client_id]}&client_secret=#{opts[:client_secret]}&scope=https%3A%2F%2Fspeech.platform.bing.com"
      })
      tok = JSON.parse(response.body)['access_token']
      Credentials.new(tok)
    end
  end
end
