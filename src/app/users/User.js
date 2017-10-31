const bluebird = require('bluebird');

module.exports = app => {
    const connection = app.connection,
          password   = app.helpers.password;
    
    class UserModel {
        constructor() {
            bluebird.promisify(this.encryptUserPasswd); // Transforma a função em uma promisse
        }
        findAll() {
            return connection.queryAsync('SELECT id, name, username, age FROM user');
        }
        find(id) {
            return connection.queryAsync(
                `SELECT id, name, username, email, age, dtin, dtstamp
                FROM user
                WHERE id = :id`,
                { id }
            )
        }
        create(user) {
            return this.encryptUserPasswd(user.passwd)
                .then( hash => {
                    if(hash !== null)
                        user.passwd = hash;

                    return connection.query(
                        `INSERT INTO user (name, username, age, passwd, email, dtin) VALUES (:name, :username, :age, :passwd, :email, NOW())`
                        , user
                    )
                })
                .catch( err => console.error(err) );
            
        }
        update(id, user) {
            return this.encryptUserPasswd(user.passwd)
                .then( hash => {
                    if(user.passwd !== undefined)
                        user.passwd = hash;

                    return connection.queryAsync(
                        `UPDATE user
                        SET name = :name,
                            age = :age,
                            ${ user.passwd ? 'passwd = :passwd,' : '' }
                            email = :email,
                            dtstamp = NOW()
                        WHERE id = :id`
                        , Object.assign(user, { id })
                    )
                })
        }
        remove(id, passwd) {
            return connection
                .queryAsync(`SELECT passwd FROM user WHERE id = :id`, { id })
                .then((user) => {

                    let message = ''; // Mensagem de retorno se algo der errado

                    if(user.length > 0) {
                        if(this.verifyUserPasswd(passwd, user[0].passwd)) {
                            return connection.queryAsync(`
                                DELETE FROM user WHERE id = :id
                            `, { id })
                        } else {
                            message = 'Senha inválida'
                        }
                    } else {
                        message = 'O usuário não foi encontrado';
                    }

                    return new bluebird.Promise( (resolve, reject) => {
                        resolve({ message })
                    })
                })
        }
        login(email) {
            return connection.queryAsync(`
                SELECT passwd FROM user WHERE email = :email`
                , { email }
            );
        }
        mudarStatusUsuario(id, status) {
            return connection.queryAsync(`
                UPDATE user SET active = :status WHERE id = :id
            `, { status, id });
        }
        encryptUserPasswd(passwd) {
            return password.encrypt(passwd)
        }
        verifyUserPasswd(passwd, hash) {
            return password.compare(passwd, hash);
        }
    }

    return new UserModel();
}