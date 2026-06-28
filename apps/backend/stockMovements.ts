import { StockMovementsSchema } from "@repo/common/validation";
import { prismaClient } from "@repo/db/client";
import express from "express";

export const stockMovementsRouter= express.Router();

stockMovementsRouter.post("/",async(req,res)=>{
       try {
        const stockMovementsPayLoad = StockMovementsSchema.safeParse(req.body);
        if(!stockMovementsPayLoad.success){
            return res.status(400).json({
                message:"Data is not valid"
            })
        }
        await prismaClient.stock_Movements.create({
            data:{
                productVariantId:stockMovementsPayLoad.data.productVariantId,
                type:stockMovementsPayLoad.data.type,
                quantity:stockMovementsPayLoad.data.quantity,
                purchaseOrderId:stockMovementsPayLoad.data.purchaseOrderId,
                organizationId:
            }
        }).then(()=>{
            return res.status(200).json({
                message:"data is succesfuuly"
            })
        }).catch((error)=>{
            return res.status(400).json({
                message:"data is not store",
                error:error
            })
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server down",
            error:error
        })
    }

})