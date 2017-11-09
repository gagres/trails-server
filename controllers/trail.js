const bluebird   = require('bluebird');

module.exports = server => {
    const PointModel  = server.models.point,
          TrailModel = server.models.trail;
    
    class TrailCtrl {
        findAll(req, res) {
            TrailModel
                .getAll()
                .then( trails => res.json(trails) )
                .catch( err => res.json(err) );
        }
        findOne(req, res) {
            const { id } = req.params;

            TrailModel
                .getOne(id)
                .then(trail => {
                    if(trail.count) {
                        PointModel.getPointsOfTrail(trail.rows[0].trailID)
                            .then( points => {
                                Object.keys(points).forEach( key => {
                                    trail.rows[0][key] = points[key];
                                })
                                
                                return PointModel.getPointsOfInterest(trail.rows[0].trailID)
                            })
                            .then( points => {
                                Object.keys(points).forEach( key => {
                                    trail.rows[0][key] = points[key];
                                })
                                res.json(trail);
                            })
                    }
                })
                .catch( err => res.json(err) );
        }
        create(req, res) {
            const { trailname, traildist, trailtime, trailrat, traildescr, userID } = req.query,
                  { trail_points, interest_points } = req.body;

            TrailModel
                .create({ trailname, traildist, trailtime, trailrat, traildescr, userID })
                .then( trail => {
                    if(trail.rows && trail.rows.length) {
                        return PointModel
                            .createPoints(trail.rows[0].trailID, trail_points)
                            .then(succeed => {
                                if(succeed[0].count) {
                                    return PointModel.createInterestPoints(trail.rows[0].trailID, interest_points)
                                }
                            })
                    }
                    
                    return { message: "Não foi possível cadastrar a trilha desejada", count: 0 };
                })
                .then( result => {
                    if(result.message) 
                        return res.json(result);

                    res.json({ data: "Trilha cadastrada com sucesso!", count: 1 });
                })
                .catch( err => {
                    console.log(err);
                    res.json(err)
                });
        }
        update(req, res) {
            const { id } = req.params,
                  { trailname, trailrat, traildescr } = req.query;

            TrailModel
                .update(id, { trailname, trailrat, traildescr })
                .then( succeed => res.json(succeed) )
                .catch( err => res.status(500).json(err) );
        }
        remove(req, res) {
            const { id } = req.params;

            TrailModel
                .remove(id)
                .then( succeed => res.json(succeed) )
                .catch( err => res.status(500).json(err) );
        }
        
    }

    return new TrailCtrl();
}