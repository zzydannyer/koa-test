const Router = require("koa-router");
const router = new Router({ prefix: "/user" });
const {
  register,
  login,
  changePWD,
} = require("../../controller/user.controller");
const {
  userValidator,
  verifyRegister,
  verifyLogin,
  cryptPWD,
  verifyPWD,
} = require("../../middleware/user.middleware");
const { auth } = require("../../middleware/auth.middleware");

router.post("/register", userValidator, verifyRegister, cryptPWD, register);
router.post("/login", userValidator, verifyLogin, login);
router.patch("/", auth, verifyPWD, cryptPWD, changePWD);

module.exports = router;
