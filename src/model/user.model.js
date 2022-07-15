const { DataTypes } = require("sequelize");
const seq = require("../db/seq");

const User = seq.define(
  "koa_User",
  {
    //id自动创建
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: "用户名",
    },
    password: {
      type: DataTypes.CHAR(64),
      allowNull: false,
      comment: "密码",
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "是否管理员",
    },
  },
  {
    timestamps: false,
  }
);

// User.sync({
//   force: true,
// });

module.exports = User;
