"use client";
import {  AspectRatioPortrait } from "@/components/ui/aspect-ratio";
import { ButtonLink } from "@/components/ui/button";
import { FieldInput } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrganizationPage, OrganizationSchema } from "@repo/common/validation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Organization() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrganizationPage>({
    resolver: zodResolver(OrganizationSchema),
    defaultValues: {
      address: "",
      name: "",
      phoneNumber: "",
    },
  });
  const handleOrganizations = async (data: OrganizationPage) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/addOrganizations/`,
        data,
        {
            withCredentials:true
        }
      );
      if (response.status == 200) {
        toast.success(response.data.message);
        router.push("/signup");
      }
      if (response.status == 400) {
        toast.error(response.data.message || "Add Organizatio n failed");
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
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit(handleOrganizations)}
        className="w-full max-w-md bg-white flex flex-col px-6 py-6 space-y-4 shadow-lg items-center rounded-2xl"
      >
        <AspectRatioPortrait
          ratio={16 / 9}
          src="/logo.png"
          alt="logo"
        ></AspectRatioPortrait>
        <h2 className="text-center text-gray-900 text-4xl font-bold">
          Create your organization to get started.
        </h2>
        <p className="text-center text-gray-500 font-black">
          You'll create your owner account next.
        </p>
        <FieldInput
          label="Organizations Name"
          placeholder="Enter a Name"
          id="name"
          disabled={isSubmitting}
          autoComplete="organization"
          type="text"
          {...register("name")}
        ></FieldInput>
        {errors.name && (
          <p className="text-sm text-red-500 text-start">
            {errors.name.message}
          </p>
        )}
        <FieldInput
          id="phoneNumber"
          disabled={isSubmitting}
          label="Organizations Number"
          placeholder="+919900228201"
          type="tel"
          autoComplete="tel"
          {...register("phoneNumber")}
        ></FieldInput>
        {errors.phoneNumber && (
          <p className="text-sm text-red-500 text-start">
            {errors.phoneNumber.message}
          </p>
        )}
        <FieldInput
          type="text"
          id="address"
          label="Adress"
          disabled={isSubmitting}
          autoComplete="street-address"
          placeholder="SH-3,Tanavi Complex"
          {...register("address")}
        ></FieldInput>
        {errors.address && (
          <p className="text-sm text-red-500 text-start">
            {errors.address?.message}
          </p>
        )}
        <ButtonLink
          text={isSubmitting ? "Creating.." : "Creating a Organization"}
          disabled={isSubmitting}
          type="submit"
          className="w-full max-w-md bg-blue-500 hover:bg-blue-900 hover:cursor-pointer"
        ></ButtonLink>
        <p className="text-sm text-muted-foreground text-center hover:cursor-pointer">
          Already create your organization?{" "}
          <Link
            href="/signup"
            className="font-medium text-primary hover:underline"
          >
            Continue to owner signup
          </Link>
        </p>
      </form>
    </main>
  );
}
