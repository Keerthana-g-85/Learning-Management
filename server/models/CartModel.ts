import { Entity, JoinColumn, PrimaryGeneratedColumn , CreateDateColumn , UpdateDateColumn} from "typeorm";
import Register from "./RegisterModel.js";
import Course from "./CourseModel.js";
import { ManyToOne } from "typeorm/browser";

@Entity()
export default class Cart {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Register, { onDelete: "CASCADE" })
  @JoinColumn({ name: "student_id" })
  register: Register;

  @ManyToOne(() => Course, { onDelete: "CASCADE" })
  @JoinColumn({ name: "course_id" })
  course: Course;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
