const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'molca',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        tipo VARCHAR(100) NOT NULL,
        ciudad VARCHAR(100) NOT NULL,
        estado ENUM('en obra', 'entregado', 'planeado', 'preventa') DEFAULT 'en obra',
        descripcion TEXT,
        imagen VARCHAR(500),
        imagenes JSON,
        destacado TINYINT(1) DEFAULT 0,
        activo TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    await pool.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        telefono VARCHAR(50),
        mensaje TEXT,
        proyecto VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await pool.query(`
      CREATE TABLE IF NOT EXISTS whatsapp_clicks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        project_id INT,
        type ENUM('general', 'specific') DEFAULT 'general',
        clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
      )
    `)

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        usuario VARCHAR(100) NOT NULL UNIQUE,
        clave VARCHAR(255) NOT NULL,
        rol ENUM('admin', 'editor') DEFAULT 'admin',
        activo TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    const [existing] = await pool.query('SELECT id FROM users LIMIT 1')
    if (existing.length === 0) {
      const bcrypt = require('bcryptjs')
      const hash = await bcrypt.hash('admin123', 10)
      await pool.query('INSERT INTO users (usuario, clave, rol) VALUES (?, ?, ?)', ['admin', hash, 'admin'])
      console.log('Usuario admin creado: admin / admin123')
    }

    console.log('Base de datos inicializada correctamente')
  } catch (error) {
    console.error('Error inicializando BD:', error.message)
  }
}

module.exports = { pool, initDB }
