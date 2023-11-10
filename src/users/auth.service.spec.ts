import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

it('create an auth service instance', async () => {
  const fakeUsersService = {
    find: () => Promise.resolve([]),
    create: (email: string, password: string) =>
      Promise.resolve({ id: 1, email, password }),
  };

  const module = Test.createTestingModule({
    providers:[AuthService,{
      provide: UsersService,
      useValue: fakeUsersService
    }]
  })
});
