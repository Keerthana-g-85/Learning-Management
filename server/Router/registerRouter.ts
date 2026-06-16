import express from 'express'
import { Create , Login} from '../controller/registerController.js'
import { authentication } from '../middleware/userAuthenticaton.js'

export const registerRouter = express.Router()

registerRouter.post('/create', Create)
registerRouter.post('/login', Login)