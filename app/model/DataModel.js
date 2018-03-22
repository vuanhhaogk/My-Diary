const moment = require('moment')

const DataModel = {}

module.exports = DataModel

const config = require('../../config')

DataModel.getList = function(){
    let dir = fs.readdirSync(config.path.data)
    let ls = []
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
    return ls
}

DataModel.getStory = function(filename){
    let info = this.parseFilename(filename)
    if (!info)
        return null

    info.content = fs.readFileSync(`${config.path.data}/${filename}`)

    return info
}

DataModel.parseFilename = function(filename){
    let r = /\[([0-9]{4}\-[0-9]{2}\-[0-9]{2})\]\s(.*)\.md/gm
    return r.exec(name)
}