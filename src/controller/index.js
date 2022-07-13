const { createUser } = require("../service");
const { userRegisterError } = require("../constants/err.type");

class Controller {
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
      ctx.app.emit("error", userRegisterError, ctx);
      return
    }
  }
  async login(ctx, next) {
    ctx.body = "登陆成功";
  }
}

module.exports = new Controller();
