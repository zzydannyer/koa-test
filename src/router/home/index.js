const Router = require("koa-router");
const router = new Router({ prefix: "/home" });

router.get("/", async (ctx) => {
  ctx.body = "首页";
});

module.exports = router;
