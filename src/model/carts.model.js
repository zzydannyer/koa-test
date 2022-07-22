const { DataTypes } = require("sequelize");
const seq = require("../db/seq");
const Goods = require("./goods.model");

const Carts = seq.define("koa_carts", {
  goods_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "商品id",
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "用户id",
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: "商品的数量",
  },
  selected: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: "是否选中",
  },
});

//关联表
Carts.belongsTo(Goods, {
  foreignKey: "goods_id",
  as: "goods_info",
});
// Carts.sync({ force: true });
module.exports = Carts;
