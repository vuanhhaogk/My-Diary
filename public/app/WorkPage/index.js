App.data.WorkPage = {}
App.data.WorkPage.active = true
App.data.WorkPage.content = null
App.data.WorkPage.curtab = 'edit'
App.data.WorkPage.readonly = false

App.data.WorkPage_init = function(){
    App.initEditor()
}

App.methods.WorkPage_view = function(){
    if (!App.editor.isPreviewActive())
        App.editor.togglePreview()
    this.WorkPage.curtab = 'view'
}

App.methods.WorkPage_edit = function(){
    if (App.editor.isPreviewActive())
        App.editor.togglePreview()
    this.WorkPage.curtab = 'edit'
}

setTimeout(() => App.data.WorkPage_init(), 100)