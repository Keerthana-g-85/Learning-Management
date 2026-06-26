import {Entity , Column , PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm'

export enum Level {
    beginner ='beginner',
    intermediate = 'intermediate',
    advanced = 'advanced'
}

@Entity()
export default class Course{

@PrimaryGeneratedColumn('uuid')
id : string

@Column({type: 'varchar'})
title : string 

@Column({type: 'varchar'})
description : string 

@Column({type: 'varchar'})
instructor_name :string

@Column({type: 'varchar'})
duration : string 

@Column({type:'enum' , enum:Level })
level : Level

@Column({type: 'varchar'})
thumbnail : string 

@CreateDateColumn()
created_at : Date

@UpdateDateColumn()
updated_at :Date
}