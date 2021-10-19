const { checkSchema } = require('express-validator');

module.exports = {
    signup:
        checkSchema({
            name: {
                trim: true,
                isLength: {
                    options: { min: 3 }
                },
                errorMessage: "Nome não pode ser vazio ou menor que 3 caracteres!"
            },
            email: {
                isEmail: true,
                normalizeEmail: true,
                errorMessage: 'Email inválido!'
            },
            password: {
                isLength: {
                    options: { min: 3 }
                },
                errorMessage: 'A senha precisa ter pelo o menos 3 caracteres!'
            },
            state:{
                notEmpty: true,
                errorMessage: 'Estado não preenchido!'
            }
        }),
        signin: checkSchema({
            email: {
                isEmail: true,
                normalizeEmail: true,
                errorMessage: 'Email inválido!'
            },
            password: {
                isLength: {
                    options: { min: 3 }
                },
                errorMessage: 'A senha precisa ter pelo o menos 3 caracteres!'
            },
        })
}
