const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const config = require('./config')
const { pool, initDB } = require('./config/database')

const projectRoutes = require('./routes/projects')
const leadRoutes = require('./routes/leads')
const whatsappRoutes = require('./routes/whatsapp')
const metricRoutes = require('./routes/metrics')
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin')

const app = express()

app.use(helmet())
app.use(cors({ origin: config.cors.origin, credentials: true }))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api/projects', projectRoutes)
app.use('/api/leads', leadRoutes)
app.use('/api/whatsapp', whatsappRoutes)
app.use('/api/metrics', metricRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Error interno del servidor' })
})

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
})

const start = async () => {
  await initDB()
  app.listen(config.port, () => {
    console.log(`Servidor MOLCA corriendo en puerto ${config.port}`)
    console.log(`Entorno: ${config.nodeEnv}`)
  })
}

start()

module.exports = app
