const { APP_PORT } = require("./config/config.default");

const app = require("./app");

app.listen(APP_PORT, () => {
  console.log(`服务器运行成功 http://localhost:${APP_PORT}`);
});
