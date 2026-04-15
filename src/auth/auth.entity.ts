import { BaseEntity } from 'src/rate/entities/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Index()
  @Column({ unique: true, type: 'varchar', length: 30 })
  username: string;
  @Column({ type: 'varchar' })
  password: string;
}
