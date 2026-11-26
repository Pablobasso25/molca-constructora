const mysql = require('mysql2/promise')
const config = require('./index')

const pool = mysql.createPool({
  ...config.db,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4',
  timezone: '-03:00',
})

// `timezone` solo afecta la conversión de fechas en Node. La sesión de MySQL
// también tiene que usar -03:00 para que CURRENT_TIMESTAMP coincida.
pool.on('connection', (connection) => {
  connection.query("SET time_zone = '-03:00'", (error) => {
    if (error) console.error('No se pudo fijar la zona horaria:', error.message)
  })
})

module.exports = pool
