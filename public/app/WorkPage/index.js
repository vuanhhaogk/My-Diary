App.data.WorkPage = {}
App.data.WorkPage.active = false
App.data.WorkPage.content = null
App.data.WorkPage.curtab = 'edit'
App.data.WorkPage.readonly = false

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

App.methods.WorkPage_init = function(){
    App.initEditor()
    this.WorkPage_loadList()
}

App.methods.WorkPage_loadList = function(){
    
}

App.methods.WorkPage_view = function(){
    if (!App.editor.isPreviewActive())
        App.editor.togglePreview()
    this.WorkPage.curtab = 'view'
}

// setTimeout(() => App.data.WorkPage_init(), 100)