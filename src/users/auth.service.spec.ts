import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

describe('Auth Service', () => {
  let fakeUsersService: Partial<UsersService>;
  let service: AuthService;
  beforeEach(async() => {
    fakeUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password }),
    };

    const module =  await Test.createTestingModule({
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

  it('create an authservice instance', ()=>{
    expect(service).toBeDefined()
  })
});
