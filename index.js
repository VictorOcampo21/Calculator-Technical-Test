const express = require('express');
const winston = require('winston');
const app = express();
const path = require('path');

// Configuración de Winston para logs
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple())
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

// Middleware para parsear el cuerpo de la solicitud en formato JSON
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Función para enviar respuestas de error de forma uniforme
const sendErrorResponse = (res, status, message) => {
  const timestamp = new Date().toISOString();
  logger.error(`${message} IP: ${res.req.ip}`);
  return res.status(status).json({ error: message, timestamp });
};

// Función para realizar las operaciones matemáticas
const performOperation = (num1, num2, operacion) => {
  const operations = {
    suma: (a, b) => a + b,
    resta: (a, b) => a - b,
    multiplicacion: (a, b) => a * b,
    division: (a, b) => a / b
  };

  // Si la operación es división, validamos si num2 es cero
  if (operacion === 'division' && num2 === 0) {
    return null;  // Dividir por cero no es válido
  }

  if (!operations[operacion]) return null;  // Operación no válida
  return operations[operacion](num1, num2);
};

// Ruta para la operación matemática
app.post('/api/operacion', (req, res) => {
  const { num1, num2, operacion } = req.body;

  // Validación de entrada
  if (num1 === undefined || num2 === undefined || !operacion) {
    return sendErrorResponse(res, 400, 'Faltan parámetros: num1, num2 y operacion son necesarios.');
  }

  // Validar si num1 y num2 son números válidos (no NaN)
  if (isNaN(num1) || isNaN(num2)) {
    return sendErrorResponse(res, 400, 'Los valores de num1 y num2 deben ser números.');
  }

  // Realizamos la operación matemática
  const resultado = performOperation(num1, num2, operacion);
  if (resultado === null) {
    // Si el resultado es null, significa que hubo un error en la operación (división por cero o operación no válida)
    if (operacion === 'division' && num2 === 0) {
      return sendErrorResponse(res, 400, 'No se puede dividir por cero.');
    }
    return sendErrorResponse(res, 400, 'Operación no válida. Usa suma, resta, multiplicacion o division.');
  }

  // Log de la operación exitosa
  logger.info(`Operación exitosa. operacion: ${operacion}, num1: ${num1}, num2: ${num2}, resultado: ${resultado}, IP: ${res.req.ip}`);

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
