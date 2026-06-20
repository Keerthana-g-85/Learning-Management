import express from 'express'
import { Create , Login} from '../controller/RegisterController.js'

export const registerRouter = express.Router()

registerRouter.post('/create', Create)
registerRouter.post('/login', Login)