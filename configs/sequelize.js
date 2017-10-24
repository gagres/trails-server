const Sequelize = require('sequelize'),
      fs        = require('fs'),
      path      = require('path');

let connection;

module.exports = app => {
    if(!connection) {
        const { DB_NAME, DB_USER, DB_PASS, DB_PATH, DIALECT } = process.env;
        // Configuração inicial do Sequelize
        const database = new Sequelize(
            DB_NAME, 
            DB_USER, 
            DB_PASS, 
            {
                host: DB_PATH,
                dialect: DIALECT,
                pool: { max: 5, min: 0 }
            }
        );

        database.authenticate()
            .then(() => {
                console.info('Conexão estabelecida com sucesso!')
            })
            .catch((err) => {
                console.error(err)
            })

        connection = {
            database, // Guardo a conexão com a base de dados
            models: [] // Guardo os modelos de dados
        }

        /*
        Crio as conexões de forma síncrona para garantir que
        elas estão iniciadas antes das rotas e controllers
        */
        models = fs.readdirSync(path.resolve(__dirname, '../models/'));

        for(let model_name of models) {
            let real_name = model_name.replace('.js', '');
            connection.models[real_name] = database.import(path.resolve(__dirname, '../models/', model_name))
        }

    }

    // Passa os modelos para a aplicaçào
    app.models = connection.models;
}