const { checkSchema } = require('express-validator');

module.exports = {
    editAction:
        checkSchema({
            token: { notEmpty: true },
            name: {
                optional: true,
                trim: true,
                isLength: {
                    options: { min: 3 }
                },
                errorMessage: "Nome não pode ser vazio ou menor que 3 caracteres!"
            },
            email: {
                optional: true,
                isEmail: true,
                normalizeEmail: true,
                errorMessage: 'Email inválido!'
            },
            password: {
                optional: true,
                isLength: {
                    options: { min: 3 }
                },
                errorMessage: 'A senha precisa ter pelo o menos 3 caracteres!'
            },
            state:{
                optional: true,
                notEmpty: true,
                errorMessage: 'Estado não preenchido!'
            }
        }),
}
