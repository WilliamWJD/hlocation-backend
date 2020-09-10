import { getRepository } from 'typeorm';
import Propertie from '../models/Propertie';

interface Request {
  title: string;
  description: string;
  number: number;
  rent_money: number;
  user_id: string;
}

class CreatePropertieService {
  public async execute({
    title,
    description,
    number,
    rent_money,
    user_id,
  }: Request): Promise<Propertie> {
    return null;
  }
}

export default CreatePropertieService;
