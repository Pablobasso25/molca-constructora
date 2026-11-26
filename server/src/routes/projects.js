const express = require('express')
const controller = require('../controllers/projectController')
const { authenticate } = require('../middleware/authJWT')
const { validate, id, activo, project } = require('./validators')

const router = express.Router()

router.get('/', controller.getPublic)
router.get('/:id', id, validate, controller.getPublicById)

router.post('/', authenticate, project, validate, controller.create)
router.put('/:id', authenticate, id, project, validate, controller.update)
router.patch('/:id/activo', authenticate, id, activo, validate, controller.toggleActivo)
router.delete('/:id', authenticate, id, validate, controller.remove)

module.exports = router
