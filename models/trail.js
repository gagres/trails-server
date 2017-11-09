const bluebird  = require('bluebird'),
      { TYPES } = require('tedious'); 

module.exports = server => {
    const connection    = server.connection,
          RequestHelper = server.helpers.request;
    
    class TrailModel {
        getAll() {
            let sql = `SELECT trailID, trailname, traildist, trailtime, trailrat
                       FROM Trail`;
            
            return RequestHelper.requestToPromise(connection.Request(sql));
        }
        getOne(trailID) {

            const sql = `
                SELECT Trail.trailID, 
                    Trail.trailname, 
                    Trail.traildist,
                    Trail.trailtime, 
                    Trail.trailrat,
                    Trail.traildescr,
                    Trail.mainlat,
                    Trail.mainlong,
                    TrailUser.realname as 'user',
                    Trail.dtin,
                    Trail.dtstamp
                FROM Trail
                INNER JOIN TrailUser ON TrailUser.userID = Trail.userID
                WHERE Trail.trailID = @trailID`;
            
            const request = connection.Request(sql)
                                    .addParam('trailID', TYPES.Int, trailID);

            return RequestHelper.requestToPromise(request);
        }
        create(trail) {
            const sql = `
                INSERT INTO Trail (trailname, traildist, trailtime, trailrat, traildescr, userID, mainlat, mainlong, dtin, dtstamp)
                VALUES (@trailname, @traildist, @trailtime, @trailrat, @traildescr, @userID, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
                SELECT @@identity as 'trailID'`;

            const request = connection.Request(sql)
                                .addParam('trailname', TYPES.VarChar, trail.trailname)
                                .addParam('traildist', TYPES.Float, trail.traildist)
                                .addParam('trailtime', TYPES.VarChar, trail.trailtime)
                                .addParam('trailrat', TYPES.Int, trail.trailrat)
                                .addParam('traildescr', TYPES.Text, trail.traildescr)
                                .addParam('userID', TYPES.Int, trail.userID);

            return RequestHelper.requestToPromise(request);
        }
        update(trailID, trail) {
            const sql = `
                UPDATE Trail
                SET trailname  = @trailname,
                    trailrat   = @trailrat,
                    traildescr = @traildescr,
                    dtstamp    = CURRENT_TIMESTAMP
                WHERE trailID = @trailID`;

            const request = connection.Request(sql)
                                .addParam('trailname', TYPES.VarChar, trail.trailname)
                                .addParam('trailrat', TYPES.Int, trail.trailrat)
                                .addParam('traildescr', TYPES.Text, trail.traildescr)
                                .addParam('trailID', TYPES.Int, trailID);
            
            return RequestHelper.requestToPromise(request)
        }
        remove(trailID) {

            const sql = 'DELETE FROM Trail WHERE trailID = @trailID';

            const request = connection.Request(sql)
                                .addParam('trailID', TYPES.Int, trailID);

            return RequestHelper.requestToPromise(request);
        }
    }

    return new TrailModel();
}