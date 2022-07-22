const Orders = require("../model/orders.model");

class OrdersService {
  async createOrder(order) {
    console.log(order);
    return await Orders.create(order);
  }
  async findAllOrders(pageNum, pageSize, status) {
    const { count, rows } = await Orders.findAndCountAll({
      attributes: ["goods_info", "total", "order_number", "status"],
      where: {
        status,
      },
      offset: (pageNum - 1) * pageSize,
      limit: pageSize * 1,
    });
    console.log(count, rows);

    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    };
  }
  async updateOrder(id, status) {
    return Orders.update({ status }, { where: { id } });
  }
}
module.exports = new OrdersService();
