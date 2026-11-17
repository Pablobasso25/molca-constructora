const express = require('express')
const router = express.Router()
const { authenticate } = require('../middleware/authJWT')
const {
  getAll,
  getById,
  create,
  update,
  toggleActivo,
  delete: deleteProject,
} = require('../controllers/projectController')
const { body, param } = require('express-validator')

router.use(authenticate)

router.get('/projects', getAll)
router.get('/projects/:id', param('id').isInt(), getById)
router.post(
  '/projects',
  [
    body('titulo').notEmpty(),
    body('tipo').notEmpty(),
    body('ciudad').notEmpty(),
    body('estado').isIn(['en obra', 'entregado', 'planeado', 'preventa']),
  ],
  create
)
router.put(
  '/projects/:id',
  [
    param('id').isInt(),
    body('titulo').notEmpty(),
    body('tipo').notEmpty(),
    body('ciudad').notEmpty(),
    body('estado').isIn(['en obra', 'entregado', 'planeado', 'preventa']),
  ],
  update
)
router.patch('/projects/:id/activo', param('id').isInt(), toggleActivo)
router.delete('/projects/:id', param('id').isInt(), deleteProject)

module.exports = router
