import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { RegisterDto } from './dto/auth.dtos';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { type Response, type Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() body: RegisterDto) {
    body.password = bcrypt.hashSync(body.password, 12);

    let usercheck = await this.authService.findByUsername(body.username);
    if (usercheck)
      throw new BadRequestException('Bunuaqa usernmae oldin bor edi');
    return this.authService.create(body);
  }
  @Post('login')
  async login(
    @Body() body: RegisterDto,
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log(req.cookies);

    let user = await this.authService.findByUsername(body.username);

    if (!user) throw new BadRequestException("Bunuaqa usernmae yo'q");
    let checkPass = bcrypt.compareSync(body.password, user.password);
    if (!checkPass) throw new BadRequestException('parol xato');
    let { accesToken, refreshToken } = await this.authService.tokenGenerate(
      user.id,
    );
    response.cookie('refresh', refreshToken, {
      maxAge: 7 * 24 * 3600 * 1000,
      httpOnly: process.env.NODE_ENV == 'PRO',
      secure: true,
      // sameSite: true,
    });

    return { user, accesToken };
  }
}
