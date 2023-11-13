import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    fakeUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password }),
    };

    const module = Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    });
  });
});
