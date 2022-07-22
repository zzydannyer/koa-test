const {
  invalidGoodsId,
  outOfStock,
  cartsFormatError,
} = require("../constants/err.type");
const { findGoodsId } = require("../service/goods.service");
const { findCartsId } = require("../service/carts.service");

//判断添加和修改购物车
const createOrUpdate = (ctx) => {
  const type = ctx.request.body.goods_id
    ? "create"
    : ctx.request.params.id
    ? "update"
    : "";
  return type;
};

//库存不足抛出错误
const stockErrorHandler = (info, num = 1, ctx) => {
  if (!info) {
    return ctx.app.emit("error", invalidGoodsId, ctx);
  }
  if (info.goods_num - num < 0) {
    return ctx.app.emit("error", outOfStock, ctx);
  }
  return false;
};

//判断库存
const stockValidator = async (ctx, next) => {
  try {
    let res, result;
    const type = createOrUpdate(ctx);
    if (type == "create") {
      //新增购物车
      res = await findGoodsId(ctx.request.body.goods_id);
      result = stockErrorHandler(res.dataValues, undefined, ctx);
    } else if (type == "update") {
      //更新购物车
      const { number, selected } = ctx.request.body;
      if (number === undefined && selected === undefined) {
        throw "number和selecte不能同时为空";
      }
      res = await findCartsId(ctx.request.params.id);
      result = stockErrorHandler(
        res.dataValues.goods_info,
        ctx.request.body.number,
        ctx
      );
    }
    if (result) return result;
  } catch (err) {
    console.error(err);
    invalidGoodsId.result = err;
    return ctx.app.emit("error", invalidGoodsId, ctx);
  }
  await next();
};

//验证传参格式
const validator = (rules) => {
  return async (ctx, next) => {
    try {
      ctx.verifyParams(rules);
    } catch (err) {
      console.error(err);
      cartsFormatError.result = err;
      return ctx.app.emit("error", cartsFormatError, ctx);
    }
    await next();
  };
};

module.exports = { stockValidator, validator };
