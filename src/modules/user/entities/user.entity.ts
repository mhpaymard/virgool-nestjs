import { BaseEntity } from "src/common/abstracts/base.entity";
import { EntityName } from "src/common/enums/entity.enum";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { OtpEntity } from "./otp.entity";
import { ProfileEntity } from "./profile.entity";

@Entity(EntityName.user)
export class UserEntity extends BaseEntity{
    @Column({unique:true,nullable:true})
    username:string;
    @Column({unique:true,nullable:true})
    phone:string;
    @Column({unique:true,nullable:true})
    email:string;
    @Column({nullable:true})
    password:string;
    @Column({nullable:true})
    otpId:number;
    @OneToOne(()=>OtpEntity,otp=>otp.user,{nullable:true})
    @JoinColumn({name:"otpId"})
    otp:OtpEntity;
    @Column({nullable:true})
    profileId:number;
    @OneToOne(()=>ProfileEntity,profile=>profile.user)
    @JoinColumn({name:"profileId"})
    profile:ProfileEntity;
}