import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {

    roleId:number;

    @ApiProperty()
    role:string
}
