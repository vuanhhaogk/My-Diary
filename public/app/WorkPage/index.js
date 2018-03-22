App.data.WorkPage = {}
App.data.WorkPage.active = false
App.data.WorkPage.content = null
App.data.WorkPage.curtab = 'edit'
App.data.WorkPage.list = []
App.data.WorkPage.readonly = false
App.data.WorkPage.today = {
    date: +new Date(),
    title: '[No Title]'
}

App.methods.WorkPage_clear = function(){
    App.editor.value('')
    App.editor.togglePreview()
    App.editor.togglePreview()
}

App.methods.WorkPage_edit = function(){
    if (App.editor.isPreviewActive())
        App.editor.togglePreview()
    this.WorkPage.curtab = 'edit'
}

App.methods.WorkPage_getDay = function(date){
    return moment(date).format('DD')
}

App.methods.WorkPage_getMonthYear = function(date){
    return moment(date).format('MM/YYYY')
}

App.methods.WorkPage_init = function(){
    this.WorkPage_loadList()
    App.initEditor()
}

App.methods.WorkPage_isMemory = function(date){
    let ldate = new Date(date)
}

App.methods.WorkPage_loadList = function(){
    this.LoadPage.active = true
    fetch('/api/story/list', {
        headers: {
            token: sessionStorage.getItem('token')
        }
    })
    .then(res => res.json())
    .then(list => {
        this.LoadPage.active = false
        this.WorkPage.list = list
        this.WorkPage.today = list[0]
    })
    .catch(err => {
        this.NotiPage.show('error', 'Error Connection!')
    })
}

App.methods.WorkPage_view = function(){
    if (!App.editor.isPreviewActive())
        App.editor.togglePreview()
    this.WorkPage.curtab = 'view'
}

// setTimeout(() => App.data.WorkPage_init(), 100)