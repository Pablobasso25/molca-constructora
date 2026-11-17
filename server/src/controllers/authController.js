const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { pool } = require('../config/database')
const config = require('../config')

exports.login = async (req, res) => {
  try {
    const { usuario, clave } = req.body
    const [rows] = await pool.query('SELECT * FROM users WHERE usuario = ? AND activo = 1', [usuario])
    if (rows.length === 0) return res.status(401).json({ error: 'Credenciales inválidas' })

    const user = rows[0]
    const valid = await bcrypt.compare(clave, user.clave)
    if (!valid) return res.status(401).json({ error: 'Credenciales inválidas' })

    const token = jwt.sign(
      { id: user.id, usuario: user.usuario, rol: user.rol },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    )

    res.json({ token, user: { id: user.id, usuario: user.usuario, rol: user.rol } })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.me = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, usuario, rol FROM users WHERE id = ?', [req.user.id])
    if (rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' })
    res.json(rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
