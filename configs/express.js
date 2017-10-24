const express     = require('express'),
      bodyParser  = require('body-parser'), // Módulo que faz parser do body da requisição
      helmet      = require('helmet'), // Módulo que lida com algumas vúlnerabilidades básicas de requisições
      compression = require('compression') // Utilizado para empacotar as respostas da aplicação em gzip
      cors        = require('cors') // Habilita Cross-Origin

module.exports = app => {
    app.set('json spaces', '4');
    app.set(express.static(__dirname + 'assets'))

    // Configurações da aplicação
    app.use(cors());
    app.use(helmet());

    // Configurações do corpo da requisição
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
}