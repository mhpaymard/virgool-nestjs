import { BaseEntity } from "src/common/abstracts/base.entity";
import { EntityName } from "src/common/enums/entity.enum";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity(EntityName.otp)
export class OtpEntity extends BaseEntity{
    @Column()
    code:string;
    @Column()
    expires_in:Date;
    @Column()
    userId:number;
    @OneToOne(()=>UserEntity,user=>user.otp,{onDelete:"CASCADE"})
    @JoinColumn({name:"userId"})
    user:UserEntity;
}