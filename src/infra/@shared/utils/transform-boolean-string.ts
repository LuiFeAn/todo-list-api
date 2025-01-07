import { TransformFnParams } from 'class-transformer';
export function transformStringBooleanToBoolean({
  value,
}: TransformFnParams): boolean {
  if (value === 'true' || value === true) {
    return true;
  }
  if (value === 'false' || value === false) {
    return false;
  }
  return value;
}
