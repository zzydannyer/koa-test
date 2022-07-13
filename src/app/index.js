const Koa = require("koa");
const KoaBody = require("koa-body");
const { APP_PORT } = require("../config/config.default");
const cors = require("koa-cors");
const router = require("../router");
const path = require("path");
const errHandler = require("./errHandler");
const static = require("koa-static");
const app = new Koa();

app.use(async (ctx, next) => {
  await next();
  if (parseInt(ctx.status) === 404) {
    ctx.response.redirect("/404");
  }
});

app.use(cors());
app.use(KoaBody());
app.use(static(path.join(__dirname, "/assets")));
app.use(router.routes(), router.allowedMethods());
app.on("error", errHandler);

app.listen(APP_PORT, () => {
  console.log(`Server is running at http://localhost:${APP_PORT}`);
});
