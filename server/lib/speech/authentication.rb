require 'httparty'

module Speech
  class Authentication
    def self.token(opts={})
      response = HTTParty.post(
        "https://oxford-speech.cloudapp.net/token/issueToken",
        {
        headers: {"Content-Type" => "application/x-www-form-urlencoded" },
        body: "grant_type=client_credentials&client_id=#{opts[:client_id]}&client_secret=#{opts[:client_secret]}&scope=https%3A%2F%2Fspeech.platform.bing.com"
      })
      response.body['access_token']
    end
  end
end
