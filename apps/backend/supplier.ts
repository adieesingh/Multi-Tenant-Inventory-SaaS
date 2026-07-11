import { middleware } from './middleware';
import { SupplierSchema } from "@repo/common/validation";
import { prismaClient } from "@repo/db/client";
import express from "express"

export const supplierRouter = express.Router();
//post
supplierRouter.post("/",middleware,async(req,res)=>{
    try {
        const supplierPayLoad = SupplierSchema.safeParse(req.body);
        if(!supplierPayLoad.success){
            return res.status(400).json({
                message:"data doesnt valid"
            })
        }
        await prismaClient.supplier.create({
            data:{
                name:supplierPayLoad.data.name,
                email:supplierPayLoad.data.email,
                phone:supplierPayLoad.data.phone,
                address:supplierPayLoad.data.address,
                gstNumber:supplierPayLoad.data.gstNumber,
                organizationId:req.userId ,

            }
        }).then(()=>{
            return res.status(200).json({
                message:"Data eneter succesfully"
            })
        }).catch((error)=>{
            return res.status(400).json({
                message:"Data is in valid",
                error
            })
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server down"
        })        
    }
})

// get
supplierRouter.get("/",middleware,async(req,res)=>{
     try {
     const response = await prismaClient.supplier.findMany() 
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
// path
supplierRouter.patch("/:id",middleware,async(req,res)=>{
     try {
     const {id}= req.params;
     const updateBody = req.body;
     const response = await prismaClient.supplier.update({
        where:{
            id:Number(id)
        },
        data:updateBody
     }) 
     if(response){
        return res.status(200).json({
            message:"Upadted succesfully"
        })
     }
     if(!response){
        return res.status(400).json({
            message:"Not Updated"
        })
     }
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server down"
        })
    }
})
//delete
supplierRouter.delete("/:id",middleware,async(req,res)=>{
     try {
        const {id}= req.params;
        
        const response = await prismaClient.sales.delete({
            where:{
                id:Number(id)
            }
        })
        if(response){
            return res.status(200).json({
                message:"Delete sucesfuuly ✅"
            })
        }
        if(!response){
            return res.status(400).json({
                message:"Not deleted ❌"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server down"
        })
    }
})