App.data.LoginPage = {}

App.data.LoginPage.active = false
App.data.LoginPage.password = null
App.data.LoginPage.status = {}
App.data.LoginPage.status.type = null
App.data.LoginPage.status.message = null

App.methods.LoginPage_login = function(){
    if (this.LoginPage.password === '123456'){
        this.LoginPage.status.type = 'success'
        this.LoginPage.status.message = 'Login success!'
    } else {
        this.LoginPage.status.type = 'error'
        this.LoginPage.status.message = 'Password wasn\'t correct!'
    }
}