const Router = require("koa-router");
const manage = require("./manage");
const web = require("./web");
const home = require("./home");
const errorPage = require("./errorPage");
const { register, login } = require("../controller");
const { validator, verify } = require("../middleware");
const router = new Router();

router.use("/home", home.routes(), home.allowedMethods());
router.use("/manage", manage.routes(), manage.allowedMethods());
router.use("/web", web.routes(), web.allowedMethods());
router.use("/404", errorPage.routes(), errorPage.allowedMethods());

router.post("/register", validator, verify, register);
router.post("/login", login);

router.redirect("/", "/home");

module.exports = router;
