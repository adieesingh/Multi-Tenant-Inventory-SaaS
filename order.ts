import { OrderSchema } from "@repo/common/validation";
import { prismaClient } from "@repo/db/client";
import express from "express"


export const orderRouter = express.Router();

orderRouter.post("/",async(req,res)=>{
    try {
        const orderPayLoad = OrderSchema.safeParse(req.body);
        if(!orderPayLoad.success){
            return res.status(400).json({
                message:"Data doesnt valid"
            })
        }
        await prismaClient.order.create({
            data:{
                name:orderPayLoad.data.name,
                organizationId:req.userId
            }
        }).then(()=>{
            return res.status(200).json({
                message:"Data enter succesfully"
            })
        }).catch((error)=>{
            return res.status(400).json({
             message:"Data doesnt eneter",
            error
            })
        })
    } catch (error) {
        return res.status(500).json({
            message:"Data is not valid",
            error:error
        })
    }
})

