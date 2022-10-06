// Carrega as variaveis de ambiente
require('dotenv').config()

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');


var app = express();

// Conexão ao banco de dados remoto
const connectDb = require('./config/database')
connectDb()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

/* Rotas da aplicação */

const userRoute = require('./routes/user')
app.use('/user', userRoute)

const assessmentRoute = require('./routes/assessment')
app.use('/assessment', assessmentRoute)

const questionRoute = require('./routes/question')
app.use('/question', questionRoute)

// const answerRoute = require('./routes/answer')
// app.use('/answer', answerRoute)

const grossaryRoute = require('./routes/grossary')
app.use('/grossary', grossaryRoute)

const criterionRoute = require('./routes/criterion')
app.use('/criterion', criterionRoute)

module.exports = app;
