const fs = require('fs')
const mdext = require('markdown-extractor')
const moment = require('moment')
const sanitize = require('sanitize-filename')

const DataModel = {}

module.exports = DataModel

const config = require('../../config')()

DataModel.list = null
DataModel.cdate = (new Date()).getDate()

DataModel.createNewStory = function(date = +new Date(), title = 'No Title'){
    return {
        filename: `[${moment(date).format('YYYY-MM-DD')}] ${title}.md`,
        date,
        title
    }
}

DataModel.getList = function(){
    if (this.list)
        return this.list
    
    let dir = fs.readdirSync(config.path.data)
    let ls = []
    let date = +new Date()
    let cdate = moment(date).format('YYYY-MM-DD')
    dir.sort((a, b) => a > b ? -1 : a < b ? 1 : 0)
    for (let name of dir){
        let rel = this.parseFilename(name)
        if (!rel)
            continue

        ls.push({
            filename: name,
            date: +moment(rel[1], 'YYYY-MM-DD'),
            title: rel[2]
        })
    }

    if (ls.length === 0 || moment(ls[0].date).format('YYYY-MM-DD') !== cdate){
        ls.unshift(this.createNewStory(date))
    }

    this.list = ls

    return this.list
}

DataModel.getStory = function(filename){
    let info = this.parseFilename(filename)
    if (!info)
        return null

    let path = `${config.path.data}/${filename}`

    return fs.existsSync(path) ? fs.readFileSync(path).toString() : ''
}

DataModel.saveStory = function(content){
    content = content || ''

    let ls = this.getList()

    if (content === ''){
        let path = `${config.path.data}/${ls[0].filename}`
        if (fs.existsSync(path)){
            fs.unlinkSync(path)
            ls[0] = this.createNewStory()
        }
        return
    }
    
    let hds = mdext.heading(content)
    let title = 'No Title'
    let date = +new Date()
    for (let hd of hds)
        if (hd.type === 'h1'){
            title = sanitize(hd.data)
            break
        }

    let story = this.createNewStory(date, title)
    let opath = `${config.path.data}/${ls[0].filename}`
    let npath = `${config.path.data}/${story.filename}`

    if (moment(ls[0].date).format('YYYY-MM-DD') ===  moment(story.date).format('YYYY-MM-DD')){
        if (fs.existsSync(opath))
            fs.unlinkSync(opath)
        ls[0] = story
    } else {
        ls.unshift(story)
    }

    fs.writeFileSync(npath, content)
}

DataModel.parseFilename = function(filename){
    let r = /\[([0-9]{4}\-[0-9]{2}\-[0-9]{2})\]\s(.*)\.md/gm
    return r.exec(filename)
}

DataModel.getCalendar = function(){
    let cdate = moment()

    let calendar = []

    let ls = this.getList()
    let cls = 0
    let week = []

    while (calendar.length < 16){

        if (cdate.day() === 0){
            calendar.unshift(week)
            week = []
        }

        let cdname = cdate.format('YYYY-MM-DD')
        let clname = cls < ls.length ? moment(ls[cls].date).format('YYYY-MM-DD') : null;

        while (cls < ls.length && clname > cdname){
            cls++
            if (cls < ls.length)
                clname = moment(ls[cls].date).format('YYYY-MM-DD')
        }

        week.unshift(cls < ls.length && clname === cdname)

        cdate.subtract(1, 'day')
    }

    return calendar
}

setInterval(() => {
    if (DataModel.cdate != (new Date).getDate()){
        DataModel.list = null
        DataModel.cdate = (new Date).getDate();
    }
}, 1000 * 60)