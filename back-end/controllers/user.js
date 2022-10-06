const User = require('../models/user')

const controller = {} // objeto vazio

/*
    Método de CRUD do controller 
    create: cria um novo usuário
    retrive: retorna todos usuários cadastrados
    retriveOne: retorna um unico usuário
    update: atualiza os dados de um usuário
    delete: exclui um usuário
*/

controller.create = async (req, res) => {
    try {
        await User.create(req.body)
        // HTTP 201: Create
        res.status(201).end()
    }
    catch (error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.retrieveAll = async (req, res) => {
    try {
        // find() sem parametros retorna todos os documentos da coleção
        const result = await User.find()
        // HTTP 200: OK (implicito)
        res.send(result)
    }
    catch (error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.retrieveOne = async (req, res) => {
    try {
        const result = await User.findById(req.params.id)

        // HTTP 200: OK (implicito)
        if (result) res.send(result)  // Encontrou o documento
        // HTTP 404: Not Found
        else res.status(404).end()   // não encontrado
    }
    catch (error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.update = async (req, res) => {
    try {
        const result = await User.findByIdAndUpdate(req.params.id, req.body)


        if (result) return res.status(204).end() // Encontrou e atualizou
        else res.status(404).end()  //não encontrou
    }
    catch (error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.delete = async (req, res) => {
    try {
        const result = await User.findByIdAndDelete(req.params.id)

        // 204: No Connect
        if (result) res.status(204).end() // Encontrou deletou
        else res.status(404).end  // não encontrou
    }
    catch (error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

module.exports = controller