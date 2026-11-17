const express = require('express')
const router = express.Router()
const { create, getAll, getById } = require('../controllers/leadController')
const { body } = require('express-validator')

router.post(
  '/',
  [
    body('nombre').notEmpty().withMessage('Nombre requerido'),
    body('email').isEmail().withMessage('Email inválido'),
    body('mensaje').notEmpty().withMessage('Mensaje requerido'),
  ],
  create
)

router.get('/', getAll)
router.get('/:id', getById)

module.exports = router
