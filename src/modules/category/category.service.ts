import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entity/category.entity';
import { Repository } from 'typeorm';
import { ConflictMessages, PublicMessages } from 'src/common/enums/message.enum';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(CategoryEntity) private categoryRepository:Repository<CategoryEntity>){}
    async create(createCategoryDto:CreateCategoryDto){
        const {title,priority} = createCategoryDto;
        await this.checkExistByTitle(title);
        const category = this.categoryRepository.create({
            title,
            priority
        })
        await this.categoryRepository.save(category);
        return {
            message:PublicMessages.Created
        }
    }
    async checkExistByTitle(title:string){
        title = title?.trim()?.toLowerCase();
        const category = await this.categoryRepository.findOneBy({title});
        if(category) throw new ConflictException(ConflictMessages.CategoryTitle);
        return true;
    }
    findAll(paginationDto:PaginationDto){
        return this.categoryRepository.findBy({});
    }
}
