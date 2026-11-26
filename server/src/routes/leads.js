const express = require('express')
const { create, getAll, getById } = require('../controllers/leadController')
const { authenticate } = require('../middleware/authJWT')
const { body, validate, text, optionalText, id } = require('./validators')

const router = express.Router()

router.post(
  '/',
  [
    text('nombre', 255),
    body('email').isEmail().isLength({ max: 255 }).withMessage('Email inválido'),
    text('mensaje', 5000),
    optionalText('telefono', 50),
    optionalText('proyecto', 255),
  ],
  validate,
  create
)

router.get('/', authenticate, getAll)
router.get('/:id', authenticate, id, validate, getById)

module.exports = router
