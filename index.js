const express = require('express');
const winston = require('winston'); // Importamos winston para logging
const app = express();

// Configuración de Winston para logs
const logger = winston.createLogger({
  level: 'info', // Nivel de log predeterminado
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple())
    }), // Log en consola
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), // Logs de errores en archivo
    new winston.transports.File({ filename: 'logs/combined.log' }) // Todos los logs en archivo
  ]
});

// Middleware para parsear el cuerpo de la solicitud en formato JSON
app.use(express.json());

// Ruta para la operación matemática
app.post('/api/operacion', (req, res) => {
  const { num1, num2, operacion } = req.body;

  // Validación de entrada
  if (num1 === undefined || num2 === undefined || !operacion) {
    logger.error(`Faltan parámetros. num1: ${num1}, num2: ${num2}, operacion: ${operacion}. IP: ${req.ip}`); // Auditoría de error
    return res.status(400).json({
      error: 'Faltan parámetros: num1, num2 y operacion son necesarios.',
      timestamp: new Date().toISOString()
    });
  }

  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    logger.error(`Parametros invalidos. num1: ${num1}, num2: ${num2}. IP: ${req.ip}`); // Auditoría de error
    return res.status(400).json({
      error: 'Los valores de num1 y num2 deben ser números.',
      timestamp: new Date().toISOString()
    });
  }

  let resultado;

  // Realizamos la operación matemática
  switch (operacion) {
    case 'suma':
      resultado = num1 + num2;
      break;
    case 'resta':
      resultado = num1 - num2;
      break;
    case 'multiplicacion':
      resultado = num1 * num2;
      break;
    case 'division':
      if (num2 === 0) {
        logger.error(`División por cero intentada. num1: ${num1}, num2: ${num2}. IP: ${req.ip}`); // Auditoría de error
        return res.status(400).json({
          error: 'No se puede dividir por cero.',
          timestamp: new Date().toISOString()
        });
      }
      resultado = num1 / num2;
      break;
    default:
      logger.error(`Operación no válida. operacion: ${operacion}. IP: ${req.ip}`); // Auditoría de error
      return res.status(400).json({
        error: 'Operación no válida. Usa suma, resta, multiplicacion o division.',
        timestamp: new Date().toISOString()
      });
  }

  // Log de la operación exitosa
  logger.info(`Operación exitosa. operacion: ${operacion}, num1: ${num1}, num2: ${num2}, resultado: ${resultado}, IP: ${req.ip}`);

  // Respondemos con el resultado
  res.status(200).json({
    operation: operacion,
    input_values: { num1, num2, operacion },
    result: resultado,
    timestamp: new Date().toISOString()
  });
});

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
  logger.error(`Error inesperado: ${err.message}, stack: ${err.stack}, IP: ${req.ip}`);
  res.status(500).json({
    error: 'Algo salió mal en el servidor.',
    timestamp: new Date().toISOString()
  });
});

// Configuración del puerto y servidor
const PORT = 3000;
app.listen(PORT, () => {
  logger.info(`Servidor corriendo en http://localhost:${PORT}`);
});