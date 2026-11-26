const pool = require('../config/db')
const asyncHandler = require('../utils/asyncHandler')

const notFound = (res) => res.status(404).json({ error: 'Proyecto no encontrado' })
const toFlag = (value) => ([true, 1, '1', 'true'].includes(value) ? 1 : 0)
const optionalFlag = (value) => (value === undefined || value === null ? null : toFlag(value))
// Campo no enviado: null, para que COALESCE conserve el valor actual.
const keep = (value) => (value === undefined ? null : value)

// onlyActive: las rutas públicas nunca exponen proyectos pausados.
const list = (onlyActive) =>
  asyncHandler(async (req, res) => {
    const { tipo, estado, activo, destacado } = req.query
    const where = []
    const params = []
    const filter = (condition, value) => {
      where.push(condition)
      params.push(value)
    }

    if (typeof tipo === 'string') filter('tipo = ?', tipo)
    if (typeof estado === 'string') filter('estado = ?', estado)
    if (destacado !== undefined) filter('destacado = ?', toFlag(destacado))
    if (onlyActive) filter('activo = ?', 1)
    else if (activo !== undefined) filter('activo = ?', toFlag(activo))

    const clause = where.length ? `WHERE ${where.join(' AND ')}` : ''
    const [rows] = await pool.execute(
      `SELECT * FROM projects ${clause} ORDER BY created_at DESC, id DESC`,
      params
    )
    res.json(rows)
  })

const detail = (onlyActive) =>
  asyncHandler(async (req, res) => {
    const [rows] = await pool.execute(
      `SELECT * FROM projects WHERE id = ?${onlyActive ? ' AND activo = 1' : ''}`,
      [req.params.id]
    )
    if (rows.length === 0) return notFound(res)
    return res.json(rows[0])
  })

exports.getPublic = list(true)
exports.getPublicById = detail(true)
exports.getAll = list(false)
exports.getById = detail(false)

exports.create = asyncHandler(async (req, res) => {
  const { titulo, tipo, ciudad, estado, descripcion, imagen, imagenes, destacado, activo } = req.body
  const [result] = await pool.execute(
    `INSERT INTO projects
      (titulo, tipo, ciudad, estado, descripcion, imagen, imagenes, destacado, activo)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      titulo,
      tipo,
      ciudad,
      estado,
      descripcion || null,
      imagen || null,
      JSON.stringify(imagenes || []),
      toFlag(destacado),
      activo === undefined ? 1 : toFlag(activo),
    ]
  )
  res.status(201).json({ id: result.insertId, message: 'Proyecto creado' })
})

exports.update = asyncHandler(async (req, res) => {
  const { titulo, tipo, ciudad, estado, descripcion, imagen, imagenes, destacado, activo } = req.body
  const [result] = await pool.execute(
    `UPDATE projects SET
      titulo = ?, tipo = ?, ciudad = ?, estado = ?,
      descripcion = COALESCE(?, descripcion),
      imagen = COALESCE(?, imagen),
      imagenes = COALESCE(?, imagenes),
      destacado = COALESCE(?, destacado),
      activo = COALESCE(?, activo)
     WHERE id = ?`,
    [
      titulo,
      tipo,
      ciudad,
      estado,
      keep(descripcion),
      keep(imagen),
      imagenes ? JSON.stringify(imagenes) : null,
      optionalFlag(destacado),
      optionalFlag(activo),
      req.params.id,
    ]
  )
  if (result.affectedRows === 0) return notFound(res)
  return res.json({ message: 'Proyecto actualizado' })
})

exports.toggleActivo = asyncHandler(async (req, res) => {
  const activo = toFlag(req.body.activo)
  const [result] = await pool.execute('UPDATE projects SET activo = ? WHERE id = ?', [
    activo,
    req.params.id,
  ])
  if (result.affectedRows === 0) return notFound(res)
  return res.json({
    message: `Proyecto ${activo ? 'activado' : 'pausado'}`,
    id: Number(req.params.id),
    activo: Boolean(activo),
  })
})

exports.remove = asyncHandler(async (req, res) => {
  const [result] = await pool.execute('DELETE FROM projects WHERE id = ?', [req.params.id])
  if (result.affectedRows === 0) return notFound(res)
  return res.json({ message: 'Proyecto eliminado' })
})
