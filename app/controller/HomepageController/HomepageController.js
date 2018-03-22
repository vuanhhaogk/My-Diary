const HomepageController = {}

module.exports = HomepageController

HomepageController.devmode = true

HomepageController.index = function(req, res){
    res.render('homepage', { devmode: this.devmode })
}