import {Create, GetAll , Get} from '../controller/CourseController.js'
import express from 'express'

export const CourseRouter = express.Router()

CourseRouter.post('/create',Create)
CourseRouter.get('/getall',GetAll)
CourseRouter.get('/get/:id',Get)