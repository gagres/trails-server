const bluebird = require('bluebird')

const requestToPromise = (request) => {
    return new bluebird.Promise( (resolve, reject) => {
        request
            .onComplate((count, rows) => {
                resolve({count, rows});
            })
            .onError((err) => {
                reject(err);
            })
            .Run();
    })
}

// Exports of the module
exports.requestToPromise = requestToPromise;