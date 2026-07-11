import { middleware } from './middleware';
import { BrandsSchema } from "@repo/common/validation";
import { prismaClient } from "@repo/db/client";
import express from "express"
export const brandRouter = express.Router();


brandRouter.post("/",middleware,async(req,res)=>{
    try {
       const brandPayLoad = BrandsSchema.safeParse(req.body);
       if(!brandPayLoad.success){
        return res.status(400).json({
            message:"Data doent valid"
        })
       } 

       await prismaClient.brands.create({
        data:{
          name:brandPayLoad.data.name,
          organizationId:req.userId  
        }
       }).then(()=>{
        return res.status(200).json({
            message:"Data succesfully  added",
           
        })
       }).catch((error)=>{
            return res.status(400).json({
                message:"Data doesnt succesfully",
                error
            })
       })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server down"
        })        
    }
})
brandRouter.get("/",middleware,async(req,res)=>{
    try {
      const response =await prismaClient.brands.findMany();
      if(response){
        return res.status(200).json({
            message:response
        })
      }
      if(!response){
        return res.status(400).json({
            message:"Didnt find "
        })
      }  
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Down"
        })
    }
});

brandRouter.patch("/:id",middleware,async(req,res)=>{
    try {
      const {id} = req.params;
      const updateData = req.body;
      const response = await prismaClient.brands.update({
        where:{
            id:Number(id)
        },
        data:updateData
      })
      if(!response){
        return res.status(400).json({
            message:"Couldnt update it"
        })
      }
      if(response){
        return res.status(200).json({
            message:"Update succesfully"
        })
      }
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server down"
        })
    }
});

brandRouter.delete("/:id",async(req,res)=>{
     try {
      const {id}= req.params;
      const response = await prismaClient.brands.delete({
        where:{
            id:Number(id)
        }
      })
      if(!response){
        return res.status(400).json({
            message:"Not Deleted"
        })
      }
      if(response){
        return res.status(200).json({
            message:"Deletd succesfully"
        })
      }
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server down"
        })
    }
})