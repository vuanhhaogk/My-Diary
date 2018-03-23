App.data.LoadPage = {}

App.data.LoadPage.active = false
App.data.LoadPage.processes = []

App.methods.LoadPage_addProcess = function(name){
    this.LoadPage.processes.push(name)
    this.LoadPage.active = true
}

App.methods.LoadPage_removeProcess = function(name){
    let p = this.LoadPage.processes.indexOf(name)
    if (p === -1)
        return
    this.LoadPage.processes.splice(p, 1)
    if (this.LoadPage.processes.length === 0)
        this.LoadPage.active = false
}