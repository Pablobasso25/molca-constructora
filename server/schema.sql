-- MOLCA API - MySQL 8.0
-- Ejecutar sobre la base ya creada:
--   mysql -u molca_api -p molca_api < schema.sql

SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  tipo VARCHAR(100) NOT NULL,
  ciudad VARCHAR(100) NOT NULL,
  estado ENUM('en obra', 'entregado', 'planeado', 'preventa') NOT NULL DEFAULT 'en obra',
  descripcion TEXT,
  imagen VARCHAR(500),
  imagenes JSON,
  destacado TINYINT(1) NOT NULL DEFAULT 0,
  activo TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_projects_activo_created (activo, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS leads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefono VARCHAR(50),
  mensaje TEXT,
  proyecto VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_leads_created (created_at),
  KEY idx_leads_proyecto (proyecto)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS whatsapp_clicks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT,
  type ENUM('general', 'specific') NOT NULL DEFAULT 'general',
  clicked_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_whatsapp_project FOREIGN KEY (project_id)
    REFERENCES projects (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario VARCHAR(100) NOT NULL UNIQUE,
  clave VARCHAR(255) NOT NULL,
  rol ENUM('admin', 'editor') NOT NULL DEFAULT 'admin',
  activo TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
