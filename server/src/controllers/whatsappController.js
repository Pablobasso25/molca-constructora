const { pool } = require('../config/database')

exports.trackClick = async (req, res) => {
  try {
    const { projectId, type = 'general' } = req.body
    await pool.query(
      'INSERT INTO whatsapp_clicks (project_id, type) VALUES (?, ?)',
      [projectId || null, type]
    )
    res.json({ success: true, message: 'Clic registrado' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getStats = async (req, res) => {
  try {
    const [general] = await pool.query("SELECT COUNT(*) as total FROM whatsapp_clicks WHERE type = 'general'")
    const [byProject] = await pool.query(`
      SELECT project_id, type, COUNT(*) as clicks
      FROM whatsapp_clicks
      GROUP BY project_id, type
      ORDER BY clicks DESC
    `)
    res.json({ general: general[0].total, byProject })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
