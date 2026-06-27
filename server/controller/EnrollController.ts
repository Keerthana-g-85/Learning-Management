import type { RequestHandler } from 'express';
import { database } from '../server.js'

import Register from '../models/RegisterModel.js';
import Course from '../models/CourseModel.js'
import Enroll from '../models/EnrollModel.js'
import { Role } from '../models/RegisterModel.js'

export const Create:RequestHandler = async (req, res) => {
    try{
        const enrollRepo = database.getRepository(Enroll);
        const studentRepo = database.getRepository(Register)
        const courseRepo = database.getRepository(Course)
        const { register , course } = req.body;
        console.log(register)

            const courseId = await courseRepo.findOneBy({id: course})
                if (!courseId){
                    return res.status(404).send({
                        success:false ,
                        message : "Course Id not present"
                    })
                }

            const studentId = await studentRepo.findOneBy({id: register})
                if (!studentId){
                    return res.status(404).send({
                        success:false ,
                        message : "Student Id not present"
                    })
                }

        const studuent_course= await enrollRepo.findOne({ where: {register:{ id: register } , course :{ id: course }}})

        if (studuent_course ){
            return res.status(404).send({
                success:false ,
                message : "value already present"
            })
        }

        const enroll = enrollRepo.create({ register , course , enroll_date : new Date()})
        
        const newEnroll = await enrollRepo.save(enroll)

        return res.status(200).json({
            success: true,
            message: "New student enrolled",
            student: newEnroll
        });

    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false ,
            message : "error occured during creation"
        })


    }
}


export const GetCourse : RequestHandler = async (req,res) =>{
    try{
        const enrollRepo = database.getRepository(Enroll)
        const courseId = req.params.id as string

        const course_student = await enrollRepo.find({where : { course: { id: courseId}}, relations: { register: true} })

        if (course_student.length === 0) {
        return res.status(404).send({
            success: false,
            message: "Student is not enrolled in any course"
        });
        }

        return res.status(200).send({
            success:true,
            message:"All students details",
            course_student
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false ,
            message : "error occured during getting"
        })
    }
}

export const GetNotenroll : RequestHandler = async (req,res) =>{
    try{
        const enrollRepo = database.getRepository(Enroll)
        const studentRepo = database.getRepository(Register)
        const courseId = req.params.id as string

        const course_student = await enrollRepo.find({where : { course: { id: courseId}}, relations: { register: true} })

        const allStudents = await studentRepo.find({ where: {role: Role.student}});
        const notenroll = allStudents.filter((student) => !course_student.some(
            (enroll) => enroll.register.id === student.id
            )
        );

        return res.status(200).send({
            success:true,
            message:"All students details",
            notenroll
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false ,
            message : "error occured during getting"
        })
    }
}

export const Delete : RequestHandler = async (req,res) =>{
    try{
        const id = req.params.id
        const enrollRepo = database.getRepository(Enroll)
        await enrollRepo.delete(id)
    
    return res.status(200).send({
            success:true,
            message:"Student Unenrolled",
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success: false ,
            message : "error while deleting"
        })
    }
}

export const GetStudent : RequestHandler = async (req,res) =>{
    try{
        const enrollRepo = database.getRepository(Enroll)
        const studentId= req.params.id as string

        const student_course = await enrollRepo.find({where : { register: { id: studentId }}, relations: { course: true } })

        if (student_course.length === 0) {
        return res.status(404).send({
            success: false,
            message: "Student is not enrolled in any course"
        });
        }

        return res.status(200).send({
            success:true,
            message:"All students details",
            student_course
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false ,
            message : "error occured during getting"
        })
    }
}