const mysql = require('mysql'),
      bluebird = require('bluebird');

module.exports = app => {
    const { DB_NAME, DB_USER, DB_PASS, DB_PATH, DIALECT } = process.env;
    
    const connection = mysql.createConnection({
        host:     DB_PATH,
        user:     DB_USER,
        password: DB_PASS,
        database: DB_NAME
    });

    // Essa função serve para permitir utilizar :<key> como escape de variáveis
    connection.config.queryFormat = function (query, values) {
        if (!values) return query;
        return query.replace(/\:(\w+)/g, function (txt, key) {
            if (values.hasOwnProperty(key)) {
            return this.escape(values[key]);
            }
            return txt;
        }.bind(this));
    };

    app.connection = bluebird.promisifyAll(connection);

    app.connection.queryAsync('SELECT 1 + 1 as Solution')
        .then( res  => console.log('Database conectado com sucesso') )
        .catch( err => console.error('A conexào com o banco não pode ser estabelecida') );
}