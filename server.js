require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileupload = require('express-fileupload');
const { port, host } = require('./src/config/mongo.config');
const path = require('path');
const  mongoDB  = require('./src/database/mongo.connect');
const apiRoutes = require('./src/routes/api.routes');

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(fileupload());
server.use(express.static(path.join(__dirname, './public')));

server.use('/api', apiRoutes);

server.listen(port, () => {
    try{
        console.log(`Servidor iniciado em ${host}`)
    }catch(e){
        console.log(`Erro ao iniciar o servirdor ${e}`);
    }
});