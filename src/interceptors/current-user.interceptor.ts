import { CallHandler, ExecutionContext, NestInterceptor, NotFoundException } from "@nestjs/common";
import { Observable } from "rxjs";
import { UsersService } from "src/users/users.service";

export class CurrentUserInterceptor implements NestInterceptor{
    constructor(private usersService: UsersService){}
    async intercept(context: ExecutionContext, next: CallHandler<any>) {
        const request = context.switchToHttp().getRequest();
        const userId = request.session.userId;
        const user = await this.usersService.findOne(userId);
        if(!user){
            throw new NotFoundException("user not connected")
        }
        return next.handle();
    }

}