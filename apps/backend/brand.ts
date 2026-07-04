import { middleware } from './middleware';
import { BrandsSchema } from "@repo/common/validation";
import { prismaClient } from "@repo/db/client";
import express from "express"
export const brandRouter = express.Router();


brandRouter.post("/",middleware,async(req,res)=>{
    try {
       const brandPayLoad = BrandsSchema.safeParse(req.body);
       if(!brandPayLoad.success){
        return res.status(400).json({
            message:"Data doent valid"
        })
       } 

       await prismaClient.brands.create({
        data:{
          name:brandPayLoad.data.name,
          organizationId:req.userId  
        }
       }).then(()=>{
        return res.status(200).json({
            message:"Data doesnt succesfully"
        })
       }).catch((error)=>{
            return res.status(400).json({
                message:"Data doesnt succesfully",
                error
            })
       })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server down"
        })        
    }
})