import ICreateTenentDTO from '@modules/tenents/dtos/ICreateTenentDTO';
import Tenent from '@modules/tenents/infra/typeorm/entities/Tenents';
import { uuid } from 'uuidv4';
import ITenentRepository from '../ITenentRepository';

class FakeTenentRepository implements ITenentRepository {
  private tenants: Tenent[] = [];

  public async findByCpf(
    cpf: string,
    user_id: string,
  ): Promise<Tenent | undefined> {
    const tenent = this.tenants.find(
      item => item.cpf === cpf && item.user_id === user_id,
    );
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
      item => item.rg === rg && item.user_id === user_id,
    );
    return tenent || undefined;
  }

  public async findById(
    id: string,
    user_id: string,
  ): Promise<Tenent | undefined> {
    const tenent = this.tenants.find(
      item => item.id === id && item.user_id === user_id,
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

  public async findAll(user_id: string): Promise<Tenent[] | undefined> {
    const tenantsByUser = this.tenants.filter(
      tenant => tenant.user_id === user_id,
    );
    return tenantsByUser || undefined;
  }

  public async delete(tenant_id: string, user_id: string): Promise<Tenent> {
    const tenantIndex = this.tenants.findIndex(
      tenant => tenant.id === tenant_id && tenant.user_id === user_id,
    );
    this.tenants.splice(tenantIndex, 1);
    return this.tenants[tenantIndex];
  }
}

export default FakeTenentRepository;
