const express = require('express');
require('dotenv').config();
const cors = require('cors');

//Servidor de express
const app = express();

//Base de datos
const dbConnection = require('./database/config');
dbConnection();

//cors
app.use(cors());

//escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`servidor corriendo en el puerto ${process.env.PORT}`);
});

//Directorio publico
app.use(express.static('public'));
//Lectura y parseo del body
app.use(express.json());

//Rutas
const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);

const eventRouter = require('./routes/events');
app.use('/api/events', eventRouter);
