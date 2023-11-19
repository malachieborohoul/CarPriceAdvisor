import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
let fakeUsersService: Partial<UsersService>;
let service: AuthService;

// AuthSe
describe('AuthService', () => {
  beforeEach(async () => {
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
  fakeUsersService = {
    find: () => Promise.resolve([]),
    create: (email: string, password: string) =>
      Promise.resolve({ id: 1, email, password }),
  };

  it('can create an authservice instance', () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async()=>{
    const user = await fakeUsersService.create('a', 'a');

    const [salt, hash] = user.password.split('.'); 
    expect(user.password).not.toEqual('a') 
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  })
// 
  it('throws error if email is in use',()=>{

  })
});
 