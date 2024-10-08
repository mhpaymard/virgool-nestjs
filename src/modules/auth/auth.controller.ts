import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthDto, CheckOtpDto } from './dto/auth.dto';
import { SwaggerConsumes } from 'src/common/enums/swagger-consume.enum';
import { Request, Response } from 'express';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/user-existence")
  @ApiConsumes(SwaggerConsumes.UrlEncoded,SwaggerConsumes.Json)
  userExistence(@Body() authDto:AuthDto, @Res() res:Response){
    return this.authService.userExistence(authDto,res);
  }

  @Post("/check-otp")
  @ApiConsumes(SwaggerConsumes.UrlEncoded,SwaggerConsumes.Json)
  checkOtp(@Body() checkOtpDto:CheckOtpDto){
    return this.authService.checkOtp(checkOtpDto.code);
  }

  @Get("/check-login")
  @ApiBearerAuth("Authorization")
  @UseGuards(AuthGuard)
  checkLogin(@Req() req:Request){
    return req.user;
  }
}