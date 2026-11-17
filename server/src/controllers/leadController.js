const { pool } = require('../config/database')

exports.create = async (req, res) => {
  try {
    const { nombre, email, telefono, mensaje, proyecto } = req.body
    const [result] = await pool.query(
      'INSERT INTO leads (nombre, email, telefono, mensaje, proyecto) VALUES (?, ?, ?, ?, ?)',
      [nombre, email, telefono, mensaje, proyecto]
    )
    res.status(201).json({ id: result.insertId, message: 'Lead registrado' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM leads ORDER BY created_at DESC')
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM leads WHERE id = ?', [req.params.id])
    if (rows.length === 0) return res.status(404).json({ error: 'Lead no encontrado' })
    res.json(rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
