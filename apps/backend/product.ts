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

//get
productRouter.get("/",middleware,async(req,res)=>{
     try {
      const response = await prismaClient.products.findMany();
      if(response){
        return res.status(200).json({
            message:response
        })
      }
      if(!response){
        return res.status(400).json({
            message:"Dont get "
        })
      }

    } catch (error) {
        return res.status(500).json({
            message:"Internal Server down"
        })
    }
})

// patch
productRouter.patch("/:id",middleware,async(req,res)=>{
     try {
     const {id}= req.params;
     const updateBody = req.body;
     const response = await prismaClient.products.update({
        where:{
            id:Number(id)
        },
        data:updateBody
     }) 
     if(response){
        return res.status(200).json({
            message:"updated succesfully"
        })
     }
     if(!response){
        return res.status(400).json({
            message:"Updated not succesfully"
        })
     }
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server down"
        })
    }
})

// delete

productRouter.delete("/:id",middleware,async(req,res)=>{
     try {
     const {id}= req.params;
     const response = await prismaClient.products.delete({
        where:{
            id:Number(id)
        }
     }) 
     if(response){
        return res.status(400).json({
            message:"Deleted sucesfully"
        })
     }
     if(!response){
        return res.status(200).json({
            message:"Not deleted"
        })
     }
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server down"
        })
    }
})