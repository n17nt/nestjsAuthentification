import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly ProductRepo: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    let pro = this.ProductRepo.create(createProductDto);
    await this.ProductRepo.save(pro);
    return pro;
  }

  findAll() {
    return this.ProductRepo.find();
  }

  findOne(id: number) {
    return this.ProductRepo.findOneBy({ id });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    let prroduct = await this.findOne(id);
    if (!prroduct) throw new NotFoundException('Product was not found');
    prroduct = { ...prroduct, ...updateProductDto };
    await this.ProductRepo.save(prroduct);
    return prroduct;
  }

  async remove(id: number) {
    let product = await this.findOne(id);
    if (!product) throw new NotFoundException('Product was not found');
    await this.ProductRepo.delete(product);
    return product.id;
  }
}
