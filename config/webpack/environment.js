const { environment } = require('@rails/webpacker')

const path = require('path')

// Add alias for @ symbol
environment.config.set('resolve.alias', {
  '@': path.resolve(__dirname, '..', '..', 'app/javascript/src')
})

module.exports = environment
