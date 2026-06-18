import jwt from 'jsonwebtoken'
import type { Request , Response , NextFunction } from 'express'
import type{ JwtPayload } from "jsonwebtoken";

interface AuthRequest extends Request {
    user?: string | JwtPayload;
}

export const authentication = async(req : AuthRequest,res : Response, next : NextFunction) =>{
    try{
    console.log(req)
    const accesstoken = (req.headers.authorization)?.split(' ')[1]
    if (!accesstoken){
        return res.status(404).send({
            success: false ,
            message : "No token"
        })
    }

    jwt.verify(accesstoken , process.env.JW_SECRET as string , (error , decode )=>{
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