import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class RolesService {

  constructor(private prisma: PrismaClient) { }

  async create(createRoleDto: CreateRoleDto) {
    return await this.prisma.roles.create({
      data: createRoleDto
    })
  }

  async findAll() {
    const result = await this.prisma.roles.findMany();
    if (!result || result.length == 0) {
      return "Record Not Found";
    }
    return result
  }


  async findOne(id: number) {
    try {
      const result = await this.prisma.roles.findUnique({
        where: {
          id
        }

      });
      if (!result) {
        return "Role Not Found"
      }
      return result;
    } catch (error) {
      throw error
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      return await this.prisma.roles.update({
        where: { id }, data: updateRoleDto
      })
    } catch (error) {

      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        const errorMessage = "Record Not Found"
        throw new HttpException(errorMessage, HttpStatus.NOT_FOUND)
      }
    };
  }

  async remove(id: number) {
    try {
      return await this.prisma.roles.delete({
        where: { id }
      })

    } catch (error) {

      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        const errorMessage = "Record Nor Found"
        throw new HttpException(errorMessage, HttpStatus.NOT_FOUND)
      }
      throw error
    };
  }
}
