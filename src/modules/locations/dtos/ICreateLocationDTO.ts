import User from '@modules/users/infra/typeorm/entities/User';
import Tenent from '@modules/tenents/infra/typeorm/entities/Tenents';
import Propertie from '@modules/properties/infra/typeorm/entities/Propertie';

export default interface ICreateLocationDTO {
  user: User;
  tenent: Tenent;
  propertie: Propertie;
  date_start: Date;
  date_end: Date;
}
