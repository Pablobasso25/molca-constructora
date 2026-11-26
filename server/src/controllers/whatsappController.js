const pool = require('../config/db')
const asyncHandler = require('../utils/asyncHandler')

exports.trackClick = asyncHandler(async (req, res) => {
  const { projectId, type = 'general' } = req.body
  // El cliente a veces envía texto ('general') o un id inexistente: queda NULL.
  const id = Number(projectId)
  await pool.execute(
    'INSERT INTO whatsapp_clicks (project_id, type) VALUES ((SELECT id FROM projects WHERE id = ?), ?)',
    [Number.isInteger(id) && id > 0 ? id : null, type]
  )
  res.status(201).json({ success: true, message: 'Clic registrado' })
})

exports.getStats = asyncHandler(async (req, res) => {
  const [general] = await pool.execute(
    "SELECT COUNT(*) AS total FROM whatsapp_clicks WHERE type = 'general'"
  )
  const [byProject] = await pool.execute(`
    SELECT project_id, type, COUNT(*) AS clicks
    FROM whatsapp_clicks
    GROUP BY project_id, type
    ORDER BY clicks DESC
  `)
  res.json({ general: general[0].total, byProject })
})
