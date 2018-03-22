const express = require('express')
const router = express.Router()

module.exports = router

const ApiController = require('./ApiController')

router.post('/login', ApiController.login.bind(ApiController))

router.use(ApiController.checkToken.bind(ApiController))

router.get('/story/list', ApiController.getList.bind(ApiController))