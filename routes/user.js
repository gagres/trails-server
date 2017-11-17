module.exports = server => {
    const UserCtrl = server.controllers.user;

    server.route('/users')
        .get(UserCtrl.findAll)
        .post(UserCtrl.create);
    
    server.route('/user/:userID')
        .get(UserCtrl.findOne)
        .put(UserCtrl.update);
        // .delete(UserCtrl.remove);

    server.put('/user/:userID/ativar', UserCtrl.ativarUsuario);
    server.put('/user/:userID/inativar', UserCtrl.inativarUsuario);

    server.post('/user/:userID/follow/:priUserID', UserCtrl.followOtherUser);
    server.post('/user/:userID/unfollow/:priUserID', UserCtrl.unfollowOtherUser);

    server.post('/login', UserCtrl.login);
}