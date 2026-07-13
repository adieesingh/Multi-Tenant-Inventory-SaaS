"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, FormField, Input } from "@multi-inv/ui";
import { login } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/http";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login({ username, password });
      // Backend sets the httpOnly session cookie on this response;
      // no token to store client-side.
      router.push("/dashboard");
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.status === 401
            ? "Incorrect username or password."
            : err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h1 className="font-display text-[20px] font-semibold text-ink">Sign in</h1>
      <p className="mt-1 mb-6 text-[13px] text-ink-500">Welcome back — pick up where you left off.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-lg bg-danger-50 px-3.5 py-2.5 text-[13px] text-danger-700 ring-1 ring-inset ring-danger-200">
            {error}
          </div>
        )}

        <FormField label="Username" htmlFor="username">
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            autoFocus
            required
          />
        </FormField>

        <FormField label="Password" htmlFor="password">
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </FormField>

        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? "Signing in…" : "Sign in"}
        </Button>
      </form>

      <p className="mt-5 text-center text-[13px] text-ink-500">
        Don't have an organization yet?{" "}
        <Link href="/signup" className="font-medium text-accent-600 hover:underline">
          Create one
        </Link>
      </p>
    </div>
  );
}
