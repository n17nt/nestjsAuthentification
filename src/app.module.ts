import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { Category } from './products/entities/category.entity';
import { RateModule } from './rate/rate.module';
import { Rate } from './rate/entities/rate.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/auth.entity';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'newproject',
      entities: [Product, Category, Rate, User],
      synchronize: true,
    }),
    ProductsModule,
    RateModule,
    AuthModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
