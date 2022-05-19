const express = require('express');
const path = require('path');
require('dotenv').config(); //* Variables de entorno

//* DB Config
const { dbConnection } = require('./database/config');
dbConnection();

//* App de express
const app = express();

//* Lectura y parseo del body de una petición HTTP
app.use(express.json());

//* Configuración del Servidor
const server = require ('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

//* Path público
const publicPath = path.resolve(__dirname, 'public');

//* Mis rutas
app.use('/api/login', require('./routes/authentication'));

app.use(express.static(publicPath));

server.listen(process.env.PORT, (err) => {
    if(err) throw new Error(err);
    console.log('Server running on port ' + process.env.PORT);
});