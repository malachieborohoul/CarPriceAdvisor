import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

it('create an instance of Auth Service', async()=>{
  const fakeUsersService = {
    create : (email:string, password: string)=>Promise.resolve({id:1, email, password}),
    find: (email:string)=>Promise.resolve([])
  }

  const module = await Test.createTestingModule({
    providers:[
      AuthService,{
        provide: UsersService,
        useValue: fakeUsersService
      }
    ]
  }).compile();

  const service = module.get(AuthService);

  expect(service).toBeDefined()
})