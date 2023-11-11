import { UsersService } from './users.service';

describe('Auth Service', () => {
  let fakeUsersService: Partial<UsersService>;
  beforeEach(() => {
    fakeUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password }),
    };
  });
});
