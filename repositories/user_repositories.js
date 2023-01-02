const { Users } = require('../models');

class UserRepository {
    findAllUser = async () => {
        const users = await this.usersModel.findAll();

        return users;
    };
    createUser = async (nickname, password, email) => {
        const createUserData = await Users.create({
            email,
            nickname,
            password,
        });

        return createUserData;
    };
}



module.exports = UserRepository;