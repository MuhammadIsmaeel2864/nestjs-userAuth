import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UnauthorizedException, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { ParseIntPipe } from '@nestjs/common';

@ApiTags('Users') // Specify tag for Swagger
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('email')
  async findOne(@Query('email') email: string, password: string) {
    try {
      const user = await this.userService.findOne(email);
      if (!user) {
        return { message: 'User not found' }; // Or return appropriate HTTP status code
      }
      return user;
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw error;
    }
  }

  @Get(':id')
  async findbyId(@Param('id', ParseIntPipe) id: string) {
    return this.userService.findbyId(+id);
  }



  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.userService.remove(+id);
  }
}
