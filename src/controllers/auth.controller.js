const mongoose = require('mongoose');
const User = require('../models/User');
const State = require('../models/State');

const bcryptjs = require('bcryptjs');
const { validationResult, matchedData } = require('express-validator');

exports.signin = async (req, res) => {
     // validando os dados enviados pelo usuário
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({ errors: errors.mapped() });
        return;
    };
    const user_data = matchedData(req);

    // procurando na base de dados um usuário com o email informado.
    const user = await User.findOne({ email: user_data.email });

    // validando se existe um usuário com o email informado.
    if(!user) {
        res.status(400).json({ error: 'Email/ou senha incorreto!'});
        return;
    }

    // validando se a senha informada pelo usuário bate com a do email cadastrado
    const match = await bcryptjs.compare(user_data.password, user.password);

    if(!match){
        res.status(400).json({ error: 'Email/ou senha incorreto!'});
        return;
    }

    // gerando um token novo e salvando neste usuário
    const payload = (Date.now() + Math.random()).toString();
    const token = await bcryptjs.hash(payload, 10);

    user.token = token;
    await user.save();

    res.status(200).json({token, email: user_data.email});
}

exports.signup = async (req, res) => {
    // validando os dados enviados pelo usuário
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({ errors: errors.mapped() });
        return;
    };
    const user_data = matchedData(req);

    // verificando o email enviado
    const user = await User.findOne({
        email: user_data.email
    });

    if(user){
        res.status(400).json({
            error: { email:{ msg:'Email já cadastrado!' } }
        });
        return;
    }

    // verificando se o estado existe
    if(mongoose.Types.ObjectId.isValid(user_data.state)){
        const stateItem = await State.findById(user_data.state);
        if(!stateItem) {
            res.status(400).json({
            error: { state:{ msg:'Estado não existe!' } }
            });
            return;
        }
    }else {
        res.status(400).json({
            error: { state:{ msg:'Código de estado inválido!' } }
            });
            return;
    }

    // adicionando hash na senha enviada e gerando o token do usuário
    const passwordHash = await bcryptjs.hash(user_data.password, 10);
    const payload = (Date.now() + Math.random()).toString();
    const token = await bcryptjs.hash(payload, 10);

    // criando um modelo de usuário com as informações enviadas
    const new_user = new User({
        name: user_data.name,
        email: user_data.email,
        password: passwordHash,
        state: user_data.state,
        token
    });

    // savando o usuário no mongoDB
    await new_user.save();

    res.status(200).json({token});
}
