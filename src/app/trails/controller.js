const bluebird = require('bluebird');

module.exports = server => {
    const TrailModel = server.app.trails.Trail,
          PointCtrl  = server.app.points.controller;
    
    class TrailCtrl {
        findAll(req, res) {
            const queryParams = req.query

            TrailModel
                .getAll(queryParams)
                .then( trails => res.json(trails) )
                .catch( err => res.status(500).json(err) );
        }
        findOne(req, res) {
            const { id } = req.params;

            TrailModel
                .getOne(id)
                .then( trail => res.json(trail) )
                .catch( err => res.status(500).json(err) );
        }
        create(req, res) {
            const { trailname, traildist, trailtime, trailrat, traildescr, user_id } = req.query,
                  { trail_points, interest_points } = req.body;

            TrailModel
                .create({ trailname, traildist, trailtime, trailrat, traildescr, user_id })
                .then( trail => {
                    if(trail.message)
                        return trail;
                    
                    return bluebird.all(
                        PointCtrl.createPoints(trail.data, trail_points),
                        PointCtrl.createInterestPoints(trail.data, interest_points)
                    );
                })
                .then( succeed => res.status(201).json(succeed) )
                .catch( err => res.status(500).json(err) );
        }
        update(req, res) {
            const { id } = req.params;

            TrailModel
                .update(id, req.body)
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