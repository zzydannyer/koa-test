const Goods = require("../model/goods.model");

class GoodsService {
  async createGoods(goods) {
    const res = await Goods.create(goods);
    return res.dataValues;
  }
  async updateGoods(id, goods) {
    try {
      const res = await Goods.update(goods, { where: { id } });
      return res[0];
    } catch (err) {
      console.error(err);
    }
  }
  async removeGoods(id) {
    /* 硬删除 */
    const res = await Goods.destroy({ where: { id }, force: true });
    return res;
  }
  async putOffGoods(id) {
    /* 软删除 */
    const res = await Goods.destroy({ where: { id } });
    return res;
  }
  /* 恢复商品 */
  async restoreGoods(id) {
    const res = await Goods.restore({ where: { id } });
    return res;
  }
  async findGoods(pageNum, pageSize) {
    const offset = (pageNum - 1) * pageSize;
    //count() + findAll({ offset, limit })
    const { count, rows } = await Goods.findAndCountAll({
      offset,
      limit: pageSize * 1,
    });
    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    };
  }
}
module.exports = new GoodsService();
