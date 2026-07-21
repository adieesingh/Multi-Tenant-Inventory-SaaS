import express from "express";
import { OrganizationSchema } from "@repo/common/validation";
import { prismaClient } from "@repo/db/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { middleware } from "./middleware";
dotenv.config({ path: "../../.env" });
export const organizationRouter = express.Router();

organizationRouter.post("/", async (req, res) => {
  try {
    const organizationPayLoad = OrganizationSchema.safeParse(req.body);
    if (!organizationPayLoad.success) {
      return res.status(400).json({
        message: "Data not format",
      });
    }

    const response = await prismaClient.organizations.create({
      data: {
        name: organizationPayLoad.data.name,
        
        phoneNumber: organizationPayLoad.data.phoneNumber,
        address: organizationPayLoad.data.address,
       
      },
    });
    if (!response) {
      return res.status(400).json({
        message: "Organization not added",
      });
    }
    if (response) {
      const token = jwt.sign(
        { id: response.id },
        process.env.JWT_SECRET as string,
      );
      return res.status(200).cookie("token", token).json({
        message: "Organization added succesfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error:error
    });
  }
});
organizationRouter.get("/",middleware,async(req,res)=>{
     try {
      const response = await prismaClient.organizations.findMany();
      if(response){
        return res.status(200).json({
          message:response
        })
      }
      if(!response){
        return res.status(400).json({
          message:"Not Found"
        })
      }
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server down"
        })
    }
})

organizationRouter.patch("/:id",middleware,async(req,res)=>{
   try {
      const {id} = req.params;
      const updatedBody= req.body;
      const response = await prismaClient.organizations.update({
      where:{
        id:String(id)
      },
      data:updatedBody
      })
      if(response){
        return res.status(200).json({
          message:"Update succesfully"
        })
      }
      if(!response){
        return res.status(400).json({
          message:"Dont update "
        })
      }
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server down"
        })
    }
})