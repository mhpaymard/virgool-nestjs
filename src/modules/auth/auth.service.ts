import { BadRequestException, ConflictException, Inject, Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { AuthDto, CheckOtpDto } from './dto/auth.dto';
import { AuthType } from './enum/type.enum';
import { AuthMethod } from './enum/method.enum';
import { isEmail, isMobilePhone } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { ProfileEntity } from '../user/entities/profile.entity';
import { AuthMessage, BadRequestMessage, PublicMessages } from 'src/common/enums/message.enum';
import { OtpEntity } from '../user/entities/otp.entity';
import { randomInt } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from './tokens.service';
import { Request, Response } from 'express';
import { CookieKeys } from 'src/common/enums/cookie.enum';
import { AuthResponse } from './types/response.type';
import { REQUEST } from '@nestjs/core';

@Injectable({scope: Scope.REQUEST})
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepository:Repository<UserEntity>,
    @InjectRepository(ProfileEntity) private profileRepository:Repository<ProfileEntity>,
    @InjectRepository(OtpEntity) private otpRepository:Repository<OtpEntity>,
    private jwtService:JwtService,
    private tokenService:TokenService,
    @Inject(REQUEST) private request:Request
  ){}
  async userExistence(authDto:AuthDto,res:Response){
    const {username,type,method} = authDto;
    let result;
    switch(type){
      case AuthType.login:
        result = await this.login(method,username);
        return this.sendResponse(res,result);
      case AuthType.register:
        result = await this.register(method,username);
        return this.sendResponse(res,result);
      default:
        throw new BadRequestException()
    }
  }
  async login(method:AuthMethod,username:string){
    const validUsername = this.usernameValidator(method,username);
    let user:UserEntity = await this.checkExistsUser(method,validUsername);
    if(!user) throw new UnauthorizedException(AuthMessage.NotFoundAccount);
    const otp = await this.sendOtp(user.id);
    const token = this.tokenService.createOtpToken({user_id:user.id});
    return {
      message:PublicMessages.SendOtp,
      code: otp.code,
      token
    }
  }
  async register(method:AuthMethod,username:string){
    const validUsername = this.usernameValidator(method,username);
    let user:UserEntity = await this.checkExistsUser(method,validUsername);
    if(user) throw new ConflictException(AuthMessage.AlreadyExistsAccount);
    if(method===AuthMethod.username) throw new BadRequestException(BadRequestMessage.InValidRegisterData)
    console.log('0');
    user = await this.userRepository.create({
      [method]: validUsername
    })
    console.log('1');
    user = await this.userRepository.save(user);
    user.username = `m_${user.id}`;
    console.log('2');

    user = await this.userRepository.save(user);
    console.log('3');

    const otp = await this.sendOtp(user.id);

    console.log('4');
    const token = this.tokenService.createOtpToken({user_id:user.id});
    console.log('5');
    return {
      message:PublicMessages.SendOtp,
      code:otp.code,
      token
    }
  }
  usernameValidator(method:AuthMethod,username:string){
    switch(method){
      case AuthMethod.email:
        if(isEmail(username)) return username;
        throw new BadRequestException("email format is not valid")
      case AuthMethod.phone:
        if(isMobilePhone(username,"fa-IR")) return username;
        throw new BadRequestException("mobile number is not valid")
      case AuthMethod.username:
        return username;
      default:
        throw new BadRequestException("method is not valid")
    }
  }
  async checkExistsUser(method:AuthMethod,username:string){
    let user:UserEntity;
    if(method===AuthMethod.phone){
      user = await this.userRepository.findOneBy({phone:username});
    }else if(method===AuthMethod.email){
      user = await this.userRepository.findOneBy({email:username});
    }else if(method===AuthMethod.username){
      user = await this.userRepository.findOneBy({username:username});
    }else throw new BadRequestException(BadRequestMessage.InValidLoginData);
    return user;
  }
  async sendOtp(user_id:number){
    const code = randomInt(10000,99999).toString();
    const expires_in = new Date(Date.now() + (1000 * 60 * 2));
    let otp = await this.otpRepository.findOneBy({user_id});
    let existOtp = false;
    if(otp){
      existOtp = true;
      otp.code = code;
      otp.expires_in = expires_in;
    }else{
      otp = this.otpRepository.create({
        code,
        expires_in,
        user_id
      })
    }
    otp = await this.otpRepository.save(otp);
    if(!existOtp){
      await this.userRepository.update(
        {
          id:user_id
        },
        {
          otp_id:otp.id
        }
      )
    }

    //sendSmsEmailOtpCode
    /*

    */

    return otp;
  }
  async checkOtp(code:string){
    const token = this.request?.cookies?.[CookieKeys.Otp];
    if(!token) throw new UnauthorizedException(AuthMessage.ExpiredOtpCode);
    const {user_id} = this.tokenService.verifyOtpToken(token);
    const otp = await this.otpRepository.findOneBy({user_id});
    if(!otp) throw new UnauthorizedException(AuthMessage.TryAgain);
    const now = new Date();
    if(otp.expires_in < now) throw new UnauthorizedException(AuthMessage.ExpiredOtpCode);
    if(otp.code !== code) throw new UnauthorizedException(AuthMessage.WrongOtpCode);
    const accessToken = this.tokenService.createAccessToken({user_id});
    return {
      message: PublicMessages.LoggedIn,
      accessToken
    }
  }
  async sendResponse(res:Response,result:AuthResponse){
    const {token,code,message} = result;
    res.cookie(CookieKeys.Otp,token,{
        httpOnly:true,
        expires: new Date(Date.now() + (1000 * 60 * 2) + (1000 * 15))
    });
    res.json({
      message,
      token,
      code
    })
  }
  async validateAccessToken(token:string){
    const {user_id} = this.tokenService.verifyAccessToken(token);
    const user = await this.userRepository.findOneBy({id:user_id});
    if(!user) throw new UnauthorizedException(AuthMessage.LoginAgain);
    return user;
  }
}