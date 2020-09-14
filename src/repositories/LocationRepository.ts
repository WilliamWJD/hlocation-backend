import { Repository, EntityRepository } from 'typeorm';

import Location from '../models/Location';

@EntityRepository(Location)
class LocationRepository extends Repository<Location> {
  public async findLocationPropertie(
    propertie_id: string,
    user_id: string,
  ): Promise<Location | null> {
    const location = await this.findOne({ where: { propertie_id, user_id } });
    return location || null;
  }
}

export default LocationRepository;
