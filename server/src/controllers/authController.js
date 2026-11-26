const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const pool = require('../config/db')
const config = require('../config')
const asyncHandler = require('../utils/asyncHandler')

exports.login = asyncHandler(async (req, res) => {
  const { usuario, clave } = req.body
  const [rows] = await pool.execute(
    'SELECT id, usuario, clave, rol FROM users WHERE usuario = ? AND activo = 1',
    [usuario]
  )
  const user = rows[0]
  const valid = user ? await bcrypt.compare(clave, user.clave) : false
  if (!valid) return res.status(401).json({ error: 'Credenciales inválidas' })

  const payload = { id: user.id, usuario: user.usuario, rol: user.rol }
  const token = jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn })

  return res.json({ token, user: payload })
})

exports.me = asyncHandler(async (req, res) => {
  const [rows] = await pool.execute(
    'SELECT id, usuario, rol FROM users WHERE id = ? AND activo = 1',
    [req.user.id]
  )
  if (rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' })
  return res.json(rows[0])
})
