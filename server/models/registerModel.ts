import {Entity , Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm'

export enum Role {
    admin = "admin",
    user = "user",
    instructor = "instructor"

}
@Entity()
export default class Register {

@PrimaryGeneratedColumn('uuid')
id : string

@Column({ type: 'varchar' , nullable: false})
name : string

@Column ({ type: 'varchar' , unique:true , nullable: false})
email : string 

@Column ({ type:'varchar' , nullable: false})
password : string 

@Column ({ type:'varchar'})
phoneNumber : string

@Column ({ type:'varchar'})
address : string 

@Column ({ type:'enum' , enum:Role , default:null })
role :  Role

@CreateDateColumn()
createdAt : Date

@UpdateDateColumn()
updatedAt :Date
}