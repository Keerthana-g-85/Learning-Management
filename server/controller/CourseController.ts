import Course from '../models/CourseModel.js'
import {database} from '../server.js'
import type{ RequestHandler } from 'express'
import { ILike } from "typeorm";

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
        console.log(error)
        res.status(500).send({
            success : false ,
            message : "Error while creating"
        })
    }

}

export const GetAll : RequestHandler = async(req,res) => {
    try{
        const courseRepo = database.getRepository(Course)

        const AllCourses = await courseRepo.find()
        console.log(AllCourses)

        res.status(200).send({
            success : true ,
            message : "All Courses",
            AllCourses
        })
        

    }catch(error){
        res.status(500).send({
            success:false ,
            message : "Error while getting the course"
        })
    }
}

export const Get : RequestHandler = async(req,res) =>{
    try{
        const courseRepo = database.getRepository(Course)
        const search  = req.params.search as string
        console.log(search)
        const course = await courseRepo.find({ where: { title: ILike(`${search}%`)}});
        console.log(course)
        if (!course){
            return res.status(404).send({
                success: false ,
                message : 'Course not found'
            })
        }
        res.status(200).send({
            success : true ,
            message : "Courses",
            course 
        })

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false ,
            message : "Error while getting the course"
        })
    }
}

export const Update : RequestHandler = async(req,res) =>{
    try{
        const courseRepo = database.getRepository(Course)

        const { title , description , instructor_name , duration , level , thumbnail } = req.body
        
        const id  = req.params.id as string
        console.log(id)
        const course = await courseRepo.findOneBy({id })
        console.log(course)
        if (!course){
            return res.status(404).send({
                success: false ,
                message : 'Course not found'
            })
        }
        const UpdatedCourse =await  courseRepo.update({id : id },{title : title , description : description, instructor_name : instructor_name , duration:duration , level:level , thumbnail : thumbnail })
        res.status(200).send({
            success : true ,
            message : "Course updated",
            UpdatedCourse
        })

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false ,
            message : "Error while updating the course"
        })
    }
}

export const Delete : RequestHandler = async(req,res) =>{
    try{
        const courseRepo = database.getRepository(Course)
        const id  = req.params.id as string
        console.log(id)
        const course = await courseRepo.findOneBy({id })
        console.log(course)
        if (!course){
            return res.status(404).send({
                success: false ,
                message : 'Course not found'
            })
        }
        await courseRepo.delete({id : id})
        res.status(200).send({
            success : true ,
            message : "Course deleted",
        })

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false ,
            message : "Error while getting the course"
        })
    }
}
