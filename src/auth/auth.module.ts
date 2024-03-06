import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { jwtConstants } from './constants';
import { RolesGuard } from './role.guard';

@Module({
  imports:[
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    UserModule],
  controllers: [AuthController],
  providers: [AuthService,PrismaClient,RolesGuard],
  exports:[AuthService]
})
export class AuthModule {}
