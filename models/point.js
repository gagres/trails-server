const { TYPES } = require('tedious'),
      bluebird  = require('bluebird');

module.exports = server => {
    const connection    = server.connection,
          RequestHelper = server.helpers.request;

    class PointModel {
        getPointsOfTrail(trailID) {
            const sql = `
                SELECT pointID, latitude, longitude 
                FROM PointOfTrail
                WHERE trailID = @trailID`;

            const request = connection.Request(sql)
                                .addParam('trailID', TYPES.Int, trailID);
            
            return RequestHelper
                    .requestToPromise(request)
                    .then( points => {
                        return { 'trail_points': points.rows }
                    })
        }
        getPointsOfInterest(trailID) {
            const sql = `
                SELECT PointOfInterest.poilID, 
                       PointOfInterest.latitude, 
                       PointOfInterest.longitude,
                       PointType.type,
                       PointType.description
                FROM PointOfInterest
                INNER JOIN PointType ON PointType.pointTypeID = PointOfInterest.poilID
                WHERE trailID = @trailID`;

            const request = connection.Request(sql)
                                .addParam('trailID', TYPES.Int, trailID);
            
            return RequestHelper
                    .requestToPromise(request)
                    .then( points => {
                        return { 'interest_points': points.rows }
                    })
        }
        createPoints(trailID, points) {
            const sql = `
                INSERT INTO PointOfTrail (latitude, longitude, trailID, dtstamp)
                VALUES (@latitude, @longitude, @trailID, CURRENT_TIMESTAMP)`;

            let pointPromises = [];

            for(let point of points) {

                const request = connection.Request(sql)
                                    .addParam('latitude', TYPES.Float, point.latitude)
                                    .addParam('longitude', TYPES.Float, point.longitude)
                                    .addParam('trailID', TYPES.Int, trailID);

                pointPromises.push(RequestHelper.requestToPromise(request));
            }

            return bluebird.all(pointPromises);
        }
        createInterestPoints(trailID, interest_points) {
            const sql = `
                INSERT INTO PointOfInterest (latitude, longitude, pointTypeID, trailID, dtstamp)
                VALUES (@latitude, @longitude, @pointTypeID, @trailID, CURRENT_TIMESTAMP)`;

            let pointPromises = [];

            for(let point of interest_points) {

                const request = connection.Request(sql)
                                    .addParam('latitude', TYPES.Float, point.latitude)
                                    .addParam('longitude', TYPES.Float, point.longitude)
                                    .addParam('pointTypeID', TYPES.Int, point.pointTypeID)
                                    .addParam('trailID', TYPES.Int, trailID);

                pointPromises.push(RequestHelper.requestToPromise(request));
            }

            return bluebird.all(pointPromises);
        }
    }

    return new PointModel();
}