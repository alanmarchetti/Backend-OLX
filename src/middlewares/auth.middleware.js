const User = require('../models/User');

exports.privateRouter = async(req, res, next) => {
    // verificando se recebemos algum token pelo body(post) ou pelo params(get).
    if(!req.query.token && !req.body.token){
        res.status(400).json({
            notallowed: true,
            msg: 'Acesso negado'
        });
        return;
    }

    // verificando se o token enviado é válido
    let token = '';
    if(req.query.token) token = req.query.token;

    if(req.body.token) token = req.body.token;

    if(token == ''){
        res.status(400).json({
            notallowed: true,
            msg: 'Token inválido'
        });
        return;
    }

    // achando um usuário baseado no token enviado
    const user = await User.findOne({
        token
    });

    // verificando se o token enviado não foi achado em nenhum usuário
    if(!user){
        res.status(400).json({
            notallowed: true,
            msg: 'Token inválido'
        });
        return;
    }

    next();
}