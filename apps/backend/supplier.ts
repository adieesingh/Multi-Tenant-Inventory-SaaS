import { middleware } from './middleware';
import { SupplierSchema } from "@repo/common/validation";
import { prismaClient } from "@repo/db/client";
import express from "express"

export const supplierRouter = express.Router();

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