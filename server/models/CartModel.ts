import { Entity, JoinColumn, PrimaryGeneratedColumn , CreateDateColumn , UpdateDateColumn} from "typeorm";
import User from "./UserModel.js";
import Course from "./CourseModel.js";
import { ManyToOne } from "typeorm";

@Entity()
export default class Cart {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "student_id" })
  User: User;

  @ManyToOne(() => Course, { onDelete: "CASCADE" })
  @JoinColumn({ name: "course_id" })
  course: Course;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
