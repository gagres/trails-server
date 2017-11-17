const { TYPES } = require('tedious'); 

module.exports = server => {
    const connection    = server.connection;
          RequestHelper = server.helpers.request;
          
    class TrailActivityModel {
        getTrailActivityByTrail(trailID) {
            const sql = `
                SELECT TrailUser.realname,
                       TrailActivity.dtin,
                       TrailActivity.trailrat,
                       TrailActivity.trailtime
                FROM TrailActivity
                INNER JOIN TrailUser ON TrailUser.userID = TrailActivity.userID
                WHERE TrailActivity.trailID = @trailID
                ORDER BY trailtime
                OFFSET 0 ROWS
                FETCH FIRST 5 ROWS ONLY;`;
        
            const request = connection.Request(sql)
                                .addParam('trailID', TYPES.Int, trailID);
            
            return RequestHelper.requestToPromise(request);
        }
        getTrailActivityByUser(userID) {
            const sql = `
                SELECT Trail.trailname,
                       Trail.traildist,
                       TrailActivity.trailtime,
                       TrailActivity.trailrat,
                       TrailActivity.dtin
                FROM TrailActivity
                INNER JOIN Trail ON Trail.trailID = TrailActivity.trailID
                WHERE TrailActivity.userID = @userID
                ORDER BY trailtime
                OFFSET 0 ROWS
                FETCH FIRST 5 ROWS ONLY;`;
        
            const request = connection.Request(sql)
                                .addParam('userID', TYPES.Int, userID);
            
            return RequestHelper.requestToPromise(request);
        }
        getAnalyticsByUser(userID) {
            const sql = `
                SELECT SUM(Trail.traildist) as 'total_dist',
                       DATEADD(ms, SUM(DATEDIFF(ms, '00:00:00.000', TrailActivity.trailtime)), '00:00:00.000') as 'total_time',
                       COUNT(TrailActivity.activityID) as 'total_trails'
                FROM TrailActivity
                INNER JOIN Trail ON Trail.trailID = TrailActivity.trailID
                WHERE TrailActivity.userID = @userID
                GROUP BY TrailActivity.activityID`;

            const request = connection.Request(sql)
                                .addParam('userID', TYPES.Int, userID);
            
            return RequestHelper.requestToPromise(request);
        }
        create(activity) {
            const sql = `
                INSERT INTO TrailActivity (userID, trailID, dtin, trailrat, trailtime)
                VALUES (@userID, @trailID, CURRENT_TIMESTAMP, @trailrat, @trailtime)`;

            const request = connection.Request(sql)
                                .addParam('userID', TYPES.Int, activity.userID)
                                .addParam('trailID', TYPES.Int, activity.trailID)
                                .addParam('trailrat', TYPES.Int, activity.trailrat)
                                .addParam('trailtime', TYPES.VarChar, activity.trailtime);

            return RequestHelper.requestToPromise(request);
        }
    }

    return new TrailActivityModel();
}