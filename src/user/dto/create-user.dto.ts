import { ApiProperty } from "@nestjs/swagger"
import { Role } from "@prisma/client"
import { IsEmail, IsEnum } from "class-validator"


export class CreateUserDto {


    @ApiProperty()
    name: string

    id: number

    @IsEmail()
    @ApiProperty({ required: true })
    email: string


    @ApiProperty({ required: true })
    password: string


    @ApiProperty()
    @IsEnum(Role)
    role: Role;


}
