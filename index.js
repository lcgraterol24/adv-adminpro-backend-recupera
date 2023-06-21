require('dotenv').config();
const path = require('path');

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use( cors() );

//Carpeta publica
app.use(express.static('public'));

// Lectura y parseo del body
app.use( express.json() );

// Base de datos
dbConnection();


// Rutas
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/hospitales', require('./routes/hospitales') );
app.use( '/api/medicos', require('./routes/medicos') );
app.use( '/api/todo', require('./routes/busquedas') );
app.use( '/api/upload', require('./routes/uploads') );
app.use( '/api/login', require('./routes/auth') );


// //lo ultimo: cualquier ruta que no sea la anterior
app.get('*', (req, res) =>{
    res.sendFile( path.resolve(__dirname, 'public/index-backup.html'))
})
//lo anterior sirve en caso de que haya copiado la carpeta de dist/adminpro de mi proyecto angular 
//para la carpeta public de aca del backend. Pero yo lo tengo el proyectos separados

// app.get('*', '/');

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT );
});

