import { IsOptional } from "class-validator";

export class UserDto{
    @IsOptional()
    id: number;
    @IsOptional()
    email: string;
}