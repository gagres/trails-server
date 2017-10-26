module.exports = app => {
    const connection = app.connection;
    
    class TrailModel {
        getAll() {
            return connection.queryAsync(`
                SELECT id, trailname, traildist, trailrat
            `);
        }
        getOne(id) {
            return connection.queryAsync(`
                SELECT trail.id, 
                       trail.trailname, 
                       trail.traildist, 
                       trail.trailrat, 
                       user.name as user,
                       trail.created_at,
                       trail.updated_at
                FROM trail
                INNER JOIN user ON user.id = trail.id_user
                WHERE trail.id = :id`
                , { id }
            )
        }
        create(trail) {
            return connection.queryAsync(`
                INSERT INTO trail (trailname, traildist, trailrat, user_id, created_at)
                VALUES (:trailname, :traildist, :trailrat, :user_id, NOW())`
                , trail
            )
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