const Carts = require("../model/carts.model");
const Goods = require("../model/Goods.model");
const { Op } = require("sequelize");

class CartsService {
  async createOrUpdate(user_id, goods_id) {
    const res = await Carts.findOne({
      where: {
        //同时查询多个条件
        [Op.and]: {
          user_id,
          goods_id,
        },
      },
    });
    if (res) {
      //已存在则number++
      await res.increment("number");
      return await res.reload();
    } else {
      return await Carts.create({
        user_id,
        goods_id,
      });
    }
  }
  async findCarts(pageNum, pageSize) {
    const offset = (pageNum - 1) * pageSize;
    const { count, rows } = await Carts.findAndCountAll({
      attributes: ["id", "number", "selected"],
      offset,
      limit: pageSize * 1,
      include: {
        model: Goods,
        as: "goods_info",
        attributes: ["id", "goods_name", "goods_price", "goods_img"],
      },
    });
    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    };
  }
  async findCartsId(id) {
    const res = await Carts.findAll({
      where: { id },
      include: {
        model: Goods,
        as: "goods_info",
        attributes: ["id", "goods_num"],
      },
    });
    return res[0];
  }
  async updateCarts(params) {
    const { id, number, selected } = params;
    const res = await Carts.findByPk(id);
    if (!res) return;
    res.number = number ?? res.number;
    res.selected = selected ?? res.selected;
    return await res.save();
  }
  async removeCarts(ids) {
    return await Carts.destroy({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
  }
  async selectAllCarts(user_id, value) {
    return await Carts.update(
      { selected: value },
      {
        where: {
          user_id,
        },
      }
    );
  }
}

module.exports = new CartsService();
