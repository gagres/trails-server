module.exports = server => {
    const PointModel = server.app.points.Point;

    class PointCtrl {
        createPoints(trailID, points) {
            return PointModel.createPoints(trailID, points);
        }
        createInterestPoints(trailID, interest_points) {
            return PointModel.createInterestPoints(trailID, interest_points);
        }
    }

    return new PointCtrl();
}