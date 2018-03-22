const config = require('../../../config')()

require('./HomepageController').devmode = config.server.devmode || false

module.exports = require('./HomepageRouter')