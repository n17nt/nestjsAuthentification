import { Injectable } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}
  getAll() {
    return this.categoryRepo.find();
  }
  async create(createProductDto: any) {
    let pro = this.categoryRepo.create(createProductDto);
    await this.categoryRepo.save(pro);
    return pro;
  }
}
