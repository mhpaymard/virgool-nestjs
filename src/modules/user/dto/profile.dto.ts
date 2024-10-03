import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, Length } from "class-validator";
import { GenderEnum } from "../enums/gender.enum";

export class ProfileDto{
    @ApiPropertyOptional()
    @Length(3,30)
    nickname:string;
    @ApiPropertyOptional({nullable:true})
    @Length(3,100)
    bio: string;
    @ApiPropertyOptional({nullable:true,format:"binary"})
    image_profile:string;
    @ApiPropertyOptional({nullable:true,format:"binary"})
    bg_image:string;
    @ApiPropertyOptional({nullable:true,enum:GenderEnum})
    @IsEnum(GenderEnum)
    gender:string;
    @ApiPropertyOptional({nullable:true,example:"2024-10-02T08:29:56.350Z"})
    birthday:Date;
    @ApiPropertyOptional({nullable:true})
    linkedin_profile:string;
    @ApiPropertyOptional({nullable:true})
    x_profile:string;
}