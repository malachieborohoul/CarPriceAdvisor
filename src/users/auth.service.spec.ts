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

  it('create an authservice instance', () => {
    expect(service).toBeDefined();
  });

  it('create a user with salted and hashed password', async () => {
    const user = await service.signup('mal@gmail.com', '12345');

    expect(user.password).not.toEqual('12345');

    const [salt, hash] = user.password.split('.');

    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });
// DO
  it('throws an error if users signs up with email in use', async (done) => {
    fakeUsersService.find = () =>
      Promise.resolve([{ id: 1, email: 'bsm@gmail.com', password: '12345' }]);
    try {
      const user = await service.signup('bsm@gmail.com', '12345');
      expect(user).toBe({});
    } catch (err) {
      done();
    }
  });

  it('throws if signin is called with an unused email', async (done) => {
    try {
      await service.signin('bsl@gmail.com', '12345');
    } catch (error) {
      done();
    }
  });
  it('throws if an invalid password is provided', async(done)=>{
    fakeUsersService.find=()=>Promise.resolve([{id:1,email: "ddkdk@d.com", password: "djdjd"}]);
    service.signin('dddjj@ddj.com',  "ZZZZ")
    try {
      
    } catch (error) {
      
    }
  })
});
