# Molca - Constructora y Desarrolladora

Sitio web institucional con catálogo de obras, motor de métricas y panel de administración.

## Stack

- **Frontend**: React 19 + Vite + Tailwind CSS
- **Backend**: Express + Node.js
- **Base de datos**: MySQL (VPS DonWeb)
- **Autenticación**: JWT
- **Imágenes**: Cloudinary

## Estructura

```
molca-page/
├── client/          # React + Vite + Tailwind
├── server/          # Express + Node.js + MySQL
└── README.md
```

## Instalación y desarrollo

### Backend
```bash
cd server
cp .env.example .env
# Editar .env con credenciales de MySQL y JWT
mysql -u molca_api -p molca_api < schema.sql
npm install
npm run create-admin -- admin
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

## Endpoints API

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/projects | Listar proyectos |
| GET | /api/projects/:id | Detalle de proyecto |
| POST | /api/projects | Crear proyecto (admin) |
| PUT | /api/projects/:id | Actualizar proyecto (admin) |
| PATCH | /api/projects/:id/activo | Activar/pausar proyecto (admin) |
| DELETE | /api/projects/:id | Eliminar proyecto (admin) |
| POST | /api/leads | Registrar lead de contacto |
| GET | /api/leads | Listar leads (admin) |
| GET | /api/whatsapp/stats | Clics de WhatsApp (admin) |
| POST | /api/whatsapp/click | Trackear clic de WhatsApp |
| GET | /api/metrics | Métricas de tráfico (admin) |
| POST | /api/auth/login | Login admin |
| GET | /api/auth/me | Perfil usuario |

## Despliegue VPS (DonWeb)

1. Subir código al VPS (IP: 149.50.144.63)
2. Crear las tablas: `mysql -u molca_api -p molca_api < server/schema.sql`
3. Configurar `server/.env` (`NODE_ENV=production`, `CORS_ORIGIN=https://molcaconstructora.com.ar`) e instalar con `npm ci --omit=dev`
4. Instalar PM2: `npm install -g pm2`
5. Iniciar backend: `pm2 start server/src/index.js --name molca-api`
6. Build frontend: `cd client && npm run build`
7. Configurar Apache como Reverse Proxy
8. Configurar SSL

## Usuario administrador

No hay credenciales por defecto. Crear el usuario (o cambiar su clave) desde `server/`:

```bash
npm run create-admin -- admin
```

## Licencia

Privado - MOLCA Constructora / Desarrollos
