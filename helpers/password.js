const bcrypt = require('bcrypt');

const encrypt = (password) => {
    const { SALT_ROUNDS } = process.env;

    return bcrypt.genSalt(SALT_ROUNDS * 1)
        .then( salt => {
            return bcrypt.hash(password || '', salt).then( encripted => {
                return encripted;
        })
        .catch( err => console.error(err) );
    });
}

const compare = (password, hash) => {
    return bcrypt.compare(password, hash);
}

// Funções disponíveis
exports.encrypt = encrypt;
exports.compare = compare;