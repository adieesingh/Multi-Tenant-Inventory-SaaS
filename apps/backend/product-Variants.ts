import { middleware } from './middleware';
import { ProductVariantsSchema } from "@repo/common/validation";
import { prismaClient } from "@repo/db/client";
import express from "express"

export const productVariantsRouter= express.Router();

productVariantsRouter.post("/",middleware,async(req,res)=>{
        try {
            const productVariantsPayLoad = ProductVariantsSchema.safeParse(req.body);
            if(!productVariantsPayLoad.success){
                return res.status(400).json({
                    message:"Data is not valid format",
                    error:productVariantsPayLoad.error
                })
            }
            await prismaClient.product_Variants.create({
                data:{
                    productId:productVariantsPayLoad.data.productId,
                    size:productVariantsPayLoad.data.size,
                    color:productVariantsPayLoad.data.color,
                    stockQuantity:productVariantsPayLoad.data.stockQuantity,
                    orgiantionsId:req.userId
                }
            }).then(()=>{
                return res.status(200).json({
                    message:"Data is succesfully"
                })
            }).catch((error)=>{
                return res.status(400).json({
                    message:"Data doesnt eneter",
                    error:error
                })
            })
        } catch (error) {
           return res.status(500).json({
            message:"Internal Server down"
           }) 
        }
})

productVariantsRouter.get("/",middleware,async(req,res)=>{
        try {
      const response = await prismaClient.product_Variants.findMany();
      if(response){
        return res.status(200).json({
            message:response
        })
      }
        if(!response){
            return res.status(400).json({
               message:"Didnt Find"     
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server down"
        })
    }
})

productVariantsRouter.patch("/:id",middleware,async(req,res)=>{
     try {
      const {id}= req.params;
      const updateBody = req.body;

      const response = await prismaClient.product_Variants.update({
        where:{
            id:Number(id)
        },
        data:updateBody
      })
        if(!response){
            return res.status(400).json({
                message:"Dont updated"
            })
        }
        if(response){
            return res.status(200).json({
                message:"Updated sucessfulluy"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server down"
        })
    }
});
//delete
productVariantsRouter.delete("/:id",async(req,res)=>{
     try {
     const {id}= req.params;
     
     const response = await prismaClient.product_Variants.delete({
        where:{
            id:Number(id)
        }
     }) 
    if(response){
        return res.status(200).json({
            message:"Deleted succesfully"
        })
    }
    if(!response){
        return res.status(400).json({
            message:"Not deleted"
        })
    }
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server down"
        })
    }
})