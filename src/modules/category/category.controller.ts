import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiConsumes, ApiQuery } from '@nestjs/swagger';
import { SwaggerConsumes } from 'src/common/enums/swagger-consume.enum';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Pagination } from 'src/common/decorators/pagination.decorator';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post("/create")
  @ApiConsumes(SwaggerConsumes.UrlEncoded,SwaggerConsumes.Json)
  create(@Body() createCategoryDto:CreateCategoryDto){
    return this.categoryService.create(createCategoryDto);
  }

  @Get("/")
  @Pagination()
  fintAll(@Query() paginationDto:PaginationDto){
    return this.categoryService.findAll(paginationDto);
  }

  @Get(":id")
  findOne(@Param("id",ParseIntPipe) id:number){
    return this.categoryService.findOne(id);
  }

  @Patch(":id")
  @ApiConsumes(SwaggerConsumes.Json,SwaggerConsumes.UrlEncoded)
  update(@Param("id",ParseIntPipe) id:number,@Body() updateCategoryDto:UpdateCategoryDto){
    return this.categoryService.update(id,updateCategoryDto);
  }

  @Delete(":id")
  @ApiConsumes(SwaggerConsumes.Json,SwaggerConsumes.UrlEncoded)
  remove(@Param("id",ParseIntPipe) id:number){
    return this.categoryService.remove(id);
  }

}
