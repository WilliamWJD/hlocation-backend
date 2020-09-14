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

  public async findById(
    propertie_id: string,
    user_id: string,
  ): Promise<Propertie | null> {
    const propertie = await this.findOne(propertie_id, user_id);
    return propertie || null;
  }
}

export default PropertieRepository;
