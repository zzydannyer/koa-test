const {
  createAddr,
  findAllAddr,
  updateAddr,
  removeAddr,
  setDefaultAddr,
} = require("../service/addr.service");

class AddrController {
  async create(ctx) {
    const user_id = ctx.state.user.id;
    const { consignee, phone, address } = ctx.request.body;
    const res = await createAddr({ user_id, consignee, phone, address });
    ctx.body = {
      code: 0,
      message: "地址添加成功",
      result: res,
    };
  }
  async findAll(ctx) {
    const user_id = ctx.state.user.id;
    const res = await findAllAddr(user_id);
    ctx.body = {
      code: 0,
      message: "列表获取成功",
      result: res,
    };
  }
  async update(ctx) {
    const id = ctx.request.params.id;
    const res = await updateAddr(id, ctx.request.body);
    ctx.body = {
      code: 0,
      message: "地址修改成功",
      result: res,
    };
  }
  async remove(ctx) {
    const id = ctx.request.params.id;
    const res = await removeAddr(id);
    ctx.body = {
      code: 0,
      message: "地址删除成功",
      result: res,
    };
  }
  async setDefault(ctx) {
    const user_id = ctx.state.user.id;
    const id = ctx.request.params.id;
    const res = await setDefaultAddr(user_id, id);
    ctx.body = {
      code: 0,
      message: "设置默认地址成功成功",
      result: res,
    };
  }
}

module.exports = new AddrController();
