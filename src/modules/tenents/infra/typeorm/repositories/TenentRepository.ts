import ITenentRepository from '@modules/tenents/repositories/ITenentRepository';
import { Repository, getRepository } from 'typeorm';

import ICreateTenentDTO from '@modules/tenents/dtos/ICreateTenentDTO';

import Tenent from '../entities/Tenents';

class TenentRepository implements ITenentRepository {
  private ormRepository: Repository<Tenent>;

  constructor() {
    this.ormRepository = getRepository(Tenent);
  }

  public async findByCpf(cpf: string): Promise<Tenent | undefined> {
    const tenent = await this.ormRepository.findOne({
      where: { cpf },
    });

    return tenent || undefined;
  }

  public async findByRg(rg: string): Promise<Tenent | undefined> {
    const tenent = await this.ormRepository.findOne({
      where: { rg },
    });

    return tenent || undefined;
  }

  public async findByEmail(email: string): Promise<Tenent | undefined> {
    const tenent = await this.ormRepository.findOne({
      where: { email },
    });

    return tenent || undefined;
  }

  public async findById(id: string): Promise<Tenent | undefined> {
    const tenent = await this.ormRepository.findOne(id);
    return tenent;
  }

  public async create(data: ICreateTenentDTO): Promise<Tenent> {
    const tenent = this.ormRepository.create(data);
    await this.ormRepository.save(tenent);
    return tenent;
  }
}

export default TenentRepository;