import ICreateLocationDTO from '../dtos/ICreateLocationDTO';
import Location from '../infra/typeorm/entities/Location';

export default interface ILocationRepository {
  create(data: ICreateLocationDTO): Promise<Location>;
  findLocationPropertie(
    propertie_id: string,
    user_id: string,
  ): Promise<Location | undefined>;
}
