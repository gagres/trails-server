const express     = require('express'),
      environment = require('./environment'),
      consign     = require('consign'),
      http        = require('http');

environment(); // Inicializa variáveis de ambiente

process.env.PORT = process.env.PORT || 3000

let app = express();

consign({ locale: "pt-br" })
    .include('configs')
    .then('helpers')
    .then('models')
    .then('controllers')
    .then('routes')
    .into(app);

const server = app.listen(process.env.PORT, () => {
    const host = server.address().address;
    const port = server.address().port;
    
    console.info(
        `Aplicação inicializada (${ process.env.NODE_ENV }) - Porta: ${ port }`
    );
})

module.exports = app;