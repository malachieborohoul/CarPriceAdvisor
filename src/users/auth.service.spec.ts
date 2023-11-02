import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

it('can create an instance of auth service', async () => {
  const fakeUsersService = {
    create: (email: string, password: string) =>
      Promise.resolve({ id: 1, email, password }),

    find: ()=>Promise.resolve()
  };
});
