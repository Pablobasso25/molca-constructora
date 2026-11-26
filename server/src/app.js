const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const config = require('./config')

const app = express()

// En producción las peticiones llegan reenviadas por Apache.
app.set('trust proxy', 1)

app.use(helmet())
app.use(cors({ origin: config.cors.origin, credentials: true }))
app.use(express.json({ limit: '100kb' }))
app.use(express.urlencoded({ extended: false, limit: '100kb' }))

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api/projects', require('./routes/projects'))
app.use('/api/leads', require('./routes/leads'))
app.use('/api/whatsapp', require('./routes/whatsapp'))
app.use('/api/metrics', require('./routes/metrics'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/admin', require('./routes/admin'))

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
})

// El detalle del error queda en los logs, no se envía al cliente.
app.use((err, req, res, next) => {
  const status = err.status >= 400 && err.status < 500 ? err.status : 500
  if (status === 500) console.error(err.stack)
  res.status(status).json({ error: status === 500 ? 'Error interno del servidor' : 'Petición inválida' })
})

module.exports = app
