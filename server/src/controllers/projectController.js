const { pool } = require('../config/database')
const { validationResult } = require('express-validator')

exports.getAll = async (req, res) => {
  try {
    const { tipo, estado, activo, destacado } = req.query
    let query = 'SELECT * FROM projects WHERE 1=1'
    const params = []

    if (tipo) { query += ' AND tipo = ?'; params.push(tipo) }
    if (estado) { query += ' AND estado = ?'; params.push(estado) }
    if (activo !== undefined) { query += ' AND activo = ?'; params.push(activo === 'true' ? 1 : 0) }
    if (destacado !== undefined) { query += ' AND destacado = ?'; params.push(destacado === 'true' ? 1 : 0) }

    query += ' ORDER BY creado_at DESC, id DESC'

    const [rows] = await pool.query(query, params)
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [req.params.id])
    if (rows.length === 0) return res.status(404).json({ error: 'Proyecto no encontrado' })
    res.json(rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.create = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    const { titulo, tipo, ciudad, estado, descripcion, imagen, imagenes, destacado, activo } = req.body
    const [result] = await pool.query(
      'INSERT INTO projects (titulo, tipo, ciudad, estado, descripcion, imagen, imagenes, destacado, activo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [titulo, tipo, ciudad, estado, descripcion, imagen, JSON.stringify(imagenes || []), destacado ? 1 : 0, activo !== undefined ? (activo ? 1 : 0) : 1]
    )
    res.status(201).json({ id: result.insertId, ...req.body })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.update = async (req, res) => {
  try {
    const { titulo, tipo, ciudad, estado, descripcion, imagen, imagenes, destacado, activo } = req.body
    await pool.query(
      'UPDATE projects SET titulo = ?, tipo = ?, ciudad = ?, estado = ?, descripcion = ?, imagen = ?, imagenes = ?, destacado = ?, activo = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [titulo, tipo, ciudad, estado, descripcion, imagen, JSON.stringify(imagenes || []), destacado ? 1 : 0, activo ? 1 : 0, req.params.id]
    )
    res.json({ message: 'Proyecto actualizado' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.toggleActivo = async (req, res) => {
  try {
    const { activo } = req.body
    await pool.query('UPDATE projects SET activo = ? WHERE id = ?', [activo ? 1 : 0, req.params.id])
    res.json({ message: `Proyecto ${activo ? 'activado' : 'pausado'}`, id: req.params.id, activo })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.delete = async (req, res) => {
  try {
    await pool.query('DELETE FROM projects WHERE id = ?', [req.params.id])
    res.json({ message: 'Proyecto eliminado' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
