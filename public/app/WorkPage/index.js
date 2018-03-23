App.data.WorkPage = {}
App.data.WorkPage.active = false
App.data.WorkPage.curtab = 'edit'
App.data.WorkPage.list = []
App.data.WorkPage.readonly = false
App.data.WorkPage.cstory = null

/*** COMMON METHODS ***/
App.methods.WorkPage_init = function(){
    this.WorkPage_loadList()
}

App.methods.WorkPage_loadList = function(){
    this.LoadPage_addProcess('loadlist')
    fetch('/api/story/list', {
        headers: {
            token: sessionStorage.getItem('token')
        }
    })
    .then(res => res.json())
    .then(list => {
        this.LoadPage_removeProcess('loadlist')
        this.WorkPage.list = list
        this.WorkPage.cstory = list[0]
        this.WorkPage_reloadEditor()
    })
    .catch(err => {
        console.error(err)
        this.NotiPage_show('error', 'Error Connection!')
    })
}

/*** EDITOR METHODS ***/
App.methods.WorkPage_clear = function(){
    App.editor.value('')
    App.editor.togglePreview()
    App.editor.togglePreview()
}

App.methods.WorkPage_save = function(){
    let content = App.editor.value()
    this.LoadPage_addProcess('save')
    fetch('/api/story/save', {
        body: JSON.stringify({ content }),
        headers: {
            'Content-Type': 'application/json',
            token: sessionStorage.getItem('token')
        },
        method: 'POST'
    })
    .then(res => res.json())
    .then(list => {
        this.LoadPage_removeProcess('save')
        this.WorkPage.list = list
        this.WorkPage.cstory = list[0]
    })
    .catch(err => {
        console.error(err)
        this.NotiPage_show('error', 'Error Connection!')
    })
}

App.methods.WorkPage_edit = function(){
    if (App.editor.isPreviewActive())
        App.editor.togglePreview()
    this.WorkPage.curtab = 'edit'
}

App.methods.WorkPage_view = function(){
    if (!App.editor.isPreviewActive())
        App.editor.togglePreview()
    this.WorkPage.curtab = 'view'
}

App.methods.WorkPage_reloadEditor = function(){
    this.LoadPage_addProcess('reload')
    fetch('/api/story/get', {
        body: JSON.stringify({ filename: this.WorkPage.cstory.filename }),
        headers: {
            'Content-Type': 'application/json',
            token: sessionStorage.getItem('token')
        },
        method: 'POST'
    })
    .then(res => res.json())
    .then(data => {
        this.LoadPage_removeProcess('reload')
        if (!App.editor)
            App.initEditor()
        App.editor.value(data.content)
        if (this.WorkPage.cstory === this.WorkPage.list[0]){
            this.WorkPage.readonly = false
            this.WorkPage_edit()
        } else {
            this.WorkPage.readonly = true
            this.WorkPage_view()
        }
    })
    .catch(err => {
        console.error(err)
        this.NotiPage_show('error', 'Error Connection!')
    })
}

/*** LIST METHODS ***/
App.methods.WorkPage_getDay = function(date){
    return moment(date).format('DD')
}

App.methods.WorkPage_getMonthYear = function(date){
    return moment(date).format('MM/YYYY')
}

App.methods.WorkPage_isMemory = function(date){
    let ldate = new Date(date)
    let cdate = new Date()

    return ldate.getDate() === cdate.getDate() && ldate.getMonth() === cdate.getMonth() && ldate.getFullYear() !== cdate.getFullYear()
}