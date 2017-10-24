module.exports = (sequelize, DataType) => {
    const PointModel = sequelize.define('trail_point', {
        latitude: DataType.DECIMAL(3, 12),
        longitude: DataType.DECIMAL(3, 12),
        autitude: DataType.DECIMAL(3, 12),
        trail_id: {
            type: DataType.INTEGER,
            references: {
                model: 'trails',
                key: 'id'
            }
        }
    })

    return PointModel;
}