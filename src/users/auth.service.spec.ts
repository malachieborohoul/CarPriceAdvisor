import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
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

  it('create a new user with a salted and hashed user', async() => {
    const user = await service.signup('bsm', '12345');

    const [salt, hash]= user.password.split('.');

    expect('12345').not.toEqual(user.password);
    expect(salt).toBeDefined();

    expect(hash).toBeDefined()
  });
});
