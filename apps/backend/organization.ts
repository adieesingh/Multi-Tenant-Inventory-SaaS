import express from "express"
import {OrganizationSchema} from "@repo/common/validation"
import {prismaClient} from "@repo/db/client"
export const organizationRouter = express.Router();

organizationRouter.post("/api/addOrganizations",async(req,res)=>{
    try {
     const organizationPayLoad = OrganizationSchema.safeParse(req.body)
     if(!organizationPayLoad.success){
        return res.status(400).json({
        "message":"Data not format"
        })
     }
     await prismaClient.organizations.create({
        data:{
            name:organizationPayLoad.data.name,
            username:organizationPayLoad.data.username,
            phoneNumber:organizationPayLoad.data.phoneNumber,
            address:organizationPayLoad.data.address,
            password:organizationPayLoad.data.password

        }
     }).then(()=>{
        return res.status(200).json({
            message:"Organization added succesfully"
        })
     }).catch((error)=>{
        return res.status(400).json({
            "message":"Data deoesnt store"
        })
     })
        
    } catch (error) {
        return res.status(500).json({
            message:"Something went wrong"
        })
    }
})


