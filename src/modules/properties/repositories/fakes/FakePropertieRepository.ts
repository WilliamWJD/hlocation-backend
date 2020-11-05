import ICreatePropertieDTO from '@modules/properties/dtos/ICreatePropertieDTO';
import Propertie from '@modules/properties/infra/typeorm/entities/Propertie';
import { uuid } from 'uuidv4';
import IPropertiesRepository from '../IPropertiesRepository';

class FakePropertieRepository implements IPropertiesRepository {
  private properties: Propertie[] = [];

  public async create({
    description,
    number,
    rent_money,
    title,
    user_id,
  }: ICreatePropertieDTO): Promise<Propertie> {
    const propertie = new Propertie();

    Object.assign(propertie, {
      id: uuid(),
      title,
      description,
      number,
      rent_money,
      user_id,
    });

    this.properties.push(propertie);
    return propertie;
  }

  public async findById(
    id: string,
    user_id: string,
  ): Promise<Propertie | undefined> {
    const propertie = this.properties.find(
      prop => prop.id === id && prop.user_id === user_id,
    );
    return propertie;
  }

  public async getByTitle(
    title: string,
    user_id: string,
  ): Promise<Propertie | undefined> {
    const propertie = this.properties.find(
      prop => prop.title === title && prop.user_id === user_id,
    );
    return propertie || undefined;
  }
}

export default FakePropertieRepository;