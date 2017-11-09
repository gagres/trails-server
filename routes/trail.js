
module.exports = server => {
    const TrailCtrl = server.controllers.trail;

    server
        .route('/trails')
        .get(TrailCtrl.findAll)
        .post(TrailCtrl.create);

    server
        .route('/trail/:trailID')
        .get(TrailCtrl.findOne)
        .put(TrailCtrl.update)
        .delete(TrailCtrl.remove)
}