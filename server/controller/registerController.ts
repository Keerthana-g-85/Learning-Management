import { database } from '../server.js'
import Register from '../models/registerModel.js'
import type { RequestHandler } from 'express'
import bcrypt from 'bcrypt'

const Create : RequestHandler = async (req,res) => {
    try{
        const registerRepo = database.getRepository(Register)
        const { Name , Email , Password , PhoneNumber , Address , Role } = req.body

        const existing = await registerRepo.findOne({ where : { Email : Email , Name : Name }})
        if (existing){
            return res.status(400).send({
                success : false ,
                message : 'User already exist'
            })
        }

        var salt = bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hash(Password , salt)

        const user = registerRepo.create({ Name , Email , Password :hashedPassword , PhoneNumber , Address , Role})

        const newUser = await registerRepo.save(user)

        res.status(201).send({
            success : true ,
            message : "User registered successfully",
            newUser
        })

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success: false ,
            message : "Error while registration"
        })

    }

}