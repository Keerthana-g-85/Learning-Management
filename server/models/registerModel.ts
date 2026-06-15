import {Entity , Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm'

export enum Role {
    admin = "admin",
    user = "user",
    instructor = "instructor"

}
@Entity()
export default class Register {

@PrimaryGeneratedColumn('uuid')
id! : string

@Column({ type: 'varchar' , nullable: false})
Name! : string

@Column ({ type: 'varchar' , unique:true , nullable: false})
Email! : string 

@Column ({ type:'varchar' , nullable: false})
Password! : string 

@Column ({ type:'varchar'})
PhoneNumber! : string

@Column ({ type:'varchar'})
Address! : string 

@Column ({ type:'enum' , enum:Role , default:null })
Role! :  Role

@CreateDateColumn()
CreatedAt! : Date

@UpdateDateColumn()
UpdatedAt! :Date
}