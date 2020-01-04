import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";

export abstract class BaseEntity {
  /**
   * 将一个平面对象转换为Movie类的对象
   * @param plainObject 平面对象
   */
  protected static baseTransform<T>(cls: ClassType<T>, plainObject: object): T {
    if (plainObject instanceof cls) {
      return plainObject;
    }
    return plainToClass(cls, plainObject);
  }

  /**
   * 验证当前电影对象
   * @param skipMissing 
   */
  public async validateThis(skipMissing = false): Promise<string[]> {
    const errors = await validate(this, {
      skipMissingProperties: skipMissing
    });
    const temp = errors.map(ele => Object.values(ele.constraints));
    const result: string[] = [];
    temp.forEach(t => {
      result.push(...t);
    });
    return result;
  }
}