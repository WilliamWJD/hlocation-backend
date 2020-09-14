import { getRepository, getCustomRepository } from 'typeorm';

import Location from '../models/Location';
import User from '../models/User';
import Tenent from '../models/Tenents';
import Propertie from '../models/Propertie';

interface Request {
  user_id: string;
  tenent_id: string;
  propertie_id: string;
  date_start: Date;
  date_end: Date;
}

class CreateLocationService {
  public async execute({
    user_id,
    tenent_id,
    propertie_id,
    date_start,
    date_end,
  }: Request): Promise<Location> {
    return null;
  }
}

export default CreateLocationService;
