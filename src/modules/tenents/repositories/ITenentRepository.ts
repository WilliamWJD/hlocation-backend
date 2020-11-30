import Tenent from '../infra/typeorm/entities/Tenents';
import ICreateTenentDTO from '../dtos/ICreateTenentDTO';

export default interface ITenentRepository {
  findByCpf(cpf: string, user_id: string): Promise<Tenent | undefined>;
  findByRg(rg: string, user_id: string): Promise<Tenent | undefined>;
  findByEmail(email: string, user_id: string): Promise<Tenent | undefined>;
  findById(id: string, user_id: string): Promise<Tenent | undefined>;
  create(data: ICreateTenentDTO): Promise<Tenent>;
  save(data: Tenent): Promise<Tenent>;
  findAll(user_id: string): Promise<Tenent[] | undefined>;
  delete(tenant_id: string, user_id: string): Promise<void>;
}
