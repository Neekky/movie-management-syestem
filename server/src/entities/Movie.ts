import { IsNotEmpty, ArrayMinSize, IsInt, Min, Max, IsArray, validate } from "class-validator";
import { Type, plainToClass } from "class-transformer";
import "reflect-metadata";
import { BaseEntity } from "./BaseEntity";

export class Movie extends BaseEntity {
  /**
   * 将一个平面对象转换为Movie类的对象
   * @param plainObject 平面对象
   */
  public static transform(plainObject: object): Movie {
    return super.baseTransform(Movie, plainObject);
  }

  @IsNotEmpty({ message: "电影名称不可以为空" })
  @Type(() => String)
  public name: string;

  @IsNotEmpty({ message: "电影类型不可以为空" })
  @ArrayMinSize(1, { message: "电影类型至少一个" })
  @IsArray({ message: "电影类型必须是数组" })
  @Type(() => String)
  public types: string[];

  @IsNotEmpty({ message: "上映地区不可以为空" })
  @ArrayMinSize(1, { message: "上映地区至少一个" })
  @IsArray({ message: "上映地区必须是数组" })
  @Type(() => String)
  public areas: string[];

  @IsNotEmpty({ message: "时长不可以为空" })
  @IsInt({ message: "时长必须是整数" })
  @Min(1, { message: "时长最小1分钟" })
  @Max(99999, { message: "时长过长" })
  @Type(() => Number)
  public filmLength: number;

  @IsNotEmpty({ message: "是否热映不可为空" })
  @Type(() => Boolean)
  public isHot: boolean = false;

  @IsNotEmpty({ message: "是否即将上映不可为空" })
  @Type(() => Boolean)
  public isComing: boolean = false;

  @IsNotEmpty({ message: "是否为经典影片不可为空" })
  @Type(() => Boolean)
  public isClassics: boolean = false;

  @Type(() => String)
  public description?: string;

  @Type(() => String)
  public poster?: string;
}