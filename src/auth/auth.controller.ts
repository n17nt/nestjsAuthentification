import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RegisterDto } from './dto/auth.dtos';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { type Response, type Request } from 'express';
import { AuthGuard } from './auth.guard';
import { RedisService } from 'src/redis/redis.service';
import { Role } from './role.enum';
import { RolesGuard } from './role.guard';
import { Roles } from './role.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly redis: RedisService,
  ) {}
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

    this.redis.setKey(user.id, user);
    response.cookie('refresh', refreshToken, {
      maxAge: 7 * 24 * 3600 * 1000,
      httpOnly: process.env.NODE_ENV == 'PRO',
      secure: true,
      // sameSite: true,
    });

    return { user, accesToken };
  }
  @Post('logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    console.log(req.body);
    res.clearCookie('refresh');
    return {};
  }
  @UseGuards(AuthGuard)
  @Get('me')
  getMe(@Req() req: Request) {
    let userId: number = req['user'].role;

    console.log(userId);

    return req['user'];
  }
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('user')
  getUser(@Req() req: Request) {
    let userId: number = req['user'].role;

    console.log(userId);

    return req['user'];
  }
}
