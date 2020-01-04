import Mongoose from "mongoose";
import { Movie } from "../entities/Movie";

export interface IMovie extends Movie, Mongoose.Document { }

// 单独安装声明文件，泛型里的接口是编写代码时推断的类型
// 对象内部里的类型定义是运行过程中属性的类型
const movieSchema = new Mongoose.Schema<IMovie>({
  areas: [String],
  filmLength: Number,
  isClassics: Boolean,
  isComing: Boolean,
  isHot: Boolean,
  name: String,
  types: [String],
  description: String,
  poster: String
}, {
  versionKey: false,
});

export default Mongoose.model<IMovie>("Movie", movieSchema);
