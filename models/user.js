"use strict";
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");
const { Model } = require("sequelize");
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

    generateToken() {
      const { id, email } = this;
      const token = sign({ id, email }, process.env.JWT_SECRET);
      return token;
    }

    verify(password) {
      return compareSync(password, this.password);
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user) => {
    const salt = genSaltSync(10);
    user.password = hashSync(user.password, salt);
  });

  return User;
};
