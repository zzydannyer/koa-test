const Router = require("koa-router");
const router = new Router({ prefix: "/goods" });
const { auth, permission } = require("../../middleware/auth.middleware");
const { goodsValidator } = require("../../middleware/goods.middleware");
const {
  upload,
  create,
  update,
  remove,
  putOff,
  restore,
  findAll,
} = require("../../controller/goods.controller");

router.post("/upload", auth, permission, upload);
router.post("/", auth, permission, goodsValidator, create);
router.put("/:id", auth, permission, goodsValidator, update);

/* 删除 */
router.delete("/:id", auth, permission, remove);
/* 下架 */
router.post("/:id/off", auth, permission, putOff);
router.post("/:id/on", auth, permission, restore);

router.get("/", findAll);
module.exports = router;
