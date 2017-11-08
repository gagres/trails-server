const bluebird  = require('bluebird'),
      { TYPES } = require('tedious');

module.exports = server => {
    const connection     = server.connection,
          PasswordHelper = server.helpers.password;
          RequestHelper  = server.helpers.request;
    
    class UserModel {
        constructor() {
            this.connection = server.connection; // Conexão com a base de dados
            bluebird.promisify(this.encryptUserPasswd); // Transforma a função em uma promisse
        }
        findAll() {
            const sql = `
                SELECT userID, realname, username, age, email
                FROM TrailUser`;

            return RequestHelper.requestToPromise(this.connection.Request(sql));
        }
        find(id) {
            const sql = `
                SELECT userID, realname, username, age, email, dtin, dtstamp, active, decription
                FROM TrailUser
                WHERE userID = @userID`;

            const request = this.connection.Request(sql)
                                .addParam('userID', TYPES.Int, id);

            return RequestHelper.requestToPromise(request);
        }
        create(user) {
            return this.encryptUserPasswd(user.passwd)
                .then( hash => {
                    if(hash !== null)
                        user.passwd = hash;

                    const sql = `
                        INSERT INTO TrailUser (realname, username, age, passwd, email, dtin, dtstamp, decription) 
                        VALUES (@realname, @username, @age, @passwd, @email, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '')`;

                    const request = this.connection.Request(sql)
                                        .addParam('realname', TYPES.VarChar, user.realname)
                                        .addParam('username', TYPES.VarChar, user.username)
                                        .addParam('age', TYPES.Int, user.age)
                                        .addParam('passwd', TYPES.VarChar, user.passwd)
                                        .addParam('email', TYPES.VarChar, user.email);
                    
                    return RequestHelper.requestToPromise(request);
                });
            
        }
        update(id, user) {
            return this.encryptUserPasswd(user.passwd)
                .then( hash => {
                    
                    const sql = `
                        UPDATE TrailUser
                        SET realname = @realname,
                            username = @username,
                            age = @age,
                            ${ user.passwd ? 'passwd = @passwd,' : '' }
                            email = @email,
                            dtstamp = CURRENT_TIMESTAMP
                        WHERE userID = @userID`;

                    let request = this.connection.Request(sql)
                                        .addParam('realname', TYPES.VarChar, user.realname)
                                        .addParam('username', TYPES.VarChar, user.username)
                                        .addParam('age', TYPES.Int, user.age)
                                        .addParam('email', TYPES.VarChar, user.email)
                                        .addParam('userID', TYPES.Int, id);
                    
                    if(user.passwd !== undefined) {
                        user.passwd = hash;
                        request.addParam('passwd', TYPES.VarChar, user.passwd);
                    }

                    return RequestHelper.requestToPromise(request);
                })
        }
        remove(id, passwd) {
            const sql = `SELECT passwd FROM TrailUser WHERE userID = @userID`;

            const request = this.connection.Request(sql)
                                .addParam('userID', TYPES.Int, id);

            return RequestHelper.requestToPromise(request);
        }
        login(email) {
            const sql = `SELECT passwd FROM TrailUser WHERE email = @email`;

            const request = this.connection.Request(sql)
                                .addParam('email', TYPES.VarChar, email);

            return RequestHelper.requestToPromise(request);
        }
        mudarStatusUsuario(id, status) {
            const sql = `UPDATE TrailUser SET active = @active WHERE userID = @userID`;
            
            const request = this.connection.Request(sql)
                                .addParam('active', TYPES.Bit, status)
                                .addParam('userID', TYPES.Int, id);
            
            return RequestHelper.requestToPromise(request);
        }
        encryptUserPasswd(passwd) {
            return PasswordHelper.encrypt(passwd)
        }
        verifyUserPasswd(passwd, hash) {
            return PasswordHelper.compare(passwd, hash);
        }
    }

    return new UserModel();
}