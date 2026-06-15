import express from 'express'
import { Create } from '../controller/registerController.js'

export const registerRouter = express.Router()

registerRouter.post('/create', Create)