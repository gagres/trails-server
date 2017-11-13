module.exports = server => {
    const UserModel  = server.models.user;
    const TrailMOdel = server.models.trail; 

    /**
     * @apiDefine DefaultSuccess
     * @apiSuccess {Number} count Quantidade de registros retornados
     * @apiSuccess {json[]} rows Registros retornados
     * @apiSuccessExample {json} Respose-Success
     *      HTTP/1.1 200 OK
     *      {
     *          count: 1,
     *          rows: []
     *      } 
     */
    class UserCtrl {
        /**
         * @api {get} /users Get All
         * @apiGroup User
         * @apiDescription Retorna todos os usuários cadastrados no sistema
         * @apiSuccess {Number} count Quantidade de registros retornados
         * @apiSuccess {json[]} rows Registros encontrados
         * @apiSuccessExample {json} Success-Response:
         *      HTTP/1.1 200 OK
         *      {
         *          count: 1,
         *          rows: [
         *              { userID: 1, realname: "Example", username: "example", age: 20, email: "example@example.com" }
         *          ]
         *      }
         */
        findAll(req, res) {
            UserModel
                .findAll()
                .then( ({ count, rows }) => {
                    res.json({ count, rows })
                })
                .catch( err => res.json(err) );
        }
        /**
         * @api {get} /user/:userID Get One
         * @apiGroup User
         * @apiDescription Retorna um usuário específico do sistema
         * @apiParam {Number} ID do usuário
         * @apiParamExample {String} Request-Example:
         *          http://localhost:3000/user/1
         * 
         * @apiSuccess {Number} count Quantidade de registros retornados
         * @apiSuccess {json[]} rows Registros encontrados
         * @apiSuccessExample Success-Response:
         *      HTTP/1.1 200 OK
         *      {
         *          count: 1,
         *          rows: [
         *              { 
         *                  userID: 1,
         *                  realname: "Example",
         *                  username: "example",
         *                  age: 20,
         *                  email: "example@example.com",
         *                  dtin: "2017-11-08T00:00:00.000Z",
         *                  dtstamp: "2017-11-08T10:05:26.423Z",
         *                  active: true,
         *                  description: '',
         *                  following: []
         *              }
         *          ]
         *      }
         */
        findOne(req, res) {
            const { userID } = req.params;

            UserModel
                .find(userID)
                .then( user => {
                    if(user.count) {
                        return UserModel
                            .findFollowFriends(userID)
                            .then( follows => {
                                user.rows[0].following = follows.rows;

                                res.json(user);
                            })
                    }
                    
                    res.json(user);
                })
                .catch( err => res.json(err) );
        }
        /**
         * @api {post} /users Create User
         * @apiGroup User
         * @apiDescription Cria um novo usuário no sistema
         * @apiParam {String} realname Nome do usuário
         * @apiParam {String} passwd Senha do usuário
         * @apiParam {String} username Apelido do usuário
         * @apiParam {Number} age Idade do usuário
         * @apiParam {String} email E-mail do usuário
         * @apiParamExample {String} Request-Example:
         *          http://localhost:3000/users?realname=Example&passwd=example&username=example&age=20&email=example@example.com
         * 
         * @apiUse DefaultSuccess
         * @apiSuccessExample {json} Respose-Success
         *      HTTP/1.1 200 OK
         *      {
         *          count: 1,
         *          rows: []
         *      } 
         */
        create(req, res) {
            const { realname, username, passwd, age, email } = req.query;

            UserModel
                .create({ realname, username, passwd, age, email})
                .then( completed => res.json(completed) )
                .catch( err => res.json(err) );
        }
        /**
         * @api {put} /user/:userID Update User
         * @apiGroup User
         * @apiDescription Atualiza um usuário do sistema
         * @apiParam {Number} ID do usuário desejado
         * @apiParam {String} realname Nome do usuário
         * @apiParam {String} passwd Senha do usuário
         * @apiParam {String} username Apelido do usuário
         * @apiParam {Number} age Idade do usuário
         * @apiParam {String} email E-mail do usuário
         * @apiParamExample {String} Request-Example:
         *          http://localhost:3000/user/1?realname=Example&passwd=example&username=example&age=20&email=example@example.com
         * 
         * 
         * @apiUse DefaultSuccess
         * @apiSuccessExample {json} Respose-Success
         *      HTTP/1.1 200 OK
         *      {
         *          count: 1,
         *          rows: []
         *      } 
         */
        update(req, res) {
            const { userID } = req.params,
                  { realname, username, passwd, age, email } = req.query;

            UserModel
                .update(userID, { realname, username, passwd, age, email })
                .then( completed => res.json(completed) )
                .catch( err => res.json(err) );
        }
        /**
         * @api {put} /user/:userID/ativar Active User
         * @apiGroup User
         * @apiDescription Altera o estado do usuário para "Ativo"
         * @apiParam {Number} userID ID do usuário
         * @apiParamExample {String}
         *      http://localhost:3000/user/1/ativar
         * 
         * @apiUse DefaultSuccess
         * @apiSuccessExample {json} Respose-Success
         *      HTTP/1.1 200 OK
         *      {
         *          count: 1,
         *          rows: []
         *      } 
         */
        ativarUsuario(req, res) {
            const { userID } = req.params;

            UserModel
                .mudarStatusUsuario(userID, 1)
                .then( succeed => res.json(succeed) )
                .catch( err => res.json(err) );
        }
        /**
         * @api {put} /user/:userID/inativar Inactive User
         * @apiGroup User
         * @apiDescription Altera o estado do usuário para "Inativo"
         * @apiParam {Number} userID ID do usuário
         * @apiParamExample {String}
         *      http://localhost:3000/user/1/inativar
         * 
         * @apiUse DefaultSuccess
         * @apiSuccessExample {json} Respose-Success
         *      HTTP/1.1 200 OK
         *      {
         *          count: 1,
         *          rows: []
         *      } 
         */
        inativarUsuario(req, res) {
            const { userID } = req.params;

            UserModel
                .mudarStatusUsuario(userID, 0)
                .then( succeed => res.json(succeed) )
                .catch( err => res.json(err) );
        }
        /**
         * @api {delete} /user/:userID Remove User
         * @apiGroup User
         * @apiDescription Remove o usuário do sistema
         * @apiParam {Number} userID ID do usuário
         * @apiParamExample {String}
         *      http://localhost:3000/user/1
         * 
         * @apiUse DefaultSuccess
         * @apiSuccessExample {json} Respose-Success
         *      HTTP/1.1 200 OK
         *      {
         *          count: 1,
         *          rows: []
         *      } 
         */
        remove(req, res) {
            const { userID } = req.params,
                  { passwd } = req.query;

            UserModel
                .remove(userID, passwd)
                .then( succeed => res.json(succeed) )
                .catch( err => res.json(err) );
        }
        /**
         * @api {post} /login Login
         * @apiGroup Sistema
         * @apiDescription Realiza login no sistema
         * @apiParam {String} email E-mail do usuário
         * @apiParam {String} passwd Senha do usuário
         * @apiParamExample {json} Request-Params
         *      body: { email: example@example.com, passwd: example }
         * 
         * @apiSuccess {Number} count Quantidade de registros retornados
         * @apiSuccess {json[]} rows Registros retornados
         * @apiSuccessExample {json} Respose-Success
         *      HTTP/1.1 200 OK
         *      {
         *          count: 1,
         *          rows: [{ data: "OK" }]
         *      } 
         */
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
        /**
         * @api {post} /user/:priUserID/follow Follow User
         * @apiGroup User
         * @apiDescription Segue outro usuário no sistema
         * @apiParam {Number} priUserID ID do usuário a ser seguido
         * @apiParam {Number} userID ID do usuário que executa a ação
         * @apiParamExample {json} Request-Params
         *      http://localhost:3000/user/2/follow?userID=1
         * 
         * @apiUse DefaultSuccess
         * @apiSuccessExample {json} Respose-Success
         *      HTTP/1.1 200 OK
         *      {
         *          count: 1,
         *          rows: []
         *      } 
         */
        followOtherUser(req, res) {
            const { priUserID } = req.params,
                  { userID }    = req.query;

            UserModel
                .followOtherUser(userID, priUserID)
                .then( succeed => res.json(succeed) )
                .catch( err => res.json(err) );
        }

    }

    return new UserCtrl();
}