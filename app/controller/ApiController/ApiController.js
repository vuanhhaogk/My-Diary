const DataModel = require('../../model/DataModel')
const LoginModel = require('../../model/LoginModel')

const ApiController = {}

module.exports = ApiController

ApiController.checkToken = function(req, res, next){
    let token = req.headers.TOKEN || req.headers.token || req.headers.Token
    if (!token || !LoginModel.checkToken(token)){
        res.sendStatus(403)
        return
    }
    next()
}

ApiController.login = function(req, res){
    let { password } = req.body

    if (!LoginModel.login(password)){
        res.json({
            type: 'error'
        })
        return
    }

    res.json({
        type: 'success',
        token: LoginModel.getToken()
    })
}

ApiController.getList = function(req, res){
    res.send(DataModel.getList())
}

ApiController.getStory = function(req, res){
    let { filename } = req.body
    let content = DataModel.getStory(filename)
    res.json({ content })
}

ApiController.saveStory = function(req, res){
    let content = req.body.content

    DataModel.saveStory(content)
 
    res.json(DataModel.getList())
}

ApiController.getCalendar = function(req, res){
    res.json(DataModel.getCalendar())
}