const Router = require("koa-router");
const router = new Router({ prefix: "/home" });

router.get("/", async (ctx) => {
  ctx.body = "zzydannyer的博客建设中";
});

module.exports = router;
