const {
  createOrUpdate,
  updateCarts,
  findCarts,
  removeCarts,
  selectAllCarts,
} = require("../service/carts.service");

class CartsController {
  async add(ctx) {
    const user_id = ctx.state.user.id;
    const goods_id = ctx.request.body.goods_id;
    const res = await createOrUpdate(user_id, goods_id);
    ctx.body = {
      code: 0,
      message: "购物车添加成功",
      result: res,
    };
  }
  async findAll(ctx) {
    const { pageNum = 1, pageSize = 10 } = ctx.request.query;
    const res = await findCarts(pageNum, pageSize);
    ctx.body = {
      code: 0,
      message: "购物车获取成功",
      result: res,
    };
  }
  async update(ctx) {
    const id = ctx.request.params.id;
    const { number, selected } = ctx.request.body;
    const res = await updateCarts({ id, number, selected });
    ctx.body = {
      code: 0,
      message: "更新购物车成功",
      result: res,
    };
  }

  async remove(ctx) {
    const { ids } = ctx.request.body;
    const res = await removeCarts(ids);
    ctx.body = {
      code: 0,
      message: "购物车删除成功",
      result: res,
    };
  }

  select(value) {
    return async (ctx) => {
      const user_id = ctx.state.user.id;
      const res = await selectAllCarts(user_id, value);

      ctx.body = {
        code: 0,
        message: value ? "全部选中" : "全不选中",
        result: res,
      };
    };
  }
}
module.exports = new CartsController();
