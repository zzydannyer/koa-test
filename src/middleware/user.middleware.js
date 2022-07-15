const { getUerInfo } = require("../service/user.service");
const bcrypt = require("bcryptjs");
const {
  userFormateError,
  userExisted,
  userRegisterError,
  userNotExist,
  userLoginError,
  invalidPWD,
  equalPWD,
} = require("../constants/err.type");

/* 验证用户名密码是否为空 */
const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  if (!user_name || !password) {
    console.error("用户名或密码为空", ctx.request.body);
    ctx.app.emit("error", userFormateError, ctx);
    return;
  }
  await next();
};

/* 验证是否已注册 */
const verifyRegister = async (ctx, next) => {
  const { user_name } = ctx.request.body;
  try {
    const res = await getUerInfo({ user_name });
    if (res) {
      console.error("用户名已存在", { user_name });
      return ctx.app.emit("error", userExisted, ctx);
    }
  } catch (err) {
    console.error("获取用户信息错误", err);
    return ctx.app.emit("error", userRegisterError, ctx);
  }
  await next();
};

/* 验证用户名是否存在 */
const verifyLogin = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  try {
    const res = await getUerInfo({ user_name });
    if (!res) {
      console.error("用户名不存在", { user_name });
      return ctx.app.emit("error", userNotExist, ctx);
    }
    //匹配密码
    if (!bcrypt.compareSync(password, res.password)) {
      return ctx.app.emit("error", invalidPWD, ctx);
    }
  } catch (err) {
    console.error("用户名登陆失败", err);
    return ctx.app.emit("error", userLoginError, ctx);
  }
  await next();
};

/* 加密密码 */
const cryptPWD = async (ctx, next) => {
  const { password } = ctx.request.body;
  const salt = bcrypt.genSaltSync(10);
  //hash是处理后的密文
  const hash = bcrypt.hashSync(password, salt);
  ctx.request.body.password = hash;
  await next();
};

/* 验证新旧密码是否相同 */
const verifyPWD = async (ctx, next) => {
  const { id } = ctx.state.user;
  const { password } = ctx.request.body;
  try {
    const result = await getUerInfo({ id: id });
    if (bcrypt.compareSync(password, result.password)) {
      return ctx.app.emit("error", equalPWD, ctx);
    }
  } catch (err) {
    console.error("新旧密码对比出错", err);
  }
  await next();
};

module.exports = {
  userValidator,
  verifyRegister,
  verifyLogin,
  cryptPWD,
  verifyPWD,
};
