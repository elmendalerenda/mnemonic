require './api'

use Rack::Static, :urls => %w(/styles /scripts), :root => 'public', index: 'index.html'

run API
