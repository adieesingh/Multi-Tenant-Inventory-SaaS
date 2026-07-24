"use client";
import { AspectRatioPortrait } from "@/components/ui/aspect-ratio";
import { ButtonLink } from "@/components/ui/button";
import { FieldInput } from "@/components/ui/field";
import { Text } from "@/components/ui/text";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginForm, signinUser } from "@repo/common/validation";
import axios from "axios";

import { toast } from "sonner";
import { Router } from "next/router";

export default function LoginPage() {
  const router = Router;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(signinUser),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleLogin = async (data: LoginForm) => {
    try {
      const response = await axios.post(
        `{process.env.NEXT_PUBLIC_API_URL}/user/login`,
        data,
      );
      if (response) {
        toast.success(response.data.message);
        
      }
      if (response.status == 400) {
        toast.error(response.data.message);
        
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Login Failed");
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-full max-w-md flex flex-col items-center bg-white space-y-6 border shadow-lg rounded-2xl px-6 py-6"
      >
        <AspectRatioPortrait
          alt="logo"
          
          ratio={16 / 9}
          src="/logo.png"
        ></AspectRatioPortrait>
        <h2 className="text-4xl font-bold text-gray-900 text-center">
          
          Sign in your Account
        </h2>
        <p className="text-center text-gray-500">
          Welcome back! Please sign in.
        </p>
        <FieldInput
          id="email"
          label="Email"
          disabled={isSubmitting}
          autoComplete="email"
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
          autoComplete="current-password"
          disabled={isSubmitting}
          placeholder="••••••••"
          {...register("password")}
          type="password"
        ></FieldInput>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
        <ButtonLink
          variant={"primary"}
          type="submit"
          text={isSubmitting ? "⏳ Logging in..." : "Login"}
          disabled={isSubmitting}
        ></ButtonLink>
        <Text
          href="/signup"
          text="Don't have an account?"
          label="Signup"
        ></Text>
      </form>
    </main>
  );
}
