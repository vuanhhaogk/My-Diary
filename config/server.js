let server 

module.exports = function(port){
    if (server)
        return server
    
    server = {}

    server.port = port || 5000
    server.viewengine = 'pug'

    return server
}