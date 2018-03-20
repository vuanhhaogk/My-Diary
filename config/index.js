const commander = require('commander')

commander
.option('-p, --port [port]')
.parse(process.argv)

let config

module.exports = function(root){
	if (config)
		return config;
		
	config = {}

	config.path = require('./path.js')(root)
	config.server = require('./server.js')(commander.port)

	return config
}