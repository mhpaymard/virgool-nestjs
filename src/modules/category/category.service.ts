import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entity/category.entity';
import { Repository } from 'typeorm';
import { ConflictMessages, NotFoundMessage, PublicMessages } from 'src/common/enums/message.enum';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { paginationGenerator, paginationSolver } from 'src/common/utils/pagination.util';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(CategoryEntity) private categoryRepository:Repository<CategoryEntity>){}
    async create(createCategoryDto:CreateCategoryDto){
        let {title,priority} = createCategoryDto;
        title = await this.checkExistByTitle(title);
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
        return title?.trim();
    }
    async findAll(paginationDto:PaginationDto){
        const {limit,page,skip} = paginationSolver(paginationDto);
        const [categories,count] = await this.categoryRepository.findAndCount({
            where:{},
            skip,
            take:limit
        });
        return {
            pagination:paginationGenerator(count,page,limit),
            categories
        }
    }
    async findOne(id:number){
        const category = await this.findTheOne(id);
        return {
            category
        }
    }
    async findTheOne(id:number):Promise<CategoryEntity>{
        const category = await this.categoryRepository.findOneBy({id});
        if(!category) throw new NotFoundException(NotFoundMessage.NotFoundCategory);
        return category;
    }
    async update(id:number,updateCategoryDto:UpdateCategoryDto){
        const category = await this.findTheOne(id);
        const {priority,title} = updateCategoryDto;
        if(title) category.title = title;
        if(priority) category.priority = priority;
        await this.categoryRepository.save(category);
        return {
            message: PublicMessages.Updated
        }
    }
    async remove(id:number){
        await this.findTheOne(id);
        await this.categoryRepository.delete({id});
        return {
            message:PublicMessages.Deleted
        }
    }
}
