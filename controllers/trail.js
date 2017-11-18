const bluebird   = require('bluebird');

module.exports = server => {
    const PointModel         = server.models.point,
          TrailModel         = server.models.trail,
          TrailActivityModel = server.models.trailActivity;

    /**
     * @apiDefine DefaultSuccess
     * @apiSuccess {Number} count Quantidade de registros retornados
     * @apiSuccess {json[]} rows Registros retornados
     */
    class TrailCtrl {
        /**
         * @api {get} /trails Get All
         * @apiGroup Trail
         * @apiDescription Retorna todas as trilhas cadastradas no sistema
         * @apiUse DefaultSuccess
         * @apiSuccessExample {json} Response-Success
         *      HTTP/1.1 200 OK
         *      {
         *          count: 1,
         *          rows: [{ trailID: 1, trailname: "Trilha de exemplo", "traildist": 1.27, "trailtime": "1970-01-01T00:15:00.000Z", "trailrat": 5}]
         *      }
         */
        findAll(req, res) {
            TrailModel
                .getAll()
                .then( trails => res.json(trails) )
                .catch( err => res.json(err) );
        }
        /**
         * @api {get} /trail/:trailID Get One
         * @apiGroup Trail
         * @apiDescription Retorna a trilha selecionada, seus pontos normais e de interesse
         * @apiParam {Number} trailID ID da trilha
         * @apiParamExample {json} Request-Params
         *      http://localhost:3000/trail/1
         * 
         * @apiUse DefaultSuccess
         * @apiSuccessExample {json} Response-Success
         *      HTTP/1.1 200 OK
         *      {
         *          count: 1,
         *          rows: [
         *              {
         *                  trailID: 1,
         *                  trailname: "Trilha de exemplo",
         *                  traildist: 1.27,
         *                  trailtime: "1970-01-01T00:15:00.000Z",
         *                  trailrat: 5,
         *                  traildescr: "",
         *                  mainlat: 0,
         *                  mainlong: 0,
         *                  user: "Example",
         *                  dtin: "2017-11-09T00:00:00.000Z",
         *                  dtstamp: "2017-11-09T01:21:28.330Z",
         *                  "trail_points": [
         *                      { pointID: 1, latitude: 34.093888, longitude: -118.3640725 }
         *                  ],
         *                  "interest_points": [
         *                      { pointID: 1, latitude: 34.093888, longitude: -118.3640725, type: "Tipo 01", description: "" }
         *                  ],
         *                  activity: []
         *              }
         *          ]
         *      }
         */
        findOne(req, res) {
            const { trailID } = req.params;

            TrailModel
                .getOne(trailID)
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
                                
                                return TrailActivityModel.getTrailActivityByTrail(trailID);
                            })
                            .then( activity => {
                                trail.rows[0].activity = activity.rows;
                                
                                res.json(trail);
                            })
                    } else
                        res.json({ count: 0, rows: [] })
                })
                .catch( err => res.json(err) );
        }
        /**
         * @api {post} /trails Create
         * @apiGroup Trail
         * @apiDescription Cria uma nova trilha junto de seus pontos e pontos de interesse
         * @apiParam {String} trailname Nome da trilha
         * @apiParam {Number} traildist Distância total da trilha
         * @apiParam {String} trailtime Duração da trilha
         * @apiParam {String} traildescr Descrição da trilha
         * @apiParam {Number} trailrat Avaliação da trilha
         * @apiParam {Number} userID Quem está criando a trilha
         * @apiParam {json[]} trail_points Pontos da trilha
         * @apiParam {json[]} interest_points Pontos de interesse da trilha
         * @apiParamExample {json} Request-Params
         *      http://localhost:3000/trails?trailname=Trilha de exemplo&traildist=1.27&trailtime=00:15:00&trailrat=5&traildescr=&userID=1
         *      body: {
         *          trail_points: [
         *              { latitude: 0.0000000, longitude: 0.00000000 }
         *          ], 
         *          interest_points: [
         *              { latitude: 0.0000000, longitude: 0.00000000, typeOfPoint: 1 }
         *          ] 
         *      }
         * 
         * @apiUse DefaultSuccess
         * @apiSuccessExample {json} Response-Success
         *      HTTP/1.1 200 OK
         *      {
         *          count: 1,
         *          rows: []
         *      }
         */
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
                                                .catch( err => {
                                                    throw { err, message: 'Erro ao criar os pontos de interesse' }
                                                });
                                }
                            })
                            .then(succeed => {
                                if(succeed[0].count) {
                                    const trailID = trail.rows[0].trailID;
                                    return TrailActivityModel.create({ userID, trailID, trailrat, trailtime })
                                                .catch( err => {
                                                    throw { err, message: 'Erro na criação da atividade da trilha' }
                                                });
                                }
                            })
                            .catch( err => {
                                throw err;
                            });
                    }
                    
                    throw { message: "Não foi possível cadastrar a trilha desejada", count: 0 };
                })
                .then( result => {
                    res.json({ data: "Trilha cadastrada com sucesso!", count: 1 });
                })
                .catch( err => {
                    console.log(err);
                    res.json(err)
                });
        }
        /**
         * @api {put} /trail/:trailID Update
         * @apiGroup Trail
         * @apiDescription Atualiza as informações da trilha escolhida
         * @apiParam {Number} trailID ID da trilha
         * @apiParam {String} trailname Nome da trilha
         * @apiParam {String} traildescr Descrição da trilha
         * @apiParam {Number} trailrat Avaliação da trilha
         * @apiParamExample {json} Request-Params
         *      http://localhost:3000/trail/1?trailname=Trilha de exemplo&traildescr=&trailrat=5
         * 
         * @apiUse DefaultSuccess
         * @apiSuccessExample {json} Response-Success
         *      HTTP/1.1 200 OK
         *      {
         *          count: 1,
         *          rows: []
         *      }
         */
        update(req, res) {
            const { trailID } = req.params,
                  { trailname, traildescr, trailrat } = req.query;

            TrailModel
                .update(trailID, { trailname, traildescr, trailrat })
                .then( succeed => res.json(succeed) )
                .catch( err => res.json(err) );
        }
        /**
         * @api {delete} /trail/:trailID Remove (Disabled)
         * @apiGroup Trail
         * @apiDescription Remove a trilha escolhida
         * @apiParam {Number} trailID ID da trilha
         * @apiParamExample {json} Request-Params
         *      http://localhost:3000/trail/1
         * 
         * @apiUse DefaultSuccess
         * @apiSuccessExample {json} Response-Success
         *      HTTP/1.1 200 OK
         *      {
         *          count: 1,
         *          rows: []
         *      }
         */
        remove(req, res) {
            const { trailID } = req.params;

            TrailModel
                .remove(trailID)
                .then( succeed => res.json(succeed) )
                .catch( err => res.json(err) );
        }
        /**
         * @api {post} /trail/:trailID/realizar PerformTrail
         * @apiGroup Trail
         * @apiDescription O usuário pode realizar uma trilha ja criada por outro
         * @apiParam {Number} userID ID do usuário que está realizando
         * @apiParam {Number} trailID ID da trilha realizada
         * @apiParam {Number} trailrat Avaliação do usuário para a trilha
         * @apiParam {String} trailtime Tempo do usuário na trilha
         * @apiParamExample {json} Request-Example
         *      http://localhost:3000/trail/1/realizar?userID=1&trailID=1&trailrat=5&trailtime=02:00:00
         * 
         * @apiUse DefaultSuccess
         * @apiSuccessExample {json} Response-Success
         *      HTTP/1.1 200 OK
         *      {
         *          count: 1,
         *          rows: []
         *      }
         */
        performTrail(req, res) {
            const { trailID } = req.params,
                  { userID, trailrat, trailtime } = req.query;

            TrailActivityModel
                .create({ userID, trailID, trailrat, trailtime })
                .then( succeed => res.json(succeed) )
                .catch( err => res.json(err) );
        }
        
    }

    return new TrailCtrl();
}