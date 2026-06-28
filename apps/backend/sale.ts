import { SalesSchema } from "@repo/common/validation";
import { prismaClient } from "@repo/db/client";
import express from "express";

export const saleRouter= express.Router();

saleRouter.post("/",async(req,res)=>{
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
              organizationsId:

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