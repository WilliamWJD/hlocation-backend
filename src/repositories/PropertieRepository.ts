import { EntityRepository, Repository } from 'typeorm';

import Propertie from '../models/Propertie';

@EntityRepository(Propertie)
class PropertieRepository extends Repository<Propertie> {
  public async getUserPropertie(): Promise<void> {
    return null;
  }
}

export default PropertieRepository;
