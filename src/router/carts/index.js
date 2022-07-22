const Router = require("koa-router");
const router = new Router({ prefix: "/carts" });
const { auth } = require("../../middleware/auth.middleware");
const {
  validator,
  stockValidator,
} = require("../../middleware/carts.middleware");
const {
  add,
  update,
  findAll,
  remove,
  select,
} = require("../../controller/carts.controller");

router.post("/", auth, validator({ goods_id: "number" }), stockValidator, add);
router.patch(
  "/:id",
  auth,
  validator({
    number: { type: "number", required: false },
    selected: { type: "bool", required: false },
  }),
  stockValidator,
  update
);
router.get("/", auth, findAll);
router.delete("/", auth, validator({ ids: "array" }), remove);

router.post("/selectAll", auth, select(true));
router.post("/unselectAll", auth, select(false));
module.exports = router;
