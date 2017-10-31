
module.exports = server => {
    const TrailCtrl = server.app.trails.controller;

    server
        .route('/trails')
        .get(TrailCtrl.findAll)
        .post(TrailCtrl.create);

    server
        .route('/trail/:id')
        .get(TrailCtrl.findOne)
        .put(TrailCtrl.update)
        .delete(TrailCtrl.remove)
}