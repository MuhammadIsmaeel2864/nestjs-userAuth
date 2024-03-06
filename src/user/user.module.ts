import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaClient } from '@prisma/client';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/role.guard';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaClient, JwtAuthGuard,RolesGuard,
    Reflector],
  exports: [UserService],
})
export class UserModule { }
