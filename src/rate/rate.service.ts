import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRateDto } from './dto/create-rate.dto';
import { UpdateRateDto } from './dto/update-rate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rate } from './entities/rate.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class RateService {
  constructor(
    @InjectRepository(Rate) private readonly rateRepo: Repository<Rate>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}
  async create(createRateDto: CreateRateDto) {
    let rate = this.rateRepo.create(createRateDto);
    if (createRateDto.productId) {
      let product = await this.productRepo.findOneBy({
        id: createRateDto.productId,
      });
      if (!product) throw new NotFoundException('Topilmadi');
      rate.product = product;
    }
    return this.rateRepo.save(rate);
  }
  findAll() {
    return `This action returns all rate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rate`;
  }

  update(id: number, updateRateDto: UpdateRateDto) {
    return `This action updates a #${id} rate`;
  }

  remove(id: number) {
    return `This action removes a #${id} rate`;
  }
}
