App.data.LoginPage = {}

App.data.LoginPage.active = true
App.data.LoginPage.disabled = false
App.data.LoginPage.password = null
App.data.LoginPage.status = {}
App.data.LoginPage.status.type = null
App.data.LoginPage.status.message = null

App.methods.LoginPage_login = function(){
    this.LoadPage.active = true
    fetch('/api/login', {
        body: JSON.stringify({ password: this.LoginPage.password }),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    })
    .then(res => res.json())
    .then(data => {
        this.LoadPage.active = false
        if (data.type === 'success'){
            sessionStorage.setItem('token', data.token)
            this.LoginPage.status.type = 'success'
            this.LoginPage.status.message = 'Login success!'
            this.LoginPage.disabled = true
            setTimeout(() => {
                this.WorkPage.active = true
                this.WorkPage_init()
            }, 300)
        } else {
            this.LoginPage.status.type = 'error'
            this.LoginPage.status.message = 'Password wasn\'t correct!'
        }
    })
    .catch(() => {
        this.LoadPage.active = false
        this.LoginPage.status.type = 'error'
        this.LoginPage.status.message = 'Error connection'
    })
}