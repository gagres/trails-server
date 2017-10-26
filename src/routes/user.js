module.exports = app => {
    const UserCtrl = app.controllers.user;

    app.route('/users')
        .get(UserCtrl.findAll)
        .post(UserCtrl.create);
    
    app.route('/users/:id')
        .get(UserCtrl.find)
        .put(UserCtrl.update)
        .delete(UserCtrl.remove);

    app.post('/login', UserCtrl.login);
}