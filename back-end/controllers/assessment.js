const Assessment = require('../models/assessment')
const answer = require('../models/answer')
const assessment = require('../models/assessment')

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
        await Assessment.create(req.body)
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
        const result = await Assessment.find().populate('user')
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
        const result = await Assessment.findById(req.params.id)

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
        const result = await Assessment.findByIdAndUpdate(req.params.id, req.body)


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
        const result = await Assessment.findByIdAndDelete(req.params.id)

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

controller.retrieveAllAnswers = async (req, res) => {
    try {
        const assessment = await Assessment.findById(req.params.assessment.id).populate({ path: 'answer', populate: { path: 'question' } })
        // HTTP 200: ok (implicito)
        if (assessment) res.send(assessment.answers)
        // HTTP 404: Not Fond
        else res.status(404).end()
    }
    catch (error) {
        console.error(error)
        // HTTP 500: Internal server error
        res.status(500).send(error)
    }
}

controller.retrieveOneAnswer = async (req, res) => {
    try {
        const result = await Assessment.findById(req.params.assessment.id).populate({ path: 'answer', populate: { path: 'question' } })

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


/***********************************************************************
    Método para o model Answer
 */
controller.createAnswer = async (req, res) => {
    try {
        // 1) Encontra a avaliação (assessment) por meio do parâmetro :assessment_id
        let result = await assessment.findById(req.params.assessment_id)

        if (result) {
            // 2) Verifica se o campo "answer" já existe na avaliação
            if (assessment.answers) {
                // 2.1) Verifica se a resposta para a pergunta especificada já exixte no vetor
                let idx = assessment.answers.findIndex(a => a.question === req.body.qustion)
                if (idx >= 0) {
                    // Já existe uma resposta para a pergunta no vetor "answers"
                    assessment.answers[idx] = req.body
                }
                else {
                    // Insere a resposta (req.body) no vetor "answers"
                    assessment.answers.push(req.body)
                }
            }
            else {
                // Cria o vetor "answers" com primeiro elemento
                assessment.answers = [req.body]
            }

            // Atualiza assessment
            const result = await Assessment.findByIdAndUpdate(req.params.assessment_id, assessment)
            // HTTP 204: No content
            if (result) return res.status(204).end() // Encontrou e atualizou
            else res.status(404).end() // não encontro       
        }
        // HTTP 404: NotFound
        else res.status(404).end
    }
    catch (error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}



module.exports = controller