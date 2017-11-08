const bluebird = require('bluebird');

module.exports = server => {
    const connection = server.connection;
    
    class TrailModel {
        getAll(queryParams) {
            let sql = `SELECT trailID, trailname, traildist, trailtime, trailrat
                       FROM Trail
                       WHERE 1 = 1 `;

            if(queryParams.trailname) 
                sql += "AND trailname LIKE '%:trailname%'";

            if(queryParams.trailID)
                sql += "AND trailID = :trailID";

            if(queryParams.userID)
                sql += "AND userID = :userID"

            return connection.queryAsync(sql);
        }
        getOne(trailID) {
            return connection.queryAsync(`
                SELECT Trail.trailID, 
                       Trail.trailname, 
                       Trail.traildist,
                       Trail.trailtime, 
                       Trail.trailrat,
                       Trail.traildescr,
                       Trail.mainlat,
                       Trail.mainlong,
                       user.name as user,
                       Trail.dtin,
                       Trail.dtstamp
                FROM Trail
                INNER JOIN user ON user.trailID = Trail.userID
                WHERE Trail.trailID = :trailID`
                , { trailID }
            )
        }
        create(trail) {
            return connection.queryAsync(`
                INSERT INTO Trail (trailname, traildist, trailtime, trailrat, traildescr, userID, dtin)
                VALUES (:trailname, :traildist, :trailtime, :trailrat, :traildescr, :userID, NOW())`
                , trail)
            .then( (trail) => {
                if(trail.insertId) 
                    return { data: trail.insertId }

                return {"message": "Não foi possível criar a trilha"}
            })
        }
        update(trailID, trail) {
            return connection.queryAsync(`
                UPDATE Trail
                SET trailname  = :trailname,
                    traildist  = :traildist,
                    trailtime  = :trailtime,
                    trailrat   = :trailrat,
                    traildescr = :traildescr
                    dtstamp    = NOW()
                WHERE trailID = :trailID 
            `, Object.assign(trail, { trailID }));
        }
        remove(trailID) {
            return connection.queryAsync(`
                DELETE FROM Trail WHERE trailID = :trailID`
                , { trailID }
            )
        }
    }

    return new TrailModel();
}