import {  PurchaseOrderSchema } from "@repo/common/validation";
import { prismaClient } from "@repo/db/client";
import express from "express"

export const purchaseOrderRouter= express.Router();

purchaseOrderRouter.post("/",async(req,res)=>{
    try {
        const purchaseOrderPayLoad = PurchaseOrderSchema.safeParse(req.body);
        if(!purchaseOrderPayLoad.success){
            return res.status(400).json({
                message:"Data is not valid format"
            })
        }
        await prismaClient.purchase_Order.create({
            data:{
                supplierId:purchaseOrderPayLoad.data.supplierId,
                totalAmount:purchaseOrderPayLoad.data.totalAmount,
                status:purchaseOrderPayLoad.data.status,
                organizationId:
            }
        }).then(()=>{
            return res.status(200).json({
                message:"Data is succesfully"
            })
        }).catch((error)=>{
                return res.status(400).json({
                    message:"Data doesnt store",
                    error:error
                })
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server down"
        })
    }
})