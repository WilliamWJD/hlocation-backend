import Propertie from '../infra/typeorm/entities/Propertie';
import ICreatePropertieDTO from '../dtos/ICreatePropertieDTO';

export default interface IPropertiesRepository {
  getByTitle(title: string, user_id: string): Promise<Propertie | undefined>;
  findById(
    propertie_id: string,
    user_id: string,
  ): Promise<Propertie | undefined>;
  create(data: ICreatePropertieDTO): Promise<Propertie>;
}
