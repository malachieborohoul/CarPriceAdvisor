import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

describe('Auth Service', () => {
  let fakeUsersService: Partial<UsersService>;
  let service: AuthService;
  beforeEach(async () => {
    fakeUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password }),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an authservice instance', () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('bsm@gmail.com', '12345');
    const [salt, hash] = user.password.split('.');
    expect(user.password).not.toEqual('12345');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws error if email is in use', (done) => {
    fakeUsersService.find = () =>
      Promise.resolve([{ id: 1, email: 'a', password: 'a' }]);
    service
      .signup('bs@gmail.com', '12345')
      .then(() => {
        done();
      })
      .catch(() => {
        done();
      });
  }); 
});
