import ICreateTenentDTO from '@modules/tenents/dtos/ICreateTenentDTO';
import Tenent from '@modules/tenents/infra/typeorm/entities/Tenents';
import { uuid } from 'uuidv4';
import ITenentRepository from '../ITenentRepository';

class FakeTenentRepository implements ITenentRepository {
  private tenants: Tenent[] = [];

  public async findByCpf(cpf: string): Promise<Tenent | undefined> {
    const tenent = this.tenants.find(item => item.cpf === cpf);
    return tenent || undefined;
  }

  public async findByEmail(email: string): Promise<Tenent | undefined> {
    const tenent = this.tenants.find(item => item.email === email);
    return tenent || undefined;
  }

  public async findByRg(
    rg: string,
    user_id: string,
  ): Promise<Tenent | undefined> {
    const tenent = this.tenants.find(
      item => item.rg === rg || item.user_id === user_id,
    );
    return tenent || undefined;
  }

  public async findById(
    id: string,
    user_id: string,
  ): Promise<Tenent | undefined> {
    const tenent = this.tenants.find(
      item => item.id === id || item.user_id === user_id,
    );
    return tenent || undefined;
  }

  public async create({
    user_id,
    cpf,
    email,
    genre,
    marital_status,
    name,
    phone1,
    phone2,
    profession,
    rg,
  }: ICreateTenentDTO): Promise<Tenent> {
    const tenent = new Tenent();
    Object.assign(tenent, {
      id: uuid(),
      user_id,
      cpf,
      email,
      genre,
      marital_status,
      name,
      phone1,
      phone2,
      profession,
      rg,
    });

    this.tenants.push(tenent);
    return tenent;
  }

  public async save(tenent: Tenent): Promise<Tenent> {
    const findIndex = this.tenants.findIndex(
      findTenent => findTenent.id === tenent.id,
    );
    this.tenants[findIndex] = tenent;
    return tenent;
  }
}

export default FakeTenentRepository;
