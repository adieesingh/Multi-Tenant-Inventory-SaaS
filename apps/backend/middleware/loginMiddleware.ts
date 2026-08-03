import  jwt  from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";

export const LoginMiddleware =(req:Request,res:Response,next:NextFunction)=>{
        try {
            const token = req.cookies.loginToken
            if(!token){
                return res.status(401).json({
                    messsage:"Token Not Found"
                })
            }
            const authHeader = token.startsWith("Bearer ")?token.subString(7):token;
            const decode = jwt.verify(authHeader,process.env.JWT_SECRET_LOGIN!)
            if(decode){
                 next(); 
            }
            if(!decode){
                return res.status(201).json({
                    message:"Token not verify"
                })
            }    
        } catch (error) {
            return res.status(500).json({
                message:"Internal Server down"
            })
        }
}