const { pool } = require('../config/database')

exports.getMetrics = async (req, res) => {
  try {
    const [constructora] = await pool.query(
      "SELECT COUNT(*) as total FROM leads WHERE proyecto IN ('GPS','Mitre 2695','GS01')"
    )
    const [desarrollos] = await pool.query(
      "SELECT COUNT(*) as total FROM leads WHERE proyecto IN ('Casas del Río','Dúplex Ventus','Osadía')"
    )
    const [porProyecto] = await pool.query(
      'SELECT proyecto, COUNT(*) as total FROM leads GROUP BY proyecto ORDER BY total DESC'
    )
    const [totalLeads] = await pool.query('SELECT COUNT(*) as total FROM leads')

    res.json({
      constructora: constructora[0].total,
      desarrollos: desarrollos[0].total,
      porProyecto,
      totalLeads: totalLeads[0].total,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
