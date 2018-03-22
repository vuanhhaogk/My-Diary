const LoginModel = require('../../model/LoginModel')

const ApiController = {}

module.exports = ApiController

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