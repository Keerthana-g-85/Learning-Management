import {Entity , Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

export enum Role {
    admin = "admin",
    user = "user",
    instructor = "instructor"

}
@Entity()
export default class Register {

@Column({ type: 'varchar'})
Name! : string

@Column ({ type: 'varchar' , unique:true})
Email! : string 

@Column ({ type:'varchar'})
Password! : string 

@Column ({ type:'varchar'})
PhoneNumber! : string

@Column ({ type:'varchar'})
Address! : string 

@Column ({ type:'enum' , default:null })
Role! :  Role

@CreateDateColumn()
CreatedAt! : Date

@UpdateDateColumn()
UpdatedAt! :Date
}