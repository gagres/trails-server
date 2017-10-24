const express = require('express'),
      dotenv  = require('dotenv'),
      consign = require('consign');

let app = express();

// Init dotenv file
dotenv.config()

consign()
    .include('configs')
    .then('controllers')
    .then('routes')
    .into(app)

app.listen(process.env.PORT, () => {
    console.info(`Aplicação inicializada - Porta: ${ process.env.PORT }`)
})