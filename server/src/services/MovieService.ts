import { Movie } from "../entities/Movie";
import { IMovie } from "../db/MovieSchema";
import { MovieModel } from "../db";
import { SearchCondition } from "../entities/SearchCondition";
import { ISearchResult } from "../entities/CommonTypes";

export class MovieService {
  public static async add(movie: Movie): Promise<IMovie | string[]> {
    // 1.转换类型
    movie = Movie.transform(movie);
    // 2.数据验证
    const errors = await movie.validateThis();
    if (errors.length > 0) {
      return errors;
    }
    // 3.添加到数据库
    const result = await MovieModel.create(movie);
    return result;
  }

  /**
   * 修改电影的信息，这里做了一个处理，数据验证使用转换过后的对象，
   * 而传入数据库的仍是之前的平面对象，防止类中默认值覆盖情况。
   * @param id 电影id
   * @param movie 电影对象
   */
  public static async edit(id: string, movie: Movie): Promise<string[]> {
    // 1.转换类型
    const movieObj = Movie.transform(movie);
    // 2.数据验证
    const errors = await movieObj.validateThis(true);
    if (errors.length > 0) {
      return errors;
    }
    // 3.修改数据库
    await MovieModel.updateOne({ _id: id }, movie);
    return [];
  }

  public static async delete(id: string): Promise<void> {
    await MovieModel.deleteOne({ _id: id });
  }

  public static async findById(id: string): Promise<IMovie | null> {
    return await MovieModel.findById(id);
  }

  /**
   * 查询电影
   * @param condition {page、limit、key}
   */
  public static async find(condition: SearchCondition): Promise<ISearchResult<IMovie>> {
    // 1.转换类型
    const conObj = SearchCondition.transform(condition);
    // 2.数据验证
    const errors = await conObj.validateThis(true);
    if (errors.length > 0) {
      return {
        count: 0,
        data: [],
        errors
      };
    }
    // 3.如果没有错误，进行查询
    const movies = await MovieModel.find({
      name: { $regex: new RegExp(conObj.key) }
    }).skip((conObj.page - 1) * conObj.limit).limit(conObj.limit);

    const count = await MovieModel.find({
      name: { $regex: new RegExp(conObj.key) }
    }).countDocuments();
    return {
      count,
      data: movies,
      errors: []
    };
  }
}