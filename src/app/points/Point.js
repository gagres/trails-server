const bluebird = require('bluebird');

module.exports = app => {
    const connection = app.connection;
    
    class PointModel {
        getAllByTrail(id) {
            return connection.query(`
                SELECT pointID, latitude, longitude, dtstamp
                FROM PointOfTrail
                WHERE trailID = :id
            `, { id });
        }
        createPoints(trailID, points) {
            return new bluebird.Promise( (resolve, reject) => {
                connection.beginTransaction( (err) => {
                    if(err) reject(err);
                    
                    let pointPromises = [];

                    for(let point of points) {
                        pointPromises.push(
                            connection.queryAsync(`
                                INSERT INTO PointOfTrail (latitude, longitude, trailID, dtstamp)
                                VALUES (:latitude, :longitude, :autitude, :trailID, NOW())
                            `, Object.assign(point, { trailID }))
                        )
                    }
    
                    return bluebird
                        .all(pointPromises)
                        .then( succeed => {
                            connection.commit( () => {
                                resolve({ data: "Pontos da trilha cadastrados com sucesso" });
                            });
                        })
                        .catch( err => {
                            connection.rollback( () => {
                                reject(new Error("Não foi possível cadastrar os pontos da trilha"));
                            })
                        })
                })
            })
        }
        createInterestPoints(trailID, interest_points) {
            return new bluebird.Promise( (resolve, reject) => {
                connection.beginTransaction( (err) => {
                    if(err) reject(err);

                    let pointPromises = [];
                    
                    for(let point of interest_points) {
                        pointPromises.push(
                            connection.queryAsync(`
                                INSERT INTO point_interest (latitude, longitude, trailID, pointTypeID, dtstamp)
                                VALUES (:latitude, :longitude, :trailID, :pointTypeID, NOW())
                            `, Object.assign(point, { trailID }))
                        )
                    }
    
                    return bluebird
                        .all(pointPromises)
                        .then( succeed => {
                            connection.commit( () => {
                                resolve({ data: "Pontos de interesse cadastrados com sucesso" });
                            });
                        })
                        .catch( err => {
                            connection.rollback( () => {
                                reject(new Error("Não foi possível cadastrar os pontos de interesse"));
                            })
                        })
                })
            })
        }
    }

    return new PointModel();
}