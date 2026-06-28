import { UserSchmea } from "@repo/common/validation";
import { prismaClient } from "@repo/db/client";
import express from "express";

export const userRouter = express.Router();

userRouter.post("/",async(req,res)=>{
try {
    const userPayLoad = UserSchmea.safeParse(req.body);
    if(!userPayLoad.success){
        return res.status(400).json({
            message:"Data doesnt valid"
        })
    }
    await prismaClient.user.create({
        data:{
            name:userPayLoad.data.name,
            email:userPayLoad.data.email,
            password:userPayLoad.data.password,
            role:userPayLoad.data.role,
            organizationId:req.
        }
    }).then(()=>{
        return res.status(200).json({
            message:"Data eneter succesfully"
        })
    }).catch((error)=>{
        return res.status(400).json({
            message:"Data doesnyt eneter",
            error
        })
    })

} catch (error) {
    return res.status(500).json({
        message:"Intenval server down",
        error:error
    })
}
})
