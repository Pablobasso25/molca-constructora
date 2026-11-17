const express = require('express')
const router = express.Router()
const {
  getAll,
  getById,
  create,
  update,
  toggleActivo,
  delete: deleteProject,
} = require('../controllers/projectController')
const { body, param } = require('express-validator')

router.get('/', getAll)
router.get('/:id', param('id').isInt(), getById)

router.post(
  '/',
  [
    body('titulo').notEmpty().withMessage('Título requerido'),
    body('tipo').notEmpty().withMessage('Tipo requerido'),
    body('ciudad').notEmpty().withMessage('Ciudad requerida'),
    body('estado').isIn(['en obra', 'entregado', 'planeado', 'preventa']).withMessage('Estado inválido'),
  ],
  create
)

router.put(
  '/:id',
  [
    param('id').isInt(),
    body('titulo').notEmpty(),
    body('tipo').notEmpty(),
    body('ciudad').notEmpty(),
    body('estado').isIn(['en obra', 'entregado', 'planeado', 'preventa']),
  ],
  update
)

router.patch('/:id/activo', param('id').isInt(), toggleActivo)

router.delete('/:id', param('id').isInt(), deleteProject)

module.exports = router
