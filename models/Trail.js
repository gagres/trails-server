module.exports = (sequelize, DataType) => {
    const TrailModel = sequelize.define('trail', {
        trailname: {
            type: DataType.STRING(30),
            validate: {
                notEmpty: true
            }
        },
        traildist: {
            type: DataType.INTEGER,
            validate: {
                notEmpty: true
            }
        },
        trailrat: {
            type: DataType.INTEGER,
            validate: {
                notEmpty: true
            }
        },
        user_id: {
            type: DataType.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        }
    })

    return TrailModel;
}