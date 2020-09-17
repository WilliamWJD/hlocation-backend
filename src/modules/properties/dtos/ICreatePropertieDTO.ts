import User from '@modules/users/infra/typeorm/entities/User';

export default interface ICreatePropertieDTO {
  title: string;
  description: string;
  number: number;
  rent_money: number;
  user: User;
}
