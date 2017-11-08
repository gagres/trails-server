module.exports = server => {
    const UserCtrl = server.app.users.controller;

    server.route('/users')
        .get(UserCtrl.findAll)
        .post(UserCtrl.create);
    
    server.route('/user/:userID')
        .get(UserCtrl.findOne)
        .put(UserCtrl.update)
        .delete(UserCtrl.remove);

    server.get('/user/:userID/ativar', UserCtrl.ativarUsuario);
    server.get('/user/:userID/inativar', UserCtrl.inativarUsuario);

    server.post('/login', UserCtrl.login);
}