import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './signin-dto';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from './auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userservice: UserService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() signindto: SigninDto) {
    const user = await this.authService.signIn(signindto.email, signindto.password);
    console.log(user);
    return user;

  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
