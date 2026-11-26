const pool = require('../config/db')
const asyncHandler = require('../utils/asyncHandler')

exports.create = asyncHandler(async (req, res) => {
  const { nombre, email, telefono, mensaje, proyecto } = req.body
  // execute() no admite undefined: los campos opcionales van como null.
  const [result] = await pool.execute(
    'INSERT INTO leads (nombre, email, telefono, mensaje, proyecto) VALUES (?, ?, ?, ?, ?)',
    [nombre, email, telefono || null, mensaje, proyecto || null]
  )
  res.status(201).json({ id: result.insertId, message: 'Lead registrado' })
})

exports.getAll = asyncHandler(async (req, res) => {
  const [rows] = await pool.execute('SELECT * FROM leads ORDER BY created_at DESC, id DESC')
  res.json(rows)
})

exports.getById = asyncHandler(async (req, res) => {
  const [rows] = await pool.execute('SELECT * FROM leads WHERE id = ?', [req.params.id])
  if (rows.length === 0) return res.status(404).json({ error: 'Lead no encontrado' })
  return res.json(rows[0])
})
