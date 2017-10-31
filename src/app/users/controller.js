module.exports = server => {

    const UserModel = server.app.users.User;

    class UserCtrl {
        findAll(req, res) {
            UserModel
                .findAll()
                .then( rows => res.json(rows))
                .catch( err => res.status(500).json(err) );
        }
        findOne(req, res) {
            const { id } = req.params;

            UserModel
                .find(id)
                .then( user => res.json(user) )
                .catch( err => res.status(500).json(err) );
        }
        create(req, res) {
            const { name, username, passwd, age, email } = req.query;

            UserModel
                .create({ name, username, passwd, age, email})
                .then( user => res.sendStatus(201) )
                .catch( err => res.status(500).json('Alguma coisa deu errado') );
        }
        update(req, res) {
            const { id } = req.params,
                  { name, username, passwd, age, email } = req.query;

            UserModel
                .update(id, { name, username, passwd, age, email })
                .then( user => res.json(user))
                .catch( err => res.status(500).json(err) );
        }
        ativarUsuario(req, res) {
            const { id } = req.params;

            UserModel
                .mudarStatusUsuario(id, true)
                .then( succeed => res.json({"data": "Usuário ativado com sucesso"}))
                .catch( err => res.status(500).json(err) );
        }
        inativarUsuario(req, res) {
            const { id } = req.params;

            UserModel
                .mudarStatusUsuario(id, false)
                .then( succeed => res.json({"data": "Usuário inativado com sucesso"}))
                .catch( err => res.status(500).json(err) );
        }
        remove(req, res) {
            const { id } = req.params,
                  { passwd } = req.query;

            UserModel
                .remove(id, passwd)
                .then( user => {
                    res.json(user)
                })
                .catch( err => {
                    res.status(500).json(err)
                });
        }
        login(req, res) {
            const { email, passwd } = req.body;
            
            UserModel
                .login(email)
                .then(user => {
                    if (user.length) 
                    {
                        const hash = user[0].passwd;
                        
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
                    res.status(500).json({"error": "Erro interno do servidor"})
                });

        }

    }

    return new UserCtrl();
}