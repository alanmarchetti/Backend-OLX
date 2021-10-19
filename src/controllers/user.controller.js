const mongoose = require('mongoose');
const State = require('../models/State');
const User = require('../models/User');
const Category = require('../models/Category');
const Ad = require('../models/Ad');

const bcryptjs = require('bcryptjs');
const { validationResult, matchedData } = require('express-validator');

exports.getStates = async (req, res) => {
    let states = await State.find(); // - retornando uma lista com todos os estados cadastrados.
    res.json({ states })
}

exports.info = async (req, res) => {
    let token = req.body.token;

    const user = await User.findOne({ token });
    const states = await State.findById(user.state);
    const ads = await Ad.find({ idUser: user._id.toString() });

    let adList = [];

    for (let item in ads) {
        const cat = await Category.findById(ads[item].category);
        adList.push({ ...ads[item], category: cat.slug });
    }

    res.status(200).json({
        name: user.name,
        email: user.email,
        state: states.name,
        ads: adList
    })
}

exports.editAction = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ errors: errors.mapped() });
        return;
    };
    const user_data = matchedData(req);

    let updates = {};

    if (user_data.name) updates.name = user_data.name;

    if (user_data.email) {
        const emailCheck = await User.findOne({ email: user_data.email });
        if (emailCheck) {
            res.status(400).json({ error: 'Email já existente' });
            return;
        }
        updates.email = user_data.email;
    }

    if (user_data.state) {
        if (mongoose.Types.ObjectId.isValid(user_data.state)) {
            const stateCheck = await State.findById(user_data.state);
            if (!stateCheck) {
                res.status(400).json({ error: 'Estado não existe' });
                return;
            }
            updates.state = user_data.state;
        }else{
            res.status(400).json({ error: 'Código de estado existe' });
            return; 
        }
        
    }

    if(user_data.password){
        updates.password = await bcryptjs.hash(user_data.password, 10);
    }

    await User.findOneAndUpdate({ token: user_data.token }, { $set: updates });

    res.json({});
}