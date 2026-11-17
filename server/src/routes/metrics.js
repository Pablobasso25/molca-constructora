const express = require('express')
const router = express.Router()
const { getMetrics } = require('../controllers/metricController')

router.get('/', getMetrics)

module.exports = router
