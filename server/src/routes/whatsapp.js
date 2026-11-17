const express = require('express')
const router = express.Router()
const { trackClick, getStats } = require('../controllers/whatsappController')
const { body } = require('express-validator')

router.post(
  '/click',
  [
    body('type').optional().isIn(['general', 'specific']).withMessage('Tipo inválido'),
  ],
  trackClick
)

router.get('/stats', getStats)

module.exports = router
