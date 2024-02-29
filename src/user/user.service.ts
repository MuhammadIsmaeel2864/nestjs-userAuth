import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient, Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';




@Injectable()

export class UserService {
  validateUser(email: string, password: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private prisma: PrismaClient) { }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    try {
      return await this.prisma.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          password: hashedPassword
        }
      });

    } catch (error) {
      // Check if the error is a unique constraint violation
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        // Handle the unique constraint violation error
        const errorMessage = 'Email already exists.';
        throw new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
      }

    }
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map(function (user) {
      const userWithoutPassword = (({ password, ...rest }) => rest)(user)
      return userWithoutPassword;
    })

  }

  async findOne(email: string) {
    const result = await this.prisma.user.findUnique({
      where: {
        email,
      }
    });
    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    try {
      return await this.prisma.user.update({
        where: {
          id

        }, data: updateUserDto

      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        const errorMessage = 'Record Not Found';
        throw new HttpException(errorMessage, HttpStatus.NOT_FOUND);
      } else {
        throw error;
      }

    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.user.delete({
        where: { id }
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        const errorMessage = 'Record Not Found';
        throw new HttpException(errorMessage, HttpStatus.NOT_FOUND);
      } else {
        throw error;
      }
    }
  }


  async findbyId(id: number) {
    try {

      const user = await this.prisma.user.findFirst({
        where: {
          id
        },
      });

      if (!user) {
        return "user not found"
      }
      return user;



    } catch (error) {
      throw error
    }
  }





}
