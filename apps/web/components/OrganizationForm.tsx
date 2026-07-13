"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button, FormField, Input } from "@multi-inv/ui";
import { signup, type SignupPayload } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/http";

const emptyForm: SignupPayload = {
  name: "",
  phoneNumber: "",
  username: "",
  password: "",
  address: "",
};

export function OrganizationForm({
  mode = "signup",
}: {
  /** "signup" redirects to /login on success, "create" redirects to /dashboard. */
  mode?: "signup" | "create";
}) {
  const router = useRouter();
  const [form, setForm] = useState<SignupPayload>(emptyForm);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof SignupPayload>(key: K, value: SignupPayload[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (form.password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setSubmitting(true);
    try {
      await signup(form);
      router.push(mode === "signup" ? "/login" : "/dashboard");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-danger-50 px-3.5 py-2.5 text-[13px] text-danger-700 ring-1 ring-inset ring-danger-200">
          {error}
        </div>
      )}

      <FormField label="Organization name" htmlFor="name">
        <Input
          id="name"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Feat System Retail"
          required
        />
      </FormField>

      <FormField label="Phone number" htmlFor="phoneNumber">
        <Input
          id="phoneNumber"
          value={form.phoneNumber}
          onChange={(e) => update("phoneNumber", e.target.value)}
          placeholder="+91 98200 00000"
          required
        />
      </FormField>

      <FormField label="Address" htmlFor="address">
        <Input
          id="address"
          value={form.address}
          onChange={(e) => update("address", e.target.value)}
          placeholder="Andheri East, Mumbai, MH"
          required
        />
      </FormField>

      <FormField label="Username" htmlFor="username">
        <Input
          id="username"
          value={form.username}
          onChange={(e) => update("username", e.target.value)}
          autoComplete="username"
          required
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Password" htmlFor="password">
          <Input
            id="password"
            type="password"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            autoComplete="new-password"
            required
            minLength={8}
          />
        </FormField>
        <FormField label="Confirm password" htmlFor="confirmPassword">
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            required
            minLength={8}
          />
        </FormField>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting ? "Creating…" : "Create organization"}
      </Button>
    </form>
  );
}
