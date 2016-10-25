require './api'

VoiceRecognitionBing.configure do |config|
  config.subscription_key = ENV['subscription_key']
end

use Rack::Static, :urls => %w(/styles /scripts /images /fonts), :root => 'public', index: 'index.html'

run API
