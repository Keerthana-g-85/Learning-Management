import {Create, GetAll , Get, Update, Delete , FilterCourse} from '../controller/CourseController.js'
import {authentication } from '../middleware/userAuthenticaton.js'
import express from 'express'

export const CourseRouter = express.Router()

CourseRouter.post('/create',authentication ,Create)
CourseRouter.get('/getall',authentication,GetAll)
CourseRouter.get('/get/:search',authentication,Get)
CourseRouter.put('/update/:id',authentication,Update)
CourseRouter.delete('/delete/:id',authentication,Delete)
CourseRouter.get('/filter/:instructors',authentication,FilterCourse)