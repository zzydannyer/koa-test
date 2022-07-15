const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config.default");
const {
  tokenExpiredError,
  invaildToken,
  noAdminPerission,
} = require("../constants/err.type");

/* token验证 */
const auth = async (ctx, next) => {
  const { authorization = "" } = ctx.request.header;
  const token = authorization.replace("Bearer ", "");
  try {
    const user = jwt.verify(token, JWT_SECRET);
    //存入用户信息
    ctx.state.user = user;
  } catch (err) {
    switch (err.name) {
      case "TokenExpiredError":
        console.error("token已过期", err);
        return ctx.app.emit("error", tokenExpiredError, ctx);
      case "JsonWebTokenError":
        console.error("无效的token", err);
        return ctx.app.emit("error", invaildToken, ctx);
    }
  }
  await next();
};

/* 是否管理员 */
const permission = async (ctx, next) => {
  const { is_admin } = ctx.state.user;
  if (!is_admin) {
    console.error("无管理员权限", ctx.state.user);
    return ctx.app.emit("error", noAdminPerission, ctx);
  }
  await next();
};

module.exports = { auth, permission };
