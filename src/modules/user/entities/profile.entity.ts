import { Length } from "class-validator";
import { BaseEntity } from "src/common/abstracts/base.entity";
import { EntityName } from "src/common/enums/entity.enum";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity(EntityName.profile)
export class ProfileEntity extends BaseEntity{
    @Column()
    nickname:string;
    @Column({nullable:true})
    bio: string;
    @Column({nullable:true})
    image_profile:string;
    @Column({nullable:true})
    bg_image:string;
    @Column({nullable:true})
    gender:string;
    @Column({nullable:true})
    birthday:Date;
    @Column({nullable:true})
    linkedin_profile:string;
    @Column({nullable:true})
    x_profile:string;
    @Column({nullable:true})
    userId:number;
    @OneToOne(()=>UserEntity,user=>user.profile,{onDelete:"CASCADE"})
    @JoinColumn({name:"userId"})
    user:UserEntity;
}