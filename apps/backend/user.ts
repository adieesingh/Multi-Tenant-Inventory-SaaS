import { middleware } from './middleware';
import { signinUser, UserSchmea } from "@repo/common/validation";
import { prismaClient } from "@repo/db/client";
import express from "express";

export const userRouter = express.Router();
// post
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
            role:userPayLoad.data.role || "OWNER",
            organizationId:req.userId || "1"
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
// get
userRouter.get("/",middleware,async(req,res)=>{
     try {
     const response = await prismaClient.user.findMany();
     if(response){
        return res.status(200).json({
            message:response
        })
     } 
     if(!response){
        return res.status(400).json({
            message:"Not get ❌"
        })
     }
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server down"
        })
    }
})
// delete
userRouter.delete("/:id",middleware,async(req,res)=>{
     try {
     const {id}= req.params;
     const response = await prismaClient.user.delete({
        where:{
            id:Number(id)
        }
     }) 
     if(response){
        return res.status(200).json({
          message:"Deleted ✅"  
        })
     }
     if(response){
        return res.status(400).json({
            message:"Not Deleted ❌"
        })
     }
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server down"
        })
    }
})
// patch
userRouter.patch("/:id",middleware,async(req,res)=>{
     try {
     const {id}= req.params;
     const updateBody = req.body 
     const response = await prismaClient.user.update({
        where:{
            id:Number(id)
        },
        data:updateBody
     })
     if(response){
        return res.status(200).json({
            message:"Updated sucesffully ✅"
        })
     }
     if(!response){
        return res.status(400).json({
            message:"Not updated ❌"
        })
     }
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server down"
        })
    }
})

userRouter.post("/login",async(req,res)=>{
    try {
        const signinPayLoad = signinUser.safeParse(req.body);
        if(!signinPayLoad){
            return res.status(400).json({
                message:"Data doesnt valid"
            })
        }
        const response = await prismaClient.user.findFirst({
            where:{
                email:signinPayLoad.data?.email
            }
        })
        if(!response){
            return res.status(400).json({
                message:"Email not exist! please sign up"
            })
        }
      
        if(response.password !== signinPayLoad.data?.password){
          return res.status(400).json({
            message:"Password doestn match"
          })
        }
       return res.status(200).json({
        message:"Login sucessfully"
       })
    } catch (error) {
        return res.status(500).json({
            message:error
        })
    }
})