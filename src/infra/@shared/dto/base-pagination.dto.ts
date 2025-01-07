import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { transformStringBooleanToBoolean } from '../utils/transform-boolean-string';

export class BasePaginationInputDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number = 25;

  @IsOptional()
  @IsBoolean()
  @Transform(transformStringBooleanToBoolean)
  all?: boolean = true;
}
