import { AspectRatioPortrait } from "@/components/ui/aspect-ratio";
import { ButtonLink } from "@/components/ui/button";
import { FieldInput } from "@/components/ui/field";
import { Text } from "@/components/ui/text";
import axios from "axios"
export  default async function LoginPage() {
  const handleLogin = await axios.post("http://localhost:3000/addUser")
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-max-md flex flex-col items-center bg-white space-y-6 border shadow-lg rounded-2xl px-6 py-6">
        
        <AspectRatioPortrait alt="logo" ratio={16/9} src="/logo.png"></AspectRatioPortrait>
        <h2 className="text-4xl font-bold text-gray-900"> Sign in your Account</h2>
        <p className="text-center text-gray-500">Welcome back! Please sign in.</p>
        <FieldInput
          id="email"
          label="Email"
          placeholder="John@example.com"
         
          type="text"
        ></FieldInput>

        <FieldInput
          id="password"
          label="Password"
          placeholder="••••••••"
         
          type="password"
        ></FieldInput>
        <ButtonLink variant={"primary"} text="Sign In"></ButtonLink>
        <Text href="/signup" text="Don't have an account?" label="Signup"></Text>
      </div>
    </main>
  );
}
