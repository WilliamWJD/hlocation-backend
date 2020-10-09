import CreateUserServices from './CreateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let createUserServices: CreateUserServices;
let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserServices = new CreateUserServices(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('should be able to create a new user', async () => {
    const user = await createUserServices.execute({
      name: 'fulano',
      email: 'fulano@email.com.br',
      password: '123456',
    });
    expect('user').toHaveProperty(user.id);
  });
});
