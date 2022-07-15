const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config.default");
const { createUser, getUerInfo, updateById } = require("../service/user.service");
const {
  userRegisterError,
  userLoginError,
  changePWDError,
} = require("../constants/err.type");

class UserController {
  /* 注册用户 */
  async register(ctx, next) {
    const { user_name, password } = ctx.request.body;
    try {
      const res = await createUser(user_name, password);
      ctx.body = {
        code: 0,
        message: ' "用户注册成功"',
        result: {
          id: res.id,
          user_name: res.user_name,
        },
      };
    } catch (err) {
      console.error("写入用户信息错误", err);
      return ctx.app.emit("error", userRegisterError, ctx);
    }
  }

  /* 登录 */
  async login(ctx, next) {
    const { user_name } = ctx.request.body;
    //jwt payload中记录id user_naem is_admin
    try {
      const { password, ...userInfo } = await getUerInfo({ user_name });
      ctx.body = {
        code: 0,
        message: `${user_name} 登陆成功`,
        result: {
          token: jwt.sign(userInfo, JWT_SECRET, { expiresIn: "1d" }),
        },
      };
    } catch (err) {
      console.error("用户登陆失败", err);
      return ctx.app.emit("error", userLoginError, ctx);
    }
  }

  /* 修改密码 */
  async changePWD(ctx, next) {
    const { id } = ctx.state.user;
    const { password } = ctx.request.body;
    try {
      const res = await updateById({ id, password });
      if (res) {
        ctx.body = {
          code: 0,
          message: "密码修改成功",
          result: "",
        };
      }
    } catch (err) {
      console.error("密码修改失败", error);
      return ctx.app.emit("error", changePWDError, ctx);
    }
    await next();
  }
}

module.exports = new UserController();
