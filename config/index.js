const commander = require('commander')

commander
.option('-p, --port [port]')
.option('-d, --dev')
.parse(process.argv)

let config

module.exports = function(root){
	if (config)
		return config;
		
	config = {}

	config.path = require('./path.js')(root)
	config.server = require('./server.js')(commander.port, commander.dev)

	return config
}