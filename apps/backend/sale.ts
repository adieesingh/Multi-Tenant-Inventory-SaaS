import { middleware } from './middleware';
import { SalesSchema } from "@repo/common/validation";
import { prismaClient } from "@repo/db/client";
import express from "express";

export const saleRouter= express.Router();
// post
saleRouter.post("/",middleware,async(req,res)=>{
    try {
        const salePayLoad = SalesSchema.safeParse(req.body);
        if(!salePayLoad.success){
            return res.status(400).json({
                messsage:"Invalid data"
            })
        }
        await prismaClient.sales.create({
            data:{
              invoiceNumber:salePayLoad.data.invoiceNumber,
              customerName:salePayLoad.data.customerName,
              totalAmount:salePayLoad.data.totalAmount,
              organizationsId:req.userId

            }
        }).then(()=>{
            return res.status(400).json({
                message:"Data store sucesfully"
            })
        }).catch((error)=>{
            return res.status(400).json({
                message:"Dta  doesnt store",
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

// get
saleRouter.get("/",middleware,async(req,res)=>{
     try {
      const response = await prismaClient.sales.findMany();
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

// patch
saleRouter.patch("/:id",middleware,async(req,res)=>{
    try {
        const {id}= req.params;
        const updateBody = req.body;
        const response = await prismaClient.sales.update({
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

// delete
saleRouter.delete("/:id",middleware,async(req,res)=>{
     try {
      const {id}= req.params;
      const response = await prismaClient.sales.delete({
        where:{
            id:Number(id)
        }
      })
      if(response){
        return res.status(200).json({
            message:response
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