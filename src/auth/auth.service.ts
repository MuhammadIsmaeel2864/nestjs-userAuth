// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private prisma: PrismaClient
  ) { }

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email);
    console.log(user);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Compare passwords using bcrypt.compare
    const passwordMatch = await bcrypt.compare(pass, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload = { sub: user.id, username: user.email, role: user.role };
    console.log(payload);


    return { access_token: (await this.jwtService.signAsync(payload)), };
  }



}
