import {Create} from '../controller/CourseController.js'
import express from 'express'

export const CourseRouter = express.Router()

CourseRouter.post('/create',Create)