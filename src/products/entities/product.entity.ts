import { Max, Min } from 'class-validator';
import { Rate } from 'src/rate/entities/rate.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false, length: 100, type: 'varchar' })
  title: string;
  @Column({ nullable: false, type: 'text' })
  description: string;
  @Column()
  @Min(0)
  @Max(10000)
  price: number;
  @Column()
  @Min(0)
  quantity: Number;
  @OneToMany(() => Rate, (rate) => rate.product)
  rates: Rate;
}
