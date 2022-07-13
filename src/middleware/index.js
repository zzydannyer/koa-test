const { getUerInfo } = require("../service");
const {
  userFormateError,
  userExisted,
  userRegisterError,
} = require("../constants/err.type");

const validator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  if (!user_name || !password) {
    console.error("用户名或密码为空", ctx.request.body);
    ctx.app.emit("error", userFormateError, ctx);
    return;
  }
  await next();
};

const verify = async (ctx, next) => {
  const { user_name } = ctx.request.body;
  //验证是否已注册
  try {
    const res = await getUerInfo({ user_name });
    if (res) {
      console.error("用户名已存在", { user_name });
      ctx.app.emit("error", userExisted, ctx);
      return;
    }
  } catch (err) {
    console.error("获取用户信息错误", err);
    ctx.app.emit("error", userRegisterError, ctx);
    return 
  }

  await next();
};

module.exports = { validator, verify };