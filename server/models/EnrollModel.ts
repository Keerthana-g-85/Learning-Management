import {Column ,Entity , ManyToOne, PrimaryGeneratedColumn , CreateDateColumn , UpdateDateColumn, JoinColumn} from 'typeorm'
import Register from './RegisterModel.js'
import Course from './CourseModel.js'
@Entity()
export default class Enroll{

@PrimaryGeneratedColumn('uuid')
id : string 

@ManyToOne(()=>Register)
@JoinColumn({name: 'student_id'})
register : string

@ManyToOne(()=> Course)
@JoinColumn({name : 'course_id'})
course : string

@Column({type:'date'})
enroll_date : Date

@CreateDateColumn()
created_at : Date

@UpdateDateColumn()
updated_at :Date
}