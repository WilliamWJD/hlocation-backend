import { Repository, EntityRepository } from 'typeorm';

import Tenent from '../models/Tenents';

@EntityRepository(Tenent)
class TenentRepository extends Repository<Tenent> {
  public async findByCpf(cpf: string): Promise<Tenent | null> {
    const tenent = await this.findOne({
      where: { cpf },
    });

    return tenent || null;
  }

  public async findByRg(rg: string): Promise<Tenent | null> {
    const tenent = await this.findOne({
      where: { rg },
    });

    return tenent || null;
  }

  public async findByEmail(email: string): Promise<Tenent | null> {
    const tenent = await this.findOne({
      where: { email },
    });

    return tenent || null;
  }
}

export default TenentRepository;
