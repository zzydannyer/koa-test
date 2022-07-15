const Router = require("koa-router");
const router = new Router({ prefix: "/manage" });

router.get("/", async (ctx) => {
  ctx.body = "管理系统";
});

module.exports = router;
