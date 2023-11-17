import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
// AuthServiceAuthServrviceAuthSer
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
  it('can create an authservice instance', async () => {
    expect(service).toBeDefined();
  });
  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('a', 'a');

    const [salt, hash] = user.password.split('.');

    expect(salt).toBeDefined();
    expect(hash).toBeDefined();

    expect('a').not.toEqual(hash);
  });

  it('throws error if email is in use', (done) => {
    fakeUsersService.find = () =>
      Promise.resolve([{ id: 1, email: 'a', password: 'a' }]);

    service.signup('a', 'a').catch(() => {
      done();
    });
  });

  it('throws error if signin is called with an unused email', (done) => {
    service.signin('a', 'a').catch(() => {
      done();
    });
  });

  it('throws if invalid password is provided', (done) => {
    fakeUsersService.find = () =>
      Promise.resolve([{ id: 1, email: 'a', password: 'a' }]);
    service.signin('a', 'a').catch(() => {
      done();
    });
  }); 

  it('returns a user if password correct', async()=>{
    fakeUsersService.find = () =>
    Promise.resolve([{ id: 1, email: 'a', password: '4db9fda497015f77.2d475e234d11eb9f6d6b63a768fa0c468a8593803b374e4db6bb66a2abc88c7a' }]);

    const user = await service.signin('bsm4@gmail.com','123456'); 
    expect(user).toBeDefined()
     
    
  })
});
