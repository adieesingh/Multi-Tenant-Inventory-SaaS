"use client"
import { AspectRatio, AspectRatioPortrait } from "@/components/ui/aspect-ratio";
import { ButtonLink } from "@/components/ui/button";
import { FieldInput } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrganizationPage, OrganizationSchema } from "@repo/common/validation";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function Organization(){
    const {register,
        handleSubmit,
        formState: {errors,isSubmitting}
    } = useForm<OrganizationPage>({
        resolver:zodResolver(OrganizationSchema),
        defaultValues:{
            address:"",
            name:"",
            phoneNumber:""
           
        }
    })
    const handleOrganizations = ()=>{
            try {
                
            } catch (error) {
               
            }
    }
    return(
        <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <form onSubmit={handleSubmit(handleOrganizations)} className="w-full max-w-md bg-white flex flex-col px-6 py-6 space-y-4 shadow-lg items-center rounded-2xl">
                <AspectRatioPortrait
               
                ratio={16/9}
                src="/logo.png"
                alt="logo"                    
                ></AspectRatioPortrait>
                <h2 className="text-center text-gray-900 text-4xl font-bold">Add Organization</h2>
                <FieldInput
                label="Organizations Name"
                placeholder="Enter a Name"
                id="name"
                type="text"
                {...register("name")}
                ></FieldInput>
                {errors.name &&(
                    <p className="text-sm text-red-500 text-start">{errors.name.message}</p>
                )}
                <FieldInput
                id="phoneNumber"
                label="Organizations Number"
                placeholder="+919900228201"
                type="tel"
                {...register("phoneNumber")}
                ></FieldInput>
                 {errors.phoneNumber &&(
                    <p className="text-sm text-red-500 text-start">{errors.phoneNumber.message}</p>
                )}
                <FieldInput
                type="text"
                id="address"
                label="Adress"
                placeholder="SH-3,Tanavi Complex"
                {...register("address")}
                ></FieldInput>
                 {errors.name &&(
                    <p className="text-sm text-red-500 text-start">{errors.address?.message}</p>
                )}
               <ButtonLink
                 text="Add a Organization"
                 disabled={isSubmitting}
                 type="submit"
                variant={"primary"}
               
               ></ButtonLink>
            </form>
        </main>
    )
}