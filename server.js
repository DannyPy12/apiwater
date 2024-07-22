const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./conexion'); // Ajusta el camino al archivo de conexión

const infoplantas = require('./routes/tabla_infoplantas');
const infoplantas2 = require('./routes/tabla_infoplantas2');
const plantas = require('./routes/tabla_plantas');
const usuarios = require('./routes/tabla_usuarios');

const app = express();
app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:5173',  // Permitir solicitudes desde este origen específico
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

// Responder manualmente a las solicitudes OPTIONS para asegurar que se incluyen los encabezados CORS
app.options('*', cors(corsOptions));

// Usar rutas
app.use('/infoplantas', infoplantas);
app.use('/infoplantas2', infoplantas2);
app.use('/plantas', plantas);
app.use('/usuarios', usuarios);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
