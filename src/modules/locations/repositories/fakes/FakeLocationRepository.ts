import { uuid } from 'uuidv4';

import ICreateLocationDTO from '@modules/locations/dtos/ICreateLocationDTO';
import Location from '@modules/locations/infra/typeorm/entities/Location';

import ILocationRepository from '../ILocationRepository';

class FakeLocation implements ILocationRepository {
  private locations: Location[] = [];

  public async create({
    user_id,
    tenant_id,
    propertie_id,
    date_start,
    date_end,
  }: ICreateLocationDTO): Promise<Location> {
    const location = new Location();

    Object.assign(location, {
      id: uuid(),
      user_id,
      tenant_id,
      propertie_id,
      date_start,
      date_end,
    });

    this.locations.push(location);

    return location;
  }

  public async findLocationPropertie(
    propertie_id: string,
    user_id: string,
  ): Promise<Location | undefined> {
    const location = this.locations.find(
      loc => loc.propertie_id === propertie_id && loc.user_id === user_id,
    );
    return location || undefined;
  }
}

export default FakeLocation;
