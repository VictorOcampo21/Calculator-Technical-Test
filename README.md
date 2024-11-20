# Calculadora API con Interfaz Web

Este proyecto es una API de calculadora construida con **Node.js** y **Express**, que realiza operaciones matemáticas básicas como suma, resta, multiplicación y división. Además, incluye una interfaz web que se conecta con la API para probarla en el navegador.

## Requisitos

Antes de comenzar, asegúrate de tener instalados los siguientes requisitos:

- [Node.js](https://nodejs.org/) (incluye `npm`, el gestor de paquetes para Node.js)

## Instalación

### 1. Clonar el repositorio

Primero, clona el repositorio en tu máquina local usando Git:

```bash
git clone https://github.com/tu_usuario/calculadora-api.git
cd calculadora-api
```
### 2. Configuración de la API
#### 1. Instalar dependencias para el backend (API) en Node.js:
En el directorio de tu proyecto, instala las dependencias necesarias ejecutando:
```bash

npm install
```
#### 2. Ejecutar la API:
Una vez que las dependencias estén instaladas, ejecuta la API con el siguiente comando:
```bash

npm run start
```
La API debería estar disponible en `http://localhost:3000`.
### 3. Probar la aplicación
#### 3.1. Probar la API
Puedes probar la API utilizando herramientas como [**Postman**](https://www.postman.com/downloads/) o [**cURL**](https://curl.se/docs/install.html). La API tiene un único endpoint para realizar operaciones matemáticas.
Endpoint: `POST /api/operacion`
#### Cuerpo de la solicitud (JSON):
```JSON
{
  "num1": 5,
  "num2": 3,
  "operacion": "suma"
}
```
Ejemplo de solicitud usando cURL:
```bash
curl -X POST http://localhost:3000/api/operacion -H "Content-Type: application/json" -d '{"num1": 5, "num2": 3, "operacion": "suma"}'
```
#### Respuestas posibles:
* Si la operación es exitosa, recibirás un objeto JSON con el resultado:
```JSON
{
  "operation": "suma",
  "input_values": {
    "num1": 5,
    "num2": 3,
    "operacion": "suma"
  },
  "result": 8,
  "timestamp": "2024-11-20T12:34:56.789Z"
}
```
* Si hay un error, como un parámetro faltante o una operación inválida, recibirás un mensaje de error:
```JSON
{
  "error": "Faltan parámetros: num1, num2 y operacion son necesarios.",
  "timestamp": "2024-11-20T12:34:56.789Z"
}
```
#### 3.2. Probar la Interfaz Web
Accede a `http://localhost:3000` en tu navegador y utiliza la interfaz web para realizar las operaciones de la calculadora. La interfaz enviará solicitudes POST a la API y mostrará los resultados de manera visual.
# Endpoints disponibles de la API
La API soporta las siguientes operaciones matemáticas:
* Suma: `POST /api/operacion` con el campo `"operacion": "suma"`
* Resta: `POST /api/operacion` con el campo `"operacion": "resta"`
* Multiplicación: `POST /api/operacion` con el campo `"operacion": "multiplicacion"`
* División: `POST /api/operacion` con el campo `"operacion": "division"`
Cada operación requiere los parámetros `num1` y `num2`, que deben ser números válidos.
#### Ejemplo de cuerpo de la solicitud:
```JSON
{
  "num1": 10,
  "num2": 2,
  "operacion": "multiplicacion"
}
```
## Respuestas de error
Si algún parámetro falta o es inválido, la API devolverá un error con un código de estado `400` y un mensaje adecuado. Algunos ejemplos:
* Faltan parámetros:
```JSON
{
  "error": "Faltan parámetros: num1, num2 y operacion son necesarios.",
  "timestamp": "2024-11-20T12:34:56.789Z"
}
```
* Operación no válida:
```JSON
{
  "error": "Operación no válida. Usa suma, resta, multiplicacion o division.",
  "timestamp": "2024-11-20T12:34:56.789Z"
}
```
* División por cero:
```JSON
{
  "error": "No se puede dividir por cero.",
  "timestamp": "2024-11-20T12:34:56.789Z"
}
```
# Logs
El proyecto utiliza Winston para el manejo de logs. Los logs se guardan en los siguientes archivos:
* `logs/combined.log` para logs generales.
* `logs/error.log` para los errores.
Puedes ver los logs de las operaciones y errores de la API para depuración o monitoreo.
# Contribuir
Si deseas contribuir a este proyecto, por favor sigue estos pasos:
1. Haz un fork de este repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Agregué una nueva funcionalidad'`).
4. Envía un pull request.




