const User = require("../model/user.model");

class UserService {
  /* 注册新用户 */
  async createUser(user_name, password) {
    const res = await User.create({ user_name, password });
    return res.dataValues;
  }

  /* 获取用户信息 */
  async getUerInfo({ ...args }) {
    const res = await User.findOne({
      attributes: ["id", "user_name", "password", "is_admin"],
      where: { ...args },
    });
    return res ? res.dataValues : null;
  }

  /* 更新用户信息 */
  async updateById({ id, is_admin, ...args }) {
    const res = await User.update({ ...args }, { where: { id } });
    return res[0];
  }

}
module.exports = new UserService();
