import { middleware } from './middleware';
import {  PurchaseOrderSchema } from "@repo/common/validation";
import { prismaClient } from "@repo/db/client";
import express from "express"
import { productRouter } from './product';

export const purchaseOrderRouter= express.Router();

purchaseOrderRouter.post("/",middleware,async(req,res)=>{
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
                organizationId:req.userId
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

// get
purchaseOrderRouter.get("/",middleware,async(req,res)=>{
     try {
      const response = await prismaClient.purchase_Order.findMany();
      if(response){
        return res.status(200).json({
            message:response
        })
      }
      if(!response){
        return res.status(400).json({
            message:"Dont get"
        })
      }

    } catch (error) {
        return res.status(500).json({
            message:"Internal Server down"
        })
    }
})
//patch
productRouter.patch("/:id",middleware,async(req,res)=>{
     try {
     const {id}= req.params;
     const updateBody = req.body;
     const response = await prismaClient.purchase_Order.update({
        where:{
            id:Number(id)
        },
        data:updateBody
     }) 
     if(response){
        return res.status(200).json({
            message:"Updated succesfully"
        })
     }
     if(!response){
        return res.status(400).json({
            message:"Not updated"
        })
     }
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server down"
        })
    }
})