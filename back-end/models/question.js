const mongoose = require('mongoose')

const schema = mongoose.Schema({
    criterion: {
        type: mongoose.ObjectId, // Tipo especial
        ref: "Criterion",// Coleção referenciada
        required: true
    },
    enuntiation: {
        type: String,
        require: true,
        select: false
    },
    glossary_rets: [{
        type: mongoose.ObjectId,
        ref: "Glossary_rets",
        required: true
    }],

})

/*
    Parametros de mongoose.model:
    1º o nome do model, para uso interno. Por convenção, usa-se inicial maiuscula.
    2º a relação de campos do esquema(variavel schema)
    3º o nome da collection no banco de dados (normalmente é o mesmo nome da model)  
*/

module.exports = mongoose.model('Question', schema, 'question')