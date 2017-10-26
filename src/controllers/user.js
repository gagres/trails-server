
module.exports = app => {

    const UserModel = app.models.User;

    class UserCtrl {
        findAll(req, res) {
            UserModel
                .findAll()
                .then( rows => res.json(rows))
                .catch( err => res.status(500).json(err) );
        }
        find(req, res) {
            const { id } = req.params;

            UserModel
                .find(id)
                .then( user => res.json(user) )
                .catch( err => res.status(500).json(err) );
        }
        create(req, res) {
            UserModel
                .create(req.body)
                .then( user => res.sendStatus(201) )
                .catch( err => res.status(500).json('Alguma coisa deu errado!') );
        }
        update(req, res) {
            const { id } = req.params;

            UserModel
                .update(id, req.body)
                .then( user => res.json(user))
                .catch( err => res.status(500).json(err) );
        }
        remove(req, res) {
            const { id } = req.params;
            
            UserModel
                .remove(id)
                .then( user => res.json(user) )
                .catch( err => res.status(500).json(err) );
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