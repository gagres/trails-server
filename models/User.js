module.exports = (sequelize, DataType) => {
    const UserModel = sequelize.define('user', {
        name: DataType.STRING(30),
        passwd: DataType.STRING(25),
        age: DataType.INTEGER
    });

    return UserModel;
}