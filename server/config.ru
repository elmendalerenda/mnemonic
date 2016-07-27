require './api'

use Rack::Static, :urls => %w(/styles /scripts /images /fonts), :root => 'public', index: 'index.html'

run API
