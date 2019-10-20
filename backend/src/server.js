const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://alex:alex@cluster0-lk5kr.mongodb.net/tordilhoNegro2?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    // req.query = Acessa query params (para filtros);
    // req.params = Acessar route params (para edição, delete);
    // req.body = Acessar corpo da requisição (para criação, edição);

app.use(express.json());
app.use(routes);

app.listen(3333);