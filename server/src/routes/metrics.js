const express = require('express')
const { getMetrics } = require('../controllers/metricController')
const { authenticate } = require('../middleware/authJWT')

const router = express.Router()

router.get('/', authenticate, getMetrics)

module.exports = router
