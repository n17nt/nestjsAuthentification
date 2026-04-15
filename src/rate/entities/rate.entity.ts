import { Max, Min } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity()
export class Rate extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  comment: string;
  @Column({ type: 'int' })
  @Max(5)
  @Min(1)
  rate: number;

  @JoinColumn()
  @ManyToOne(() => Product, (product) => product.rates)
  product: Product;
}
