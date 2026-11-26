const express = require('express')
const controller = require('../controllers/projectController')
const { authenticate } = require('../middleware/authJWT')
const { validate, id, activo, project } = require('./validators')

const router = express.Router()

router.use(authenticate)

router.get('/projects', controller.getAll)
router.get('/projects/:id', id, validate, controller.getById)
router.post('/projects', project, validate, controller.create)
router.put('/projects/:id', id, project, validate, controller.update)
router.patch('/projects/:id/activo', id, activo, validate, controller.toggleActivo)
router.delete('/projects/:id', id, validate, controller.remove)

module.exports = router
