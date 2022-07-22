const {
  createOrder,
  findAllOrders,
  updateOrder,
} = require("../service/orders.service");

class OrdersController {
  async create(ctx) {
    const user_id = ctx.state.user.id;
    const { address_id, goods_info, total } = ctx.request.body;
    const order_number = "koa" + Date.now();
    const res = await createOrder({
      user_id,
      address_id,
      goods_info,
      total,
      order_number,
    });
    ctx.body = {
      code: 0,
      message: "订单生成成功",
      result: res,
    };
  }
  async findAll(ctx) {
    const { pageNum = 1, pageSize = 10, status = 0 } = ctx.request.query;
    const res = await findAllOrders(pageNum, pageSize, status);
    ctx.body = {
      code: 0,
      message: "获取订单列表成功",
      result: res,
    };
  }
  async update(ctx) {
    const id = ctx.request.params.id;
    const { status } = ctx.request.body;
    const res = await updateOrder(id, status);
    ctx.body = {
      code: 0,
      message: "订单状态更新成功",
      result: res,
    };
  }
}
module.exports = new OrdersController();
