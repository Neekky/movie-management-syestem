import "reflect-metadata";
import Express from "express";
import MovieRouter from "./routes/MovieRoute";
import UploadRouter from "./routes/UploadRoute";
import history from "connect-history-api-fallback";

/**
 * 数据库: mongodb
 * 驱动：mongodb、mongoose
 * 但这两款驱动对TS支持不友好
 * 其它数据库驱动：typeorm（完全使用ts编写，基于类），但对mongodb支持不好
 * 最后选择使用mongoose
 */

// express处理接口
// 验证数据：class-validator

const app = Express();

app.use(history());

app.use("/", Express.static("public/build"));
app.use("/upload", Express.static("public/upload"));

app.use(Express.json()); // 配置中间件，用于解析请求消息体中的json格式数据

// 使用postman进行测试
app.use("/api/movie", MovieRouter);

// 文件上传
app.use("/api/upload", UploadRouter);

app.listen(3000);
