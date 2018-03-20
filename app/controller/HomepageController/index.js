const express = require('express')
const router = express.Router()

module.exports = router

const HomepageController = {}

HomepageController.index = function(req, res){
    res.render('homepage')
}

router.get('/', HomepageController.index)