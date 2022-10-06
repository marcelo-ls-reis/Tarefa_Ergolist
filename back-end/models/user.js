const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        index: { unique: true }
    },
    password_has: {
        type: String,
        require: true,
        select: false
    },
    is_admin: {
        type: Boolean,
        require: true,
        default: false
    },
    create_at: {
        type: Date,
        require: true,
        default: Date.now() // Data/hora atual
    }
})

/*
    Parametros de mongoose.model:
    1º o nome do model, para uso interno. Por convenção, usa-se inicial maiuscula.
    2º a relação de campos do esquema(variavel schema)
    3º o nome da collection no banco de dados (normalmente é o mesmo nome da model)  
*/

module.exports = mongoose.model('User', schema, 'users')