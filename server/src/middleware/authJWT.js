const jwt = require('jsonwebtoken')
const config = require('../config')

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' })
  }

  const token = authHeader.split(' ')[1]
  try {
    req.user = jwt.verify(token, config.jwt.secret, { algorithms: ['HS256'] })
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' })
  }
  return next()
}
