import { ProductVariantsSchema } from "@repo/common/validation";
import { prismaClient } from "@repo/db/client";
import express from "express"

export const productVariantsRouter= express.Router();

productVariantsRouter.post("/",async(req,res)=>{
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