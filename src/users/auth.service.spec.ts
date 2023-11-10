import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

describe('Auth Service', () => {
  let service: AuthService;
  beforeEach(async () => {
    const fakeUsersService: Partial<UsersService> = {
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

  it('create an auth service instance', async() => {
    expect(service).toBeDefined();
  });

  it('create a new user with a salted and hashed password', async()=>{
   const user = await service.signup('bsm@gmail.com', '12345');

   expect(user.password).not.toEqual('12345');

   const [salt, hash]=user.password.split('.');

   expect(salt).toBeDefined();
   expect(hash).toBeDefined();
  })
});
