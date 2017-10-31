module.exports = server => {
    const PointModel = server.app.points.Point;

    class PointCtrl {
        createPoints(id_trail, points) {
            return PointModel.createPoints(id_trail, points);
        }
        createInterestPoints(id_trail, interest_points) {
            return PointModel.createInterestPoints(id_trail, interest_points);
        }
    }

    return new PointCtrl();
}