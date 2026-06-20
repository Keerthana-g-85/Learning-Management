import Course from '../models/CourseModel.js'
import {database} from '../server.js'
import type{ RequestHandler } from 'express'

export const Create : RequestHandler = async(req,res) =>{
    try{
        const courseRepo = database.getRepository(Course)

        const { title , description , instructor_name , duration , level , thumbnail } = req.body

        if (!title || !description || !instructor_name || !duration || !level || !thumbnail) {
            res.status(400).send({
                success : false ,
                message : "Enter all the values"
            })
        }
        const title_existing = await  courseRepo.findOne({ where : {title : title}})
        if (title_existing){
            return res.status(400).send({
                success : false ,
                message : 'Course already existing'
            })
        }
        const course = courseRepo.create({title , description , instructor_name , duration , level , thumbnail})
        const newCourse =await courseRepo.save(course)

        res.status(200).send({
            success: true ,
            message : "Course created",
            course : newCourse
        })

    }catch(error){
        res.status(500).send({
            success : false ,
            message : "Error while creating"
        })
    }

}