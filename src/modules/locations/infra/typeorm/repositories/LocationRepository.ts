import { Repository, getRepository } from 'typeorm';

import ICreateLocationDTO from '@modules/locations/dtos/ICreateLocationDTO';
import ILocationRepository from '@modules/locations/repositories/ILocationRepository';
import Location from '../entities/Location';

class LocationRepository implements ILocationRepository {
  private ormRepository: Repository<Location>;

  constructor() {
    this.ormRepository = getRepository(Location);
  }

  public async findLocationPropertie(
    propertie_id: string,
    user_id: string,
  ): Promise<Location | undefined> {
    const location = await this.ormRepository.findOne({
      where: { propertie_id, user_id },
    });
    return location || undefined;
  }

  public async create(data: ICreateLocationDTO): Promise<Location> {
    const location = this.ormRepository.create(data);
    await this.ormRepository.save(location);
    return location;
  }
}

export default LocationRepository;
