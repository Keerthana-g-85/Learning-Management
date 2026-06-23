import express from 'express'
import {Create , GetCourse} from '../controller/EnrollController.js'
export const EnrollRouter = express.Router()
EnrollRouter.post('/create',Create)
EnrollRouter.get('/getcourse/:id',GetCourse)