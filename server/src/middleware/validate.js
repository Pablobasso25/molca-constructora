const { validationResult } = require('express-validator')

module.exports = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) return next()

  const details = errors.array().map(({ path, msg }) => ({ campo: path, mensaje: msg }))
  return res.status(400).json({ error: 'Datos inválidos', errors: details })
}
