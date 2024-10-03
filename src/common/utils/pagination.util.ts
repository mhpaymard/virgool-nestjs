import { PaginationDto } from "../dtos/pagination.dto";

export function paginationSolver(paginationDto:PaginationDto){
    let {limit=10,page=0} = paginationDto;
    if(!page || page<=1) page = 0;
    else page = page -1;

    if(!limit || limit<=0) limit=10;
    let skip = page * limit;
    return {
        page: page+1,
        limit,
        skip
    }
}

export function paginationGenerator(count:number=0,page:number=0,limit:number=10){
    return {
        totalCount: +count,
        page: +page,
        limit: +limit,
        pageCount:(Math.ceil(count/limit))
    }
}