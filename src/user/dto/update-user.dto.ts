import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Role } from 'role.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {

}
