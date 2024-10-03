import { Request } from "express";
import { mkdirSync } from "fs";
import { extname, join } from "path";
import { ValidationMessage } from "../enums/message.enum";
import { BadRequestException } from "@nestjs/common";
export type CallbackDestinationMulter = (error:Error,destination:string)=>void;
export type CallbackFilenameMulter = (error:Error,filename:string)=>void;
export type MulterFile = Express.Multer.File;
export function multerDestination(fieldName:string){
    return function (request:Request,file:MulterFile,callback:CallbackDestinationMulter):void{
        let path = join("public","uploads",fieldName)
        mkdirSync(path,{recursive:true});
        callback(null,path);
    }
}
export function multerFilename(request:Request,file:MulterFile,callback:CallbackFilenameMulter):void{
    const ext = extname(file.originalname).toLowerCase();
    if(isValidImageFormat(ext)){
        const filename = `${Date.now()}${ext}`;    
        callback(null,filename)
    }else{
        callback(new BadRequestException(ValidationMessage.InvalidImageFormat),null)
    }
}
export function isValidImageFormat(ext:string){
    return [".jpg",".png",".jpeg"].includes(ext);
}