const Router = require("koa-router")
const router = new Router({ prefix: '/' });

router.get('/', async ctx => {
    ctx.body = "首页"
})

module.exports = router;

