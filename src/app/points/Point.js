const bluebird = require('bluebird');

module.exports = app => {
    const connection = app.connection;
    
    class PointModel {
        getAllByTrail(id) {
            return connection.query(`
                SELECT id, latitude, longitude, autitude, created_at, updated_at
                FROM trail_point
                WHERE trail_id = :id
            `, { id });
        }
        createPoints(trail_id, points) {
            return new bluebird.Promise( (resolve, reject) => {
                connection.beginTransaction( (err) => {
                    if(err) reject(err);
                    
                    let pointPromises = [];

                    for(let point of points) {
                        pointPromises.push(
                            connection.queryAsync(`
                                INSERT INTO trail_point (latitude, longitude, autitude, trail_id, dtin)
                                VALUES (:latitude, :longitude, :autitude, :trail_id, NOW())
                            `, Object.assign(point, { trail_id }))
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
        createInterestPoints(trail_id, interest_points) {
            return new bluebird.Promise( (resolve, reject) => {
                connection.beginTransaction( (err) => {
                    if(err) reject(err);

                    let pointPromises = [];
                    
                    for(let point of interest_points) {
                        pointPromises.push(
                            connection.queryAsync(`
                                INSERT INTO point_interest (latitude, longitude, trail_id, point_type_id, dtin)
                                VALUES (:latitude, :longitude, :trail_id, :point_type_id, NOW())
                            `, Object.assign(point, { trail_id }))
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