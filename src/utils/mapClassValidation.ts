import { ValidationError } from '@nestjs/common';

export default function mapClassValidatorErrors(error: ValidationError) {
  return Object.values(error.constraints).join(',');
}
