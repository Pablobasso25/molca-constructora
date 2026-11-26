const { body, param } = require('express-validator')
const validate = require('../middleware/validate')

const text = (field, max) =>
  body(field)
    .isString()
    .bail()
    .trim()
    .isLength({ min: 1, max })
    .withMessage(`Requerido, máximo ${max} caracteres`)

const optionalText = (field, max) =>
  body(field)
    .optional({ values: 'null' })
    .isString()
    .bail()
    .trim()
    .isLength({ max })
    .withMessage(`Máximo ${max} caracteres`)

const id = param('id').isInt({ min: 1 }).withMessage('Id inválido')

const activo = body('activo').isBoolean().withMessage('Debe ser verdadero o falso')

const project = [
  text('titulo', 255),
  text('tipo', 100),
  text('ciudad', 100),
  body('estado')
    .isIn(['en obra', 'entregado', 'planeado', 'preventa'])
    .withMessage('Estado inválido'),
  optionalText('descripcion', 5000),
  optionalText('imagen', 500),
  body('imagenes').optional({ values: 'null' }).isArray().withMessage('Debe ser una lista'),
  body(['destacado', 'activo']).optional().isBoolean().withMessage('Debe ser verdadero o falso'),
]

module.exports = { body, validate, text, optionalText, id, activo, project }
