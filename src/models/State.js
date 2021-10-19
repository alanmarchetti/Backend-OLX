const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
   name: { type: String }
});

const modelName = 'State';

if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName]
}else{
    module.exports = mongoose.model(modelName, modelSchema);
}