import { ApiProperty } from "@nestjs/swagger";
import { AuthType } from "../enum/type.enum";
import { IsEnum, IsString, Length } from "class-validator";
import { AuthMethod } from "../enum/method.enum";

export class AuthDto{
    @ApiProperty()
    @IsString()
    @Length(3,25,{message:"طول نام کاربری باید بین 3 تا 25 کاراکتر باشد"})
    username:string;
    @ApiProperty({enum:AuthType})
    @IsEnum(AuthType)
    type:AuthType;
    @ApiProperty({enum:AuthMethod})
    @IsEnum(AuthMethod)
    method:AuthMethod;
}

export class CheckOtpDto{
    @ApiProperty()
    @IsString()
    @Length(5,5,{message:'کد وارد شده نامعتبر است'})
    code:string;
}