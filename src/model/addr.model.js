const { DataTypes } = require("sequelize");
const seq = require("../db/seq");
const Address = seq.define(
  "koa_address",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "用户ID",
    },
    consignee: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "收货人姓名",
    },
    phone: {
      type: DataTypes.CHAR(11),
      allowNull: false,
      comment: "收货人手机号",
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "收货人地址",
    },
    is_default: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "是否为默认地址",
    },
  },
  //解决自动变复数
  {
    freezeTableName: true, //freezeTableName禁用修改表名;默认情况下,sequelize会自动将模型名称(第一个参数定义)为复数。值为ture时不修改
    tableName: "koa_address", //又在下方加入tableName的设置重新索引才生效
    // timestamps是否自动添加时间戳createAt，updateAt
  }
);

// Address.sync({ force: true });
module.exports = Address;
