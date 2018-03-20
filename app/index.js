const bodyParser = require('body-parser')
const express = require('express')

const ApiController = require('./controller/ApiController')
const HomepageController = require('./controller/HomepageController')

const App = {}

module.exports = App

const config = require('../config')()

App.server

App.init = function(){
    return new Promise((resolve, reject) => {
        console.log('Initialize')

        this.server = express()

        this.server.use(express.static(config.path.public))
        this.server.use(bodyParser.json())
        this.server.use(bodyParser.urlencoded({ extended: false }))
        
        this.server.set('view engine', config.server.viewengine)
        this.server.set('views', config.path.view)

        resolve()
    })
}

App.router = function(){
    return new Promise((resolve, reject) => {
        console.log('Routing')

        this.server.use(HomepageController)
        this.server.use('/api', ApiController)

        resolve()
    })
}

App.run = function(){
    return new Promise((resolve, reject) => {
        console.log('Running')
        this.server.listen(config.server.port, () => {
            console.log(`Server running at port ${config.server.port}`)
            resolve()
        })
    })
}

App.start = function(){
    this.init()
    .then(this.router.bind(this))
    .then(this.run.bind(this))
    .catch(e => {
        console.error(e)
    })
}