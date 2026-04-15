import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './auth.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/auth.dtos';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
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
}
