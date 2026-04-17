import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './auth.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/auth.dtos';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(registerDto: RegisterDto) {
    let pro = this.userRepo.create(registerDto);
    await this.userRepo.save(pro);
    let { password, ...userdata } = pro;
    return userdata;
  }
  findByUsername(username: string) {
    return this.userRepo.findOneBy({ username });
  }

  async tokenGenerate(userId: number) {
    let payload = { id: userId };
    let accesToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCCES_KEY,
      expiresIn: '15m',
    });

    let refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_KEY,
      expiresIn: '7d',
    });
    return {
      accesToken,
      refreshToken,
    };
  }
}
