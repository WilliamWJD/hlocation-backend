import ITenentRepository from '@modules/tenents/repositories/ITenentRepository';
import { Repository, getRepository } from 'typeorm';

import ICreateTenentDTO from '@modules/tenents/dtos/ICreateTenentDTO';

import Tenent from '../entities/Tenents';

class TenentRepository implements ITenentRepository {
  private ormRepository: Repository<Tenent>;

  constructor() {
    this.ormRepository = getRepository(Tenent);
  }

  public async findAll(user_id: string): Promise<Tenent[] | undefined> {
    const tenants = await this.ormRepository.find({ where: { user_id } });
    return tenants;
  }

  public async findByCpf(
    cpf: string,
    user_id: string,
  ): Promise<Tenent | undefined> {
    const tenent = await this.ormRepository.findOne({
      where: { cpf, user_id },
    });

    return tenent || undefined;
  }

  public async findByRg(
    rg: string,
    user_id: string,
  ): Promise<Tenent | undefined> {
    const tenent = await this.ormRepository.findOne({
      where: { rg, user_id },
    });

    return tenent || undefined;
  }

  public async findByEmail(
    email: string,
    user_id: string,
  ): Promise<Tenent | undefined> {
    const tenent = await this.ormRepository.findOne({
      where: { email, user_id },
    });

    return tenent || undefined;
  }

  public async findById(
    id: string,
    user_id: string,
  ): Promise<Tenent | undefined> {
    const tenent = await this.ormRepository.findOne({
      where: {
        id,
        user_id,
      },
    });
    return tenent;
  }

  public async create(data: ICreateTenentDTO): Promise<Tenent> {
    const tenent = this.ormRepository.create(data);
    await this.ormRepository.save(tenent);
    return tenent;
  }

  public async save(data: ICreateTenentDTO): Promise<Tenent> {
    const tenent = await this.ormRepository.save(data);
    return tenent;
  }

  public async delete(tenant_id: string, user_id: string): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .delete()
      .from(Tenent)
      .where(`id=:id and user_id=:user_id`, { id: tenant_id, user_id })
      .execute();
  }
}

export default TenentRepository;
