import { middleware } from './middleware';
import express from "express";
import {ProductsSchema} from "@repo/common/validation"
import {prismaClient} from "@repo/db/client"
export const productRouter = express.Router();

productRouter.post("/",middleware,async(req,res)=>{
    try {
        const productPayLoad =  ProductsSchema.safeParse(req.body);
        if(!productPayLoad.success){
            return res.status(400).json({
                message:"Data doesnt valid",
                error:productPayLoad.error
            })
        }
        await prismaClient.products.create({
            data:{
            name:productPayLoad.data.name,
            sku:productPayLoad.data.sku,
            description:productPayLoad.data.description,
            brandId:productPayLoad.data.brandId,
            categoryId:productPayLoad.data.categorytId,
            costPrice:productPayLoad.data.costPrice,
            sellingPrice:productPayLoad.data.sellingPrice,
            organizationId:req.userId
            }
         
        
        }).then(()=>{
            return res.status(200).json({
                message:"Data enter sucessfully"
            })
        }).catch((error)=>{
            return res.status(400).json({
                message:"Data doesnt enter ",
                error:error
            })
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server down"
        })
    }
})