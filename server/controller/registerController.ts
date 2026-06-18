import { database } from '../server.js'
import Register from '../models/registerModel.js'
import type { RequestHandler } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const Create : RequestHandler = async (req,res) => {
    try{
        const registerRepo = database.getRepository(Register)
        const { name , email , password , phoneNumber , address , role } = req.body

        if (!email || !password || !name ){
            return res.status(400).send({
                success : false ,
                message : "Enter required values"           
            })
        }

        const existing = await registerRepo.findOne({ where : { email : email }})
        if (existing){
            return res.status(400).send({
                success : false ,
                message : 'User already exist'
            })
        }

        var salt = bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hash(password , salt)

        const user = registerRepo.create({ name , email , password :hashedPassword , phoneNumber , address , role})

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

        const {email , password} = req.body 

        if (!email || !password){
            return res.status(401).send({
                success : false ,
                message : "Enter Email and Password"           
            })
        }

        const exist = await registerRepo.findOneBy({email : email})
        console.log(exist)
        if (!exist){
            return res.status(404).send({
                success : false ,
                message : "Email not yet registered"           
            })
        }

        const isMatch = await bcrypt.compare(password,exist.password)
        if (!isMatch){
            return res.status(401).send({
                success : false ,
                message : "Invalid password"           
            })
        }

        const accesstoken = jwt.sign({id:exist.id , Name: exist.name , Address: exist.address , Phone : exist.phoneNumber} ,
            process.env.JW_SECRET as string , {expiresIn : '1hr'}
        )

        const refreshtoken = jwt.sign({id:exist.id , Name: exist.name , Address: exist.address , Phone : exist.phoneNumber} ,
            process.env.JW_REFRESH as string , {expiresIn : '7d'}
        )

        res.cookie("refreshtoken",refreshtoken,{
            httpOnly : true ,
            secure : false ,
            sameSite : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(201).send({
            success : true ,
            message : "User logged successfully",
            accesstoken
        })


    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false ,
            message : "Error while logging in"
        })
    }
}