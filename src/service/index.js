const User = require("../model");

class Service {
  async createUser(user_name, password) {
    const res = await User.create({ user_name, password });
    return res.dataValues;
  }

  async getUerInfo({ ...args }) {
    const whrereOpt = { ...args };
    const res = await User.findOne({
      attributes: ["id", "user_name", "password", "is_admin"],
      where: whrereOpt,
    });

    return res ? res.dataValues : null;
  }
}
module.exports = new Service();
