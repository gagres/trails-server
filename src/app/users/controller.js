module.exports = server => {

    const UserModel = server.app.users.User;

    class UserCtrl {
        findAll(req, res) {
            UserModel
                .findAll()
                .then( ({ count, rows }) => {
                    res.json({ count, rows })
                })
                .catch( err => res.json(err) );
        }
        findOne(req, res) {
            const { userID } = req.params;

            UserModel
                .find(userID)
                .then( user => res.json(user) )
                .catch( err => res.json(err) );
        }
        create(req, res) {
            const { realname, username, passwd, age, email } = req.query;

            UserModel
                .create({ realname, username, passwd, age, email})
                .then( completed => res.json(completed) )
                .catch( err => res.json(err) );
        }
        update(req, res) {
            const { userID } = req.params,
                  { realname, username, passwd, age, email } = req.query;

            UserModel
                .update(userID, { realname, username, passwd, age, email })
                .then( completed => res.json(completed) )
                .catch( err => res.json(err) );
        }
        ativarUsuario(req, res) {
            const { userID } = req.params;

            UserModel
                .mudarStatusUsuario(userID, 1)
                .then( succeed => res.json(data) )
                .catch( err => res.json(err) );
        }
        inativarUsuario(req, res) {
            const { userID } = req.params;

            UserModel
                .mudarStatusUsuario(userID, 0)
                .then( succeed => res.json(succeed) )
                .catch( err => res.json(err) );
        }
        remove(req, res) {
            const { userID } = req.params,
                  { passwd } = req.query;

            UserModel
                .remove(userID, passwd)
                .then( succeed => res.json(succeed) )
                .catch( err => res.json(err) );
        }
        login(req, res) {
            const { email, passwd } = req.body;
            
            UserModel
                .login(email)
                .then( ({ count, rows }) => {
                    if (rows.length) {
                        const hash = rows[0].passwd;
                        
                        UserModel.verifyUserPasswd(passwd, hash)
                            .then( isEquals => {
                                if(isEquals)
                                    return res.json({"data": "OK"});

                                return res.json({"message": "Senha inválida"});
                            });
                    } else
                        return res.json({ "message": "E-mail não encontrado" });

                })
                .catch(err => {
                    console.log(err);
                    res.json(err)
                });

        }

    }

    return new UserCtrl();
}