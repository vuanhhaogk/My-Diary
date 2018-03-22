let server 

module.exports = function(port, devmode){
    if (server)
        return server
    
    server = {}

    server.port = port || 5000
    server.viewengine = 'pug'
    server.devmode = devmode || false

    return server
}