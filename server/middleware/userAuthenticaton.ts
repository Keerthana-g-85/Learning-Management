import jwt from 'jsonwebtoken'
import type { Request , Response , NextFunction } from 'express'

interface AuthRequest extends Request {
    user?: string ;
}

export const authentication = async(req : AuthRequest,res : Response, next : NextFunction) =>{
    try{
    console.log(req)
    const token = (req.headers.authorization)?.split(' ')[1]
    if (!token){
        return res.status(404).send({
            success: false ,
            message : "No token"
        })
    }

    jwt.verify(token , process.env.JW_SECRET as string , (error , decode )=>{
        if (error){
            return res.status(401).send({
            success: false ,
            message : "Error while authentication"
        })
        }
        else{
            req.user = decode
            next()
        }

    })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false ,
            message : "Error while logging in"
        })
    }

}