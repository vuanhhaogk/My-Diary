const express = require('express')
const router = express.Router()

module.exports = router

const HomepageController = require('./HomepageController')

router.get('/', HomepageController.index.bind(HomepageController))