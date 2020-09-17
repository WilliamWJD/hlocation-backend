import ICreateLocationDTO from '../dtos/ICreateLocationDTO';
import Location from '../infra/typeorm/entities/Location';

export default interface ILocationRepository {
  findLocationPropertie(
    propertie_id: string,
    user_id: string,
  ): Promise<Location | undefined>;
  create(data: ICreateLocationDTO): Promise<Location | undefined>;
}
