const express     = require('express'),
      environment = require('./environment'),
      consign     = require('consign'),
      http        = require('http');

environment(); // Inicializa variáveis de ambiente

let app = express();

consign({ locale: "pt-br" })
    .include('configs')
    .then('helpers')
    .then('app')
    .into(app);

const server = app.listen(process.env.PORT, () => {
    const host = server.address().address;
    const port = server.address().port;
    
    console.info(
        `Aplicação inicializada (${ process.env.NODE_ENV }) - Porta: ${ port }`
    );
})

module.exports = app;