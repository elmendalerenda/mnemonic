require './lib/speech/ms_service'
require './lib/speech/credentials'

module Speech
  class Authorization
    attr_writer :ms_service

    def self.credentials(opts={})
      new.credentials(opts)
    end

    def credentials(opts={})
      return NullCredentials.new unless valid_params(opts)

      response = remote_service.authenticate(subscription_key: opts[:subscription_key])

      Credentials.new(extract_token(response))
    end

    private

    def extract_token(json)
      JSON.parse(json)
      nil
    rescue JSON::ParserError
      return json
    end

    def valid_params(params)
      !params[:subscription_key].nil?
    end

    def remote_service
      @ms_service || MSService
    end
  end
end
