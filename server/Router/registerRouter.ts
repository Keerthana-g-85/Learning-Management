import express from 'express'
import { Create , Get, GetInstructor, GetStudent, Login} from '../controller/RegisterController.js'

export const registerRouter = express.Router()

registerRouter.post('/create', Create)
registerRouter.post('/login', Login)
registerRouter.get('/getstudent', GetStudent)
registerRouter.get('/getinstructor',GetInstructor)
registerRouter.get('/get',Get)