module.exports = server => {
    const UserCtrl = server.app.users.controller;

    server.route('/users')
        .get(UserCtrl.findAll)
        .post(UserCtrl.create);
    
    server.route('/user/:id')
        .get(UserCtrl.findOne)
        .put(UserCtrl.update)
        .delete(UserCtrl.remove);

    server.get('/user/:id/ativar', UserCtrl.ativarUsuario);
    server.get('/user/:id/inativar', UserCtrl.inativarUsuario);

    server.post('/login', UserCtrl.login);
}