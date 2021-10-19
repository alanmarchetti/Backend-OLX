const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
   name: { type: String },
   slug: { type: String }
});

const modelName = 'Category';

if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName]
}else{
    module.exports = mongoose.model(modelName, modelSchema);
}