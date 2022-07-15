const Router = require("koa-router");
const router = new Router();
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");

router.get("/404", async (ctx) => {
  const filePath = path.join(__dirname, "../../assets/images/404.webp");
  const file = fs.readFileSync(filePath); // 读取文件
  const mimeType = mime.lookup(filePath); // 读取文件类型
  ctx.set("content-type", mimeType); // 设置返回类型（这一步很重要）
  ctx.body = file; // 返回图片
});

module.exports = router;
