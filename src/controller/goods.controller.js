const path = require("path");
const fs = require("fs");
const {
  fileUploadError,
  unSupportedFileType,
  createGoodsError,
  invalidGoodsId,
} = require("../constants/err.type");
const {
  createGoods,
  updateGoods,
  removeGoods,
  putOffGoods,
  restoreGoods,
  findGoods,
} = require("../service/goods.service");

class GoodsController {
  async upload(ctx, next) {
    const { file } = ctx.request.files;
    const fileTypes = ["image/jpeg", "image/png"];
    if (file) {
      if (!fileTypes.includes(file.mimetype)) {
        return ctx.app.emit("error", unSupportedFileType, ctx);
      }
      const basePath = "src/assets/upload";
      const filePath = path.join(basePath, file.originalFilename);
      //没有则创建文件
      if (!fs.existsSync(filePath)) {
        fs.writeFile(filePath, "", (err) => {
          console.error(err);
        });
      }
      const reader = fs.createReadStream(file.filepath);
      const stream = fs.createWriteStream(filePath);
      reader.pipe(stream);

      ctx.body = {
        code: 0,
        message: "图片上传成功",
        result: {
          goods_img: "http://localhost:8080/upload/" + path.basename(filePath),
        },
      };
    } else {
      return ctx.app.emit("error", fileUploadError, ctx);
    }
  }
  async create(ctx, next) {
    try {
      const { createdAt, updatedAt, ...res } = await createGoods(
        ctx.request.body
      );
      ctx.body = {
        code: 0,
        message: "商品添加成功",
        result: res,
      };
    } catch (err) {
      console.error(err);
      return ctx.app.emit("error", createGoodsError, ctx);
    }
  }
  async update(ctx, next) {
    try {
      const res = await updateGoods(ctx.params.id, ctx.request.body);
      if (res) {
        ctx.body = {
          code: 0,
          message: "商品修改成功",
          result: "",
        };
      } else {
        return ctx.app.emit("error", invalidGoodsId, ctx);
      }
    } catch (err) {
      console.error(err);
    }
  }
  async remove(ctx, next) {
    try {
      const res = await removeGoods(ctx.params.id);
      if (res) {
        ctx.body = {
          code: 0,
          message: "删除成功",
          result: "",
        };
      } else {
        ctx.body = "删除失败";
      }
    } catch (err) {
      console.error(err);
    }
  }
  async putOff(ctx, next) {
    try {
      const res = await putOffGoods(ctx.params.id);
      if (res) {
        ctx.body = {
          code: 0,
          message: "下架成功",
          result: "",
        };
      } else {
        return ctx.app.emit("error", invalidGoodsId, ctx);
      }
    } catch (err) {
      console.error(err);
    }
  }
  async restore(ctx, next) {
    const res = restoreGoods(ctx.params.id);
    if (res) {
      ctx.body = {
        code: 0,
        message: "上架成功",
        result: "",
      };
    } else {
      return ctx.app.emit("error", invalidGoodsId, ctx);
    }
  }
  async findAll(ctx, next) {
    const { pageNum = 1, pageSize = 10 } = ctx.request.query;
    const res = await findGoods(pageNum, pageSize);

    ctx.body = {
      code: 0,
      message: "获商品列表成功",
      result: res,
    };
  }
}

module.exports = new GoodsController();
