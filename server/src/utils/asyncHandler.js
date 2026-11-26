// Express 4 no captura promesas rechazadas: se derivan al manejador de errores.
module.exports = (handler) => (req, res, next) => handler(req, res, next).catch(next)
