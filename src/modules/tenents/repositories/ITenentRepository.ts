import Tenent from '../infra/typeorm/entities/Tenents';
import ICreateTenentDTO from '../dtos/ICreateTenentDTO';

export default interface ITenentRepository {
  findByCpf(cpf: string): Promise<Tenent | undefined>;
  findByRg(rg: string): Promise<Tenent | undefined>;
  findByEmail(email: string): Promise<Tenent | undefined>;
  findById(id: string): Promise<Tenent | undefined>;
  create(data: ICreateTenentDTO): Promise<Tenent>;
}
