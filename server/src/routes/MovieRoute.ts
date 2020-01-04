import Express from "express";
import { MovieService } from "../services/MovieService";
import { ResponseHelper } from "./ResponseHelper";
const router = Express.Router();

/**
 * 地址栏参数的两种传法
 * params：
 * localhost:3000/api/movie/xxxxxx
 * 
 * query：
 * localhost:3000/api/movie?id=xxxxxx
 */

router.get("/:id", async (req, res) => {
  try {
    const movieid = req.params.id;
    const movie = await MovieService.findById(movieid);
    // 响应：服务器的接口的响应格式，往往是一种标准格式
    ResponseHelper.sendData(movie, res);
  } catch {
    ResponseHelper.sendData("id错误", res);
  }

});

router.get("/", async (req, res) => {
  console.log("query信息", req.query);
  const result = await MovieService.find(req.query);
  ResponseHelper.sendPageData(result, res);
});

router.post("/", async (req, res) => {
  console.log("body信息", req.body);
  const result = await MovieService.add(req.body);
  if (Array.isArray(result)) {
    ResponseHelper.sendError(result, res);
  } else {
    ResponseHelper.sendData(result, res);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const result = await MovieService.edit(req.params.id, req.body);
    if (result.length > 0) {
      ResponseHelper.sendError(result, res);
    } else {
      ResponseHelper.sendData("修改成功", res);
    }
  } catch {
    ResponseHelper.sendError("id错误", res);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await MovieService.delete(req.params.id);
    ResponseHelper.sendData("删除成功", res);
  } catch {
    ResponseHelper.sendError("id错误", res);
  }
});

export default router;