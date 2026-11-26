const pool = require('../config/db')
const asyncHandler = require('../utils/asyncHandler')

exports.getMetrics = asyncHandler(async (req, res) => {
  const [totals] = await pool.execute(`
    SELECT
      COUNT(*) AS totalLeads,
      COUNT(CASE WHEN proyecto IN ('GPS', 'Mitre 2695', 'GS01') THEN 1 END) AS constructora,
      COUNT(CASE WHEN proyecto IN ('Casas del Río', 'Dúplex Ventus', 'Osadía') THEN 1 END) AS desarrollos
    FROM leads
  `)
  const [porProyecto] = await pool.execute(
    'SELECT proyecto, COUNT(*) AS total FROM leads GROUP BY proyecto ORDER BY total DESC'
  )
  const [clicks] = await pool.execute('SELECT COUNT(*) AS total FROM whatsapp_clicks')

  res.json({ ...totals[0], porProyecto, whatsapp: clicks[0].total })
})
