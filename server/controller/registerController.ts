import { database } from '../server.js'
import Register from '../models/registerModel.js'
import type { RequestHandler } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const Create : RequestHandler = async (req,res) => {
    try{
        const registerRepo = database.getRepository(Register)
        const { Name , Email , Password , PhoneNumber , Address , Role } = req.body

        if (!Email || !Password || !Name || !PhoneNumber || !Address){
            return res.status(400).send({
                success : false ,
                message : "Enter required values"           
            })
        }

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
            user : newUser
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

export const Login : RequestHandler = async (req,res) => {
    try{
        const registerRepo = database.getRepository(Register)

        const {Email , Password} = req.body 

        if (!Email || !Password){
            return res.status(401).send({
                success : false ,
                message : "Enter Email and Password"           
            })
        }

        const exist = await registerRepo.findOneBy({Email : Email})
        console.log(exist)
        if (!exist){
            return res.status(404).send({
                success : false ,
                message : "Email not yet registered"           
            })
        }

        const isMatch = await bcrypt.compare(Password,exist.Password)
        if (!isMatch){
            return res.status(401).send({
                success : false ,
                message : "Enter correct password"           
            })
        }

        const token = jwt.sign({id:exist.id , Name: exist.Name , Address: exist.Address , Phone : exist.PhoneNumber} ,
            process.env.JW_SECRET as string , {expiresIn : '15d'}
        )
        res.status(201).send({
            success : true ,
            message : "User logged successfully",
            token
        })


    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false ,
            message : "Error while logging in"
        })
    }
}