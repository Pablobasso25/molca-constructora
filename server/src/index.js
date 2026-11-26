const config = require('./config')
const pool = require('./config/db')
const app = require('./app')

const start = async () => {
  await pool.execute('SELECT 1')

  // En producción solo Apache (local) debe alcanzar el puerto.
  const host = config.nodeEnv === 'production' ? '127.0.0.1' : undefined
  const server = app.listen(config.port, host, () => {
    console.log(`Servidor MOLCA en puerto ${config.port} (${config.nodeEnv})`)
  })

  const shutdown = () => {
    server.close(() => {
      pool.end().then(() => process.exit(0), () => process.exit(1))
    })
  }
  process.once('SIGINT', shutdown)
  process.once('SIGTERM', shutdown)
}

start().catch((error) => {
  console.error('No se pudo iniciar el servidor:', error.message)
  process.exit(1)
})
