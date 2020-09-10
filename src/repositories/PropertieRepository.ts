import { EntityRepository, Repository } from 'typeorm';

import Propertie from '../models/Propertie';

@EntityRepository(Propertie)
class PropertieRepository extends Repository<Propertie> {
  public async getByTitle(
    title: string,
    user_id: string,
  ): Promise<Propertie | null> {
    const getPropertie = await this.findOne({
      where: { title, user_id },
    });

    return getPropertie || null;
  }
}

export default PropertieRepository;
