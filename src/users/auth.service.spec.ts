import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

// 
describe('AuthService', () => {
  let fakeUsersService: Partial<UsersService>;
  let service: AuthService;

  beforeEach(async () => {
    fakeUsersService: {
      find: () => Promise.resolve([]);
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password });
    }

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
  it('can create an authservice instance', async () => {
    expect(service).toBeDefined();
  });
  it('creates a new user with a salted and hashed password', async() => {
    fakeUsersService.find = ()=>Promise.resolve([{id:1,email:'a', password:'a'}])
    const [user] = await fakeUsersService.find('m')

    const [salt, hash] = user.password.split('.');

    expect(salt).toBeDefined();
    expect(hash).toBeDefined();

    expect('a').not.toEqual(hash)
  });
});
