import { ValidationError } from '@nestjs/common';

export default function classValidatorValidation(errors: ValidationError[]) {
  return {
    errors: errors.map((error) => Object.values(error.constraints).join(',')),
    unionErrors: errors
      .map((error) => Object.values(error.constraints || {}))
      .join(','),
  };
}
