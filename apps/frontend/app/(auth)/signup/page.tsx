"use client";
import { useForm } from "react-hook-form";
import { SignupPage, SignupSchema } from "@repo/common/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AspectRatioPortrait } from "@/components/ui/aspect-ratio";
import { FieldInput } from "@/components/ui/field";
import { ButtonLink } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupPage>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });
  const handleSignup = async (data: SignupPage) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/`,
        data,
        {
          withCredentials: true,
        },
      );
      if (response.status == 201) {
        toast.success(response.data.message);
        router.push("/dashboard");
      }
      if (response.status == 401) {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className=" w-full max-w-md bg-white shadow-lg rounded-2xl">
        <form
          onSubmit={handleSubmit(handleSignup)}
          className="space-y-6 max-w-md w-full items-center flex flex-col"
        >
          <AspectRatioPortrait
            alt="Logo"
            ratio={16 / 9}
            src="/logo.png"
          ></AspectRatioPortrait>
          <h2 className="text-gray-900 text-center text-4xl font-bold">
            Signup
          </h2>
          <p className="text-gray-500 text-center text-sm">Please ! Sign Up</p>
          <FieldInput
            id="name"
            disabled={isSubmitting}
            label="Name"
            placeholder="John"
            type="text"
            {...register("name")}
          ></FieldInput>
          {errors.name && <p>{errors.name.message}</p>}
          <FieldInput
            id="email"
            label="Email"
            placeholder="john@exapmle.com"
            type="email"
            {...register("email")}
          ></FieldInput>
          <FieldInput
            id="password"
            label="Password"
            placeholder="•••••••"
            type="password"
            {...register("password")}
          ></FieldInput>
          <ButtonLink
            disabled={isSubmitting}
            text={isSubmitting ? "Signup .." : "Signup"}
            type="submit"
            variant={"primary"}
            
          ></ButtonLink>
        </form>
      </div>
    </main>
  );
}
