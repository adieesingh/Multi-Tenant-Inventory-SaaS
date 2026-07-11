import { middleware } from './middleware';
import { PurchaseOrderItemSchema } from "@repo/common/validation";
import { prismaClient } from "@repo/db/client";
import express from "express"

export const purchaseOrderItemRouter = express.Router();
// post
purchaseOrderItemRouter.post("/",middleware,async(req,res)=>{
    try {
        const purchaseOrderItemPayLoad = PurchaseOrderItemSchema.safeParse(req.body);
        if(!purchaseOrderItemPayLoad.success){
            return res.status(400).json({
                messsage:"Dta is not valid",
                error:purchaseOrderItemPayLoad.error
            })
        }
        const total = purchaseOrderItemPayLoad.data.quantity*purchaseOrderItemPayLoad.data.unitCost;
        await prismaClient.purchase_Order_Item.create({
            data:{
                purchaseOrderId:purchaseOrderItemPayLoad.data.purchaseOrderId,
                productVariantId:purchaseOrderItemPayLoad.data.productVariantId,
                quantity:purchaseOrderItemPayLoad.data.quantity,
                unitCost:purchaseOrderItemPayLoad.data.unitCost,
                subtotal:total
            }
        }).then(()=>{
            return res.status(200).json({
                message:"Data store sucesfully"
            })
        }).catch((error)=>{
            return res.status(400).json({
                message:"Data is not store"
            })
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server down"
        })
    }
})
// patch
purchaseOrderItemRouter.patch("/:id",middleware,async(req,res)=>{
     try {
      const {id}= req.params;
      const updateBody = req.body;
      const response = await prismaClient.purchase_Order_Item.update({
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
            message:"Update not succesfuuly"
        })
      }
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server down"
        })
    }
})
// get
purchaseOrderItemRouter.get("/",middleware,async(req,res)=>{
     try {
     const response = await prismaClient.purchase_Order_Item.findMany();
     if(response){
        return res.status(200).json({
            message:response
        })
     }  
     if(!response){
        return res.status(400).json({
            message:"Didnt get"
        })
     } 

    } catch (error) {
        return res.status(500).json({
            message:"Internal Server down"
        })
    }
})
// delete
purchaseOrderItemRouter.delete("/:id",middleware,async(req,res)=>{
     try {
     const {id}= req.params;
     
     
     const response = await prismaClient.purchase_Order_Item.delete({
        where:{
            id:Number(id)
        }
     })
     if(response){
        return res.status(200).json({
            nmessage:"Deleetd succesfully"
        })
     }
     if(!response){
        return res.status(400).json({
            message:"Not deleted succesfully"
        })
     }
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server down"
        })
    }
})