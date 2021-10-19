const Category = require('../models/Category');
const User = require('../models/User');
const Ad = require('../models/Ad');
const State = require('../models/State');

const mongoose = require('mongoose');

exports.getCategories = async (req, res) => {
    const cats = await Category.find();
    let categories = [];

    for (let item in cats) {
        categories.push({
            ...cats[item]._doc,
            img: `${process.env.BASE_URL}/assets/images/${cats[item].slug}.png`
        });
    }
    res.status(200).json({ categories });
}

exports.addAction = async (req, res) => {
    let { title, desc, price, token, categ, priceneg } = req.body;
    let user = await User.findOne({ token }).exec();

    if (!title || !desc) {
        res.status(400).json({
            error: 'Titulo e/ou descrição são obrigatórios'
        });
        return;
    }

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error: 'ID inválido'});
        return;  
    }

    const category = await Category.findById(cat);

    if(!category){
        res.status(400).json({error: 'Categoria inexistente'});
        return; 
    }

    if (price) {
        price = price.replace('.', '').replace(',', '.').replace('R$', '');
        price = parseFloat(price);
    } else {
        price = 0
    }

    let new_add = new Ad();
    new_add.status = true;
    new_add.idUser = user._id;
    new_add.state = user.state;
    new_add.dateCreated = new Date();
    new_add.title = title;
    new_add.category = categ;
    new_add.price = price;
    new_add.priceNegotiable = (priceneg === 'true') ? true : false;
    new_add.description = desc;
    new_add.views = 0;

    let info = await new_add.save();
    res.json({ id: info._id });

}

exports.getList = async (req, res) => {
    let {offset = 0, limit = 8, q, cat, state} = req.body;
    let filters = {status: true};
    let total = 0;
    // deixar a busca apenas pelo nome do produto

    if(q){
        filters.title = {'$regex': q, '$options': 'i'};
    }

    if(cat){
        const c = await Category.findOne({slug: cat}).exec();
        if(c){
            filters.category = c._id.toString();
        }
    }

    if(state){
        const s = await State.findOne({name: state.toUpperCase()}).exec();
        if(s){
            filters.state = s._id.toString();
        }
    }

    const ads_total = await Ad.find(filters).exec;
    total = ads_total.length;

    const ads_data = await Ad.find(filters)
        .skip(parseInt(offset))
        .limit(parseInt(limit))
        .exec();
    let ads = [];
    for (let i in ads_data){
        ads.push({
            id: ads_data[i]._id,
            title: ads_data[i].title,
            price: ads_data[i].price,
            priceNegotiable: ads_data[i].priceNegotiable,
        })
    }
    res.json({ads, total});
}

exports.getItem = async (req, res) => {
    let {id , other = null} = req.body;

    if(!id){
        res.status(400).json({ error :'Sem produto'});
        return;
    }

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error: 'ID inválido'});
        return;  
    }

    const ad = await Ad.findById(id);
    ad.views++;
    await ad.save();

    let user_info = await User.findById(ad.idUser).exec();
    let state_info = await State.findById(ad.state).exec();

    let others = [];
    if(others) {
        const otherData = await Ad.find({status:true , idUser: ad.idUser}).exec();

        for(let i in others){
            if(otherData[i]._id.toString() != ad._id.toString()){
                others.push({
                    id: otherData[i]._id,
                    title: otherData[i].title,
                    price: otherData[i].price,
                    priceNegotiable: otherData[i].priceNegotiable,
                    description: otherData[i].description,
                })
            }
        }
    }

    res.json({
        id: ad._id,
        title: ad.title,
        price: ad.price,
        priceNegotiable: ad.priceNegotiable,
        description: ad.description,
        created_at: ad.created_at,
        views: ad.views,
        user_info: {
            name: user_info.name,
            email: user_info.email
        },
        state_info: state_info.name,
        others
    });


}

exports.editActionAds = async (req, res) => {
    let { id } = req.params;
    let { title, price, desc, cat, priceneg, token, status} = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error: 'ID inválido'});
        return;  
    }

    const ad = await Ad.findById(id).exec();
    if(!ad){
        res.status(400).json({error: "Anúncio inexistente"});
        return;
    }

    const user = await User.findOne({token}).exec();
    if(user._id.toString() !== ad.idUser){
        res.json({error: 'Este anuncio nao é seu'});
        return;
    }

    let updates = {};

    if(title){
        updates.title = title;
    }

    if(price){
        price = price.replace('.', '').replace(',', '.').replace('R$', '');
        price = parseFloat(price);
        updates.price = price;
    }

    if(priceneg){
        updates.priceNegotiable = priceneg;
    }

    if(status){
        updates.status = status;
    }

    if(desc){
        updates.description = desc;
    }

    if(cat){
        const c = await Category.findOne({slug: cat}).exec();
        if(!cat){
            res.json({error: 'Esta categoria nao existe'});
        return;
        }
        updates.category = c._id.toString();
    }

    await Ad.findByIdAndUpdate(id, {$set: updates });

    res.json({updates});
}