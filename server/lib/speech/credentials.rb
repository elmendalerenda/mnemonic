module Speech
  class Credentials < Struct.new(:token)
    def valid?
      !token.nil?
    end
  end

  class NullCredentials
    def valid?
      false
    end
  end
end
