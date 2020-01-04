import Express from "express";
import multer from "multer";
import path from "path";
import { ResponseHelper } from "./ResponseHelper";
const router = Express.Router();

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, "../../public/upload"),
  filename(req, file, cb) {
    // 文件名
    const time = new Date().getTime();
    // 后缀名
    const extname = path.extname(file.originalname);
    // 设置文件的全称
    cb(null, `${time}${extname}`);
  }
});

const allowedExtensions = [".JPG", ".jpg", ".png", ".gif", ".bmp", ".jiff"];

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 10 // 文件最多10M 
  },
  fileFilter(req, file, cb) {
    // 后缀名
    const extname = path.extname(file.originalname);
    if (allowedExtensions.includes(extname)) {
      cb(null, true);
    } else {
      cb(new Error("文件类型不正确"), false);
    }
  }
}).single("imgfile");

router.post("/", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      ResponseHelper.sendError(err.message, res);
    } else {
      const url = `/upload/${req.file.filename}`;
      ResponseHelper.sendData(url, res);
    }
  });
});

export default router;