import { CategoriesSchema } from "@repo/common/validation";
import { prismaClient } from "@repo/db/client";
import express from "express";

export const categoriesRouter = express.Router();

categoriesRouter.post("/", async (req, res) => {
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
            organizationId:
        }
    })
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server down",
      error: error,
    });
  }
});
