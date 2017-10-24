
module.exports = app => {

    const UserModel = app.models.User;

    class UserCtrl {
        getAllUsers(req, res) {
            UserModel.getAll()
                .then()
        }
    }

    return new UserCtrl();
}