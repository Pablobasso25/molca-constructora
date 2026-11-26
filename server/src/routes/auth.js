const express = require('express')
const { login, me } = require('../controllers/authController')
const { authenticate } = require('../middleware/authJWT')
const { body, validate } = require('./validators')

const router = express.Router()

router.post(
  '/login',
  [
    body('usuario').isString().notEmpty().withMessage('Usuario requerido'),
    body('clave').isString().notEmpty().withMessage('Clave requerida'),
  ],
  validate,
  login
)

router.get('/me', authenticate, me)

module.exports = router
