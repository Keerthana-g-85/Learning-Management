import express from 'express'
import {Create , GetCourse, GetNotenroll , Delete} from '../controller/EnrollController.js'
export const EnrollRouter = express.Router()
EnrollRouter.post('/create',Create)
EnrollRouter.get('/getcourse/:id',GetCourse)
EnrollRouter.get('/notenroll/:id',GetNotenroll)
EnrollRouter.delete('/delete/:id',Delete)