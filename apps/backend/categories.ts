import { CategoriesSchema } from "@repo/common/validation";
import { prismaClient } from "@repo/db/client";
import express from "express";
import { middleware } from "./middleware";

export const categoriesRouter = express.Router();

categoriesRouter.post("/",middleware, async (req, res) => {
  try {
    const categoriesPayLoad = CategoriesSchema.safeParse(req.body);
    if(!categoriesPayLoad.success){
        return res.status(400).json({
            message:"data is not valid"
        })
    }
    await prismaClient.categories.create({
        data:{
            name:categoriesPayLoad.data.name,
            organizationId:req.userId
        }
    }).then(()=>{
      return res.status(200).json({
        mmessage:"Data sucesfully"
      })
    }).catch((error)=>{
     return res.status(400).json({
      message:error
     })
    })
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server down",
      error: error,
    });
  }
});

categoriesRouter.get("/",middleware,async(req,res)=>{
   try {
      const response = await prismaClient.categories.findMany();
        if(!response){
          return res.status(400).json({
            message:"Couldnt find"
          })
        }
        if(response){
          return res.status(200).json({
            message:response
          })
        }
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server down"
        })
    }
})