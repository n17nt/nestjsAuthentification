import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  getAllCategories() {
    return this.categoryService.getAll();
  }
  @Post()
  addCategory(@Body() body: any) {
    return this.categoryService.create(body);
  }
}
