const bluebird = require('bluebird');

module.exports = server => {
    const connection = server.connection;
    
    class TrailModel {
        getAll(queryParams) {
            let sql = `SELECT id, trailname, traildist, trailtime, trailrat
                       FROM trail
                       WHERE 1 = 1 `;

            if(queryParams.trailname) 
                sql += "AND trailname LIKE '%:trailname%'";

            if(queryParams.id)
                sql += "AND id = :id";

            if(queryParams.user_id)
                sql += "AND user_id = :user_id"

            return connection.queryAsync(sql);
        }
        getOne(id) {
            return connection.queryAsync(`
                SELECT trail.id, 
                       trail.trailname, 
                       trail.traildist,
                       trail.trailtime, 
                       trail.trailrat,
                       trail.traildescr,
                       user.name as user,
                       trail.dtin,
                       trail.dtstamp
                FROM trail
                INNER JOIN user ON user.id = trail.user_id
                WHERE trail.id = :id`
                , { id }
            )
        }
        create(trail) {
            return connection.queryAsync(`
                INSERT INTO trail (trailname, traildist, trailtime, trailrat, traildescr, user_id, dtin)
                VALUES (:trailname, :traildist, :trailtime, :trailrat, :traildescr, :user_id, NOW())`
                , trail)
            .then( (trail) => {
                if(trail.insertId) 
                    return { data: trail.insertId }

                return {"message": "Não foi possível criar a trilha"}
            })
        }
        update(id, trail) {
            return connection.queryAsync(`
                UPDATE trail
                SET trailname  = :trailname,
                    traildist  = :traildist,
                    trailtime  = :trailtime,
                    trailrat   = :trailrat,
                    traildescr = :traildescr
                    dtstamp    = NOW()
                WHERE id = :id 
            `, Object.assign(trail, { id }));
        }
        remove(id) {
            return connection.queryAsync(`
                DELETE FROM trail WHERE id = :id`
                , { id }
            )
        }
    }

    return new TrailModel();
}