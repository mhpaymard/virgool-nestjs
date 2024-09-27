import { Body, Controller, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiConsumes } from '@nestjs/swagger';
import { SwaggerConsumes } from 'src/common/enums/swagger-consume.enum';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post("/create")
  @ApiConsumes(SwaggerConsumes.UrlEncoded,SwaggerConsumes.Json)
  create(@Body() createCategoryDto:CreateCategoryDto){
    return this.categoryService.create(createCategoryDto);
  }
}
