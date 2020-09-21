import bcrypt from 'bcryptjs';

import IHashProvider from '../models/IHashProvider';

class BCryptHashProvider implements IHashProvider {
  public async genereteHash(payload: string): Promise<string> {
    const hash = await bcrypt.hash(payload, 8);
    return hash;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(payload, hashed);
  }
}

export default BCryptHashProvider;
