const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    idUser: { type: String },
    state: { type: String },
    category: { type: String },
    images: [Object],
    dateCreated: { type: Date },
    title: { type: String },
    price: { type: Number },
    priceNegotiable: { type: Boolean },
    description: { type: String },
    views: { type: Number },
    status: { type: String },
});

const modelName = 'Ad';

if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName]
} else {
    module.exports = mongoose.model(modelName, modelSchema);
}