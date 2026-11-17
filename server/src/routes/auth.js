const express = require('express')
const router = express.Router()
const { login, me } = require('../controllers/authController')
const { authenticate } = require('../middleware/authJWT')
const { body } = require('express-validator')

router.post(
  '/login',
  [
    body('usuario').notEmpty().withMessage('Usuario requerido'),
    body('clave').notEmpty().withMessage('Clave requerida'),
  ],
  login
)

router.get('/me', authenticate, me)

module.exports = router
