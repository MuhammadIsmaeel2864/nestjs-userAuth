import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Logger, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ParseIntPipe } from '@nestjs/common';
import { Roles } from 'src/auth/role.decorator';
import { RolesGuard } from 'src/auth/role.guard';
import { Role } from '@prisma/client';

@ApiTags('Users') // Specify tag for Swagger
@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name)
  constructor(private readonly userService: UserService) { }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Roles(Role.USER,Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
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

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @ApiBearerAuth()
  @Get(':id')
  async findbyId(@Param('id', ParseIntPipe) id: string) {
    this.logger.debug(`Getting User By Id Initiated`)
    return this.userService.findbyId(+id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.userService.remove(+id);
  }
}
