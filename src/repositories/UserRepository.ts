import { Repository, EntityRepository } from 'typeorm';

import User from '../models/User';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async findById(user_id: string): Promise<User | null> {
    const user = await this.findOne(user_id);
    return user || null;
  }
}

export default UserRepository;
