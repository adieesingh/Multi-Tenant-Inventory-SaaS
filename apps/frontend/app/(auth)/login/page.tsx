"use client"
import { AspectRatioPortrait } from "@/components/ui/aspect-ratio";
import { ButtonLink } from "@/components/ui/button";
import { FieldInput } from "@/components/ui/field";
import { Text } from "@/components/ui/text";
import {SonnerPosition}from "@/components/ui/sonner"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {LoginForm, signinUser} from "@repo/common/validation"
import axios from "axios"
import { toast } from "sonner";
export  default  function LoginPage() {
  const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm<LoginForm>({
        resolver:zodResolver(signinUser),
        defaultValues:{
          "email":"",
          "password":""
        }
  })
  const handleLogin = async(data:LoginForm)=>  {
    try {
        const response= await axios.post("http://localhost:3001/api/user/login",data)
   if(response){
        
        //<SonnerPosition onClick={()=> toast.success("Login sucessfully"),{postion:"text"}}>
   }
   if(!response){
    console.log("Not login")
   }
    } catch (error) {
      console.log(error)
    }
 
  }
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <form method="POST"  onSubmit={handleSubmit(handleLogin)}  className="w-max-md flex flex-col items-center bg-white space-y-6 border shadow-lg rounded-2xl px-6 py-6">
        
        <AspectRatioPortrait alt="logo" ratio={16/9} src="/logo.png"></AspectRatioPortrait>
        <h2 className="text-4xl font-bold text-gray-900"> Sign in your Account</h2>
        <p className="text-center text-gray-500">Welcome back! Please sign in.</p>
        <FieldInput
          id="email"
          label="Email"
          placeholder="John@example.com"
          {...register("email")}
         
          type="text"
        ></FieldInput>
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
        <FieldInput
          id="password"
          label="Password"
          placeholder="••••••••"
          {...register("password")}
          type="password"
        ></FieldInput>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
        <ButtonLink variant={"primary"} type="submit" text= {isSubmitting ? "Logging in..." : "Login"} disabled={isSubmitting}>
        </ButtonLink>
        <Text href="/signup" text="Don't have an account?" label="Signup"></Text>
      </form>
    </main>
  );
}
