const bluebird     = require('bluebird'),
      { password } = require('./../helpers');
      

module.exports = app => {
    const connection = app.connection;
    
    class UserModel {
        constructor() {
            bluebird.promisify(this.encryptUserPasswd); // Transforma a função em uma promisse
        }
        findAll() {
            return connection.queryAsync('SELECT id, name, age FROM user');
        }
        find(id) {
            return connection.queryAsync(
                `SELECT id, name, email, age, created_at, updated_at
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
                    
                    console.log(user);

                    return connection.query(
                        `INSERT INTO user (name, age, passwd, email, created_at) VALUES (:name, :age, :passwd, :email, NOW())`
                        , user
                    )
                })
                .catch( err => console.error(err) );
            
        }
        update(user) {
            return this.encryptUserPasswd(user.passwd)
                .then( hash => {
                    if(hash !== null)
                        user.passwd = hash;

                    return connection.queryAsync(
                        `UPDATE user
                        SET name = :name,
                            age = :age,
                            passwd = :passwd,
                            email = :email,
                            updated_at = NOW()
                        WHERE id = :id`
                        , Object.assign({}, ...user)
                    )
                })
        }
        remove(id) {
            return connection.queryAsync(
                `DELETE FROM user WHERE id = :id`
                , { id }
            )
        }
        encryptUserPasswd(passwd) {
            return password.encrypt(passwd)
        }
        verifyUserPasswd(passwd, hash) {
            return password.compare(passwd, hash);
        }
        login(email) {
            return connection.queryAsync(`
                SELECT passwd FROM user WHERE email = :email`
                , { email }
            );
        }
    }

    return new UserModel();
}