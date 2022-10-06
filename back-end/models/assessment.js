const mongoose = require('mongoose')

const schema = mongoose.Schema({
    // Campo de chave estrangeira para o model User
    user: {
        type: mongoose.ObjectId, // Tipo especial
        ref: "User",// Coleção referenciada
        required: true
    },
    name: {
        type: String,
        require: true,
    },
    object: {
        type: String,
        require: true,
    },
    descripition: {
        type: String
    },
    create_at: {
        type: Date,
        require: true,
        default: Date.now() // Data/hora atual
    },
    finished_at: {
        type: Date
    },
    answers: [{
        type: mongoose.ObjectId,
        ref: 'Answer'
    }]
})

/*
    Parametros de mongoose.model:
    1º o nome do model, para uso interno. Por convenção, usa-se inicial maiuscula.
    2º a relação de campos do esquema(variavel schema)
    3º o nome da collection no banco de dados (normalmente é o mesmo nome da model)  
*/

module.exports = mongoose.model('assessment', schema, 'assessments')