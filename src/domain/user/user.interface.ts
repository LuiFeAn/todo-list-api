import { IBaseEntityConstructorProps } from '../@shared/base.entity.interface';

export interface IUserConstructorProps extends IBaseEntityConstructorProps {
  name: string;
  email: string;
  password: string;
}
