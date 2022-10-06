const mongoose = require('mongoose')

// Usa destruturação para obter as variáveis de ambiente necessario para fazer a conexão

const{
    MONGODB_USER,
    MONGODB_PASS,
    MONGODB_SERVER,
    MONGODB_DATABASE
} = process.env

module.exports = function() {
    mongoose.connect(`mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_SERVER}/${MONGODB_DATABASE}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    mongoose.connection.on('connected', () =>
        console.log('** Mongoose conectado ao servidor remoto **')
    )
    mongoose.connection.on('error', () =>
        console.error('** Mongoose ERRO DE CONEXÃO. Causa **' + Error)
    )

}