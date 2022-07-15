const path = require("path");
const Koa = require("koa");
const KoaBody = require("koa-body");
const KoaParameter = require("koa-parameter");
const cors = require("koa2-cors");

const router = require("../router");
const errHandler = require("./errHandler");
const static = require("koa-static");
const koaParameter = require("koa-parameter");
const app = new Koa();

app.use(async (ctx, next) => {
  await next();
  if (parseInt(ctx.status) === 404) {
    ctx.response.redirect("/404");
  }
});

app.use(cors());
app.use(
  KoaBody({
    // 配置文件上传
    multipart: true,
    /* formidable: {
      uploadDir: path.join(__dirname, "../assets/upload"),
      maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
      keepExtensions: true,
    }, */
  })
);
app.use(koaParameter(app));
app.use(static(path.join(__dirname, "../assets")));
app.use(router.routes()).use(router.allowedMethods());
app.on("error", errHandler);

module.exports = app;
