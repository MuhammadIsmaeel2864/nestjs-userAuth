import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsStrongPassword } from "class-validator"

export class CreateUserDto {

    
    @ApiProperty()
    name:string

    id: number

    @IsEmail()
    @ApiProperty({ required: true })          
    email:string

    
    @ApiProperty({ required: true })    
    password:string

    @ApiProperty()
    roleId:number;
}
