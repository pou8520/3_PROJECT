'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userid: DataTypes.STRING,
    password: DataTypes.STRING,
    nickname: DataTypes.STRING,
    phone: DataTypes.STRING,
    point: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};