const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    name: { type: String},
    email: { type: String},
    state: { type: String},
    password: { type: String},
    token: { type: String},
});

const modelName = 'User';

if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName]
}else{
    module.exports = mongoose.model(modelName, modelSchema);
}