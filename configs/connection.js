const Tedious = require('tedious'),
      Promise = require('bluebird');

module.exports = app => {
    const { DB_NAME, DB_USER, DB_PASS, DB_PATH } = process.env;
    
    const config = {
        userName: DB_USER,
        password: DB_PASS,
        server: DB_PATH,
        options: {
            database: DB_NAME,
            encrypt: true
        }
    }

    // Abre a conexão com o DB apenas uma vez
    let connection = new Tedious.Connection(config); 
    Promise
        .promisify(connection.on.bind(connection))("connect")
        .then(() => {
            console.log("Conectado ao banco de dados");
        })
        .catch((err) => {
            throw 'Não foi possível estabelecer a conexão com o Banco de Dados'
        })


    class Connection {
        Request(sql) {
            let currentRequest = this;
            currentRequest.sql = sql;
            currentRequest.params = [];
            currentRequest.result = [];

            currentRequest.errorHandler;
            currentRequest.onComplateHandler;

            currentRequest.addParam = (key, type, value) => {
                currentRequest.params.push({ key, type, value });
                return currentRequest;
            }

            currentRequest.Run = () => {
                let request = new Tedious.Request(currentRequest.sql, (err, rowCount, rows) => {
                    if(err) 
                        return currentRequest.errorHandler(err);

                    currentRequest.onComplateHandler(rowCount, currentRequest.result);
                });

                request.on("row", (columns) => {
                    let items = {}
                    columns.forEach(function (column) { 
                        items[column.metadata.colName] = column.value; 
                    });
                    currentRequest.result.push(items); 
                });

                for (var i in currentRequest.params) { 
                    var item = currentRequest.params[i]; 
                    request.addParameter(item.key, item.type, item.value); 
                } 
    
                connection.execSql(request); // Objeto externo
                return currentRequest; 
            }

            currentRequest.onComplate = (callback) => {
                currentRequest.onComplateHandler = callback;
                return currentRequest;
            }

            currentRequest.onError = (callback) => {
                currentRequest.errorHandler = callback;
                return currentRequest;
            }

            return currentRequest;
        }
    }

    app.connection = new Connection(); // Retorna uma classe com a conexão com o banco de dados
}