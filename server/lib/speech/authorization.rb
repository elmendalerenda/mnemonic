require './lib/speech/ms_service'
require './lib/speech/credentials'

module Speech
  class Authorization
    attr_writer :ms_service

    def self.credentials(opts={})
      new.credentials(opts)
    end

    def credentials(opts={})
      return NullCredentials.new if opts[:client_id].nil? || opts[:client_secret].nil?

      response = remote_service.authenticate(client_id: opts[:client_id], client_secret: opts[:client_secret])

      #map?

      tok = JSON.parse(response)['access_token']
      Credentials.new(tok)
    end

    private

    def remote_service
      @ms_service || MSService
    end
  end
end
