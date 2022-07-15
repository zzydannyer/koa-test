const { goodsFormatError } = require("../constants/err.type");

const goodsValidator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      goods_name: { type: "string", reuqired: true },
      goods_price: { type: "number", reuqired: true },
      goods_num: { type: "number", reuqired: true },
      goods_img: { type: "string", reuqired: true },
    });
    ctx.body = "成功";
  } catch (err) {
    console.error(err);
    goodsFormatError.result = err;
    return ctx.app.emit("error", goodsFormatError, ctx);
  }

  await next();
};

module.exports = { goodsValidator };
