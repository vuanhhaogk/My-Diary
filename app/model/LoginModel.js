const jwt = require('jsonwebtoken')
const randomstring = require('randomstring')

const LoginModel = {}

module.exports = LoginModel

LoginModel.password = null
LoginModel.secret = randomstring.generate(20)
LoginModel.index = 0

LoginModel.login = function(password){
    if (!this.password){
        this.password = password
    }

    if (this.password === password)
        return true

    return false
}

LoginModel.getToken = function(){
    return jwt.sign({ app: 'My Diary', id: this.index++ }, this.secret, { expiresIn: '12h' })
}

LoginModel.checkToken = function(token){
    return jwt.verify(token, this.password)
}