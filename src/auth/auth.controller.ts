import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { RegisterDto } from './dto/auth.dtos';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
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
  async login(@Body() body: RegisterDto) {
    let user = await this.authService.findByUsername(body.username);

    if (!user) throw new BadRequestException("Bunuaqa usernmae yo'q");
    let checkPass = bcrypt.compareSync(body.password, user.password);
    if (!checkPass) throw new BadRequestException('parol xato');

    let accesToken = await this.jwtService.sign({ id: user.id });
    return { user, accesToken };
  }
}
