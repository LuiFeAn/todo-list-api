import { validateSync } from 'class-validator';
import classValidatorValidation from './classValidatorValidation';
import { EntityErrors } from '@domain/@shared/errors/entity-validation/entity-errors.error';

export const entityValidator = (entity: object) => {
  const validation = classValidatorValidation(validateSync(entity));

  if (validation.errors.length > 0) {
    throw new EntityErrors({
      context: 'UserDomain',
      ...validation,
    });
  }
};
