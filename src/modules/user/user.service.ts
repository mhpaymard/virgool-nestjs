import { Inject, Injectable, Scope } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProfileDto } from './dto/profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ProfileEntity } from './entities/profile.entity';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { PublicMessages } from 'src/common/enums/message.enum';
import { isDate } from 'class-validator';
import { GenderEnum } from './enums/gender.enum';

@Injectable({scope:Scope.REQUEST})
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepository:Repository<UserEntity>,
    @InjectRepository(ProfileEntity) private profileRepository:Repository<ProfileEntity>,
    @Inject(REQUEST) private request:Request
  ){}
  async changeProfile(files:any,profileDto:ProfileDto){
    let {image_profile: image_profile_file,bg_image: bg_image_file} = files;
    if(image_profile_file?.length > 0){
      let [image] = image_profile_file;
      profileDto.image_profile = image.path;
    }
    if(bg_image_file?.length > 0){
      let [image] = bg_image_file;
      profileDto.bg_image = image.path;
    }
    const {id:userId,profileId} = this.request.user;
    let profile = await this.profileRepository.findOneBy({userId})
    const {bio,birthday,gender,linkedin_profile,nickname,x_profile,image_profile,bg_image} = profileDto;
    if(profile){
      if(bio) profile.bio = bio;
      if(birthday && isDate(new Date(birthday))) profile.birthday = new Date(birthday);
      if(gender && Object.values(GenderEnum as any).includes(gender)) profile.gender = gender;
      if(linkedin_profile) profile.linkedin_profile = linkedin_profile;
      if(x_profile) profile.x_profile = x_profile;
      if(image_profile) profile.image_profile = image_profile;
      if(bg_image) profile.bg_image = bg_image;
    }else{
      profile = await this.profileRepository.create({
        bio,
        birthday,
        gender,
        linkedin_profile,
        x_profile,
        nickname,
        userId,
        image_profile,
        bg_image
      });
    }
    profile = await this.profileRepository.save(profile);
    if(!profileId) await this.userRepository.update({id:userId},{profileId:profile.id})
    return {
      message: PublicMessages.Updated
    }
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
