import { AuthService } from "./auth.service";
import { UsersService } from "./users.service"

fakeUsersService:UsersService;
service: AuthService;
describe('AuthService',()=>{
  fakeUsersService:{
    find:()=>Promise.resolve([])
    create:(email:string, password:string)=>Promise.resolve({id:1, })
  }
 
  
})