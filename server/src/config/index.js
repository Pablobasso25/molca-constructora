const path = require('path')

// Ruta absoluta: PM2 puede arrancar el proceso desde cualquier carpeta.
require('dotenv').config({ path: path.join(__dirname, '../../.env') })

const required = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'JWT_SECRET', 'CORS_ORIGIN']
const missing = required.filter((key) => !process.env[key])

if (missing.length > 0) {
  throw new Error(`Faltan variables de entorno: ${missing.join(', ')}`)
}

module.exports = {
  port: Number(process.env.PORT) || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '24h',
  },
  cors: {
    origin: process.env.CORS_ORIGIN,
  },
}
