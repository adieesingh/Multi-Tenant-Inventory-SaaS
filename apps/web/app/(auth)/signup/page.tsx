import Link from "next/link";
import { OrganizationForm } from "@/components/OrganizationForm";

export default function SignupPage() {
  return (
    <div>
      <h1 className="font-display text-[20px] font-semibold text-ink">Create your organization</h1>
      <p className="mt-1 mb-6 text-[13px] text-ink-500">
        This sets up your workspace and your login — you can invite staff afterward.
      </p>

      <OrganizationForm mode="signup" />

      <p className="mt-5 text-center text-[13px] text-ink-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-accent-600 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
