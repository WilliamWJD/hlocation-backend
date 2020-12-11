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

  public async findPropertiesByUser(
    user_id: string,
  ): Promise<Propertie[] | undefined> {
    const propertiesByUser = this.properties.filter(
      properties => properties.user_id === user_id,
    );

    return propertiesByUser;
  }

  public async delete(id: string, user_id: string): Promise<void> {
    const propertieIndex = this.properties.findIndex(
      propertie => propertie.id === id && propertie.user_id === user_id,
    );

    this.properties.splice(propertieIndex, 1);
  }

  public async update(propertie: Propertie): Promise<Propertie> {
    const propertieIndex = this.properties.findIndex(
      propert =>
        propertie.id === propert.id && propertie.user_id === propert.user_id,
    );

    this.properties[propertieIndex] = propertie;

    return propertie;
  }
}

export default FakePropertieRepository;
