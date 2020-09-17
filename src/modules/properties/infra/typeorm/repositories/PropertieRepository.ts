import { Repository, getRepository } from 'typeorm';

import IPropertiesRepository from '@modules/properties/repositories/IPropertiesRepository';

import ICreatePropertieDTO from '@modules/properties/dtos/ICreatePropertieDTO';
import Propertie from '../entities/Propertie';

class PropertieRepository implements IPropertiesRepository {
  private ormRepository: Repository<Propertie>;

  constructor() {
    this.ormRepository = getRepository(Propertie);
  }

  public async getByTitle(
    title: string,
    user_id: string,
  ): Promise<Propertie | null> {
    const propertie = await this.ormRepository.findOne({
      where: { title, user_id },
    });

    return propertie || null;
  }

  public async findById(
    propertie_id: string,
    user_id: string,
  ): Promise<Propertie | undefined> {
    const propertie = await this.ormRepository.findOne({
      where: { id: propertie_id, user_id },
    });
    return propertie || undefined;
  }

  public async create(data: ICreatePropertieDTO): Promise<Propertie> {
    const propertie = this.ormRepository.create(data);
    await this.ormRepository.save(propertie);
    return propertie;
  }
}

export default PropertieRepository;
