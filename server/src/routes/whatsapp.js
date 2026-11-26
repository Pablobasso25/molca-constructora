const express = require('express')
const { trackClick, getStats } = require('../controllers/whatsappController')
const { authenticate } = require('../middleware/authJWT')
const { body, validate } = require('./validators')

const router = express.Router()

router.post(
  '/click',
  body('type').optional().isIn(['general', 'specific']).withMessage('Tipo inválido'),
  validate,
  trackClick
)

router.get('/stats', authenticate, getStats)

module.exports = router
