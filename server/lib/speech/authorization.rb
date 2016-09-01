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

      response = remote_service.authenticate(client_id: opts[:client_id], client_secret: opts[:client_secret])

      Credentials.new(extract_token(response))
    end

    private

    def extract_token(json)
      JSON.parse(json)['access_token']
    end

    def valid_params(params)
      !params[:client_id].nil? && !params[:client_secret].nil?
    end

    def remote_service
      @ms_service || MSService
    end
  end
end
