
module.exports = server => {
    const TrailCtrl = server.controllers.trail;

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