import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis;

  async onModuleInit() {
    this.client = new Redis({
      host: 'localhost',
      port: 6379,
    });
  }

  async onModuleDestroy() {
    await this.client.quit();
  }

  async setKey(key, value) {
    return await this.client.set(key, JSON.stringify(value), 'EX', 600);
  }

  async getKey(key) {
    return await this.client.get(key);
  }
}
