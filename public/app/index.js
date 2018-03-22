const App = {}

App.data = {}
App.methods = {}
App.computed = {}

App.initEditor = function(){
    this.parrent = document.querySelector('#app .page.work .main .editor')
    this.parrent.innerHTML = null
    this.textarea = document.createElement('textarea')
    this.parrent.appendChild(this.textarea)
    this.editor = new SimpleMDE({ 
        element: this.textarea,
        spellChecker: false,
        status: false,
		toolbar: false
    })
}

App.start = function(){
    this.app = new Vue({
        el: '#app',
        data: App.data,
        methods: App.methods,
        computed: App.computed
    })
}