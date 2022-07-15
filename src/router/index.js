const Router = require("koa-router");
const router = new Router();
const fs = require("fs");

fs.readdirSync(__dirname).forEach((file) => {
  if (file !== "index.js") {
    let childRouter = require("./" + file);
    router.use(childRouter.routes());
  }
});

router.redirect("/", "/home");

module.exports = router;
