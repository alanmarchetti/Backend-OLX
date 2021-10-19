const mongoose = require('mongoose');
const { database } = require('../config/mongo.config');

const connect = mongoose.connect(database)
.then(() => console.log('Conectado a base de dados'))
.catch((error) => console.log(`Erro ao se conectar a base de dados ${error}`));

module.exports =  connect;
   