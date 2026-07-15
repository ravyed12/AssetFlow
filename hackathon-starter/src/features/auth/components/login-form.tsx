"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { loginAction } from "../actions/login";
import { loginSchema, type LoginFormValues } from "../schemas/login-schema";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="flex items-center gap-1 text-[12px] text-red-500">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      {message}
    </p>
  );
}

const LOGO_PATH = "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z";

export function LoginForm() {
  const router = useRouter();
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmissionError(null);
    clearErrors();
    const result = await loginAction(values);
    if (!result.success) {
      if (result.fieldErrors) {
        for (const [fieldName, messages] of Object.entries(result.fieldErrors) as Array<[keyof LoginFormValues, string[] | undefined]>) {
          const message = messages?.[0];
          if (!message) continue;
          setError(fieldName, { type: "server", message });
        }
      }
      setSubmissionError(result.error?.message ?? "Unable to log you in right now. Please try again.");
      return;
    }
    router.push(result.data?.redirectTo ?? "/");
    router.refresh();
  });

  return (
    <div className="flex min-h-screen w-full font-sans">
      {/* ── Left branding panel ── */}
      <div className="relative hidden w-[45%] flex-col justify-between overflow-hidden bg-[#0B0D12] p-12 lg:flex">
        {/* Gradient orbs */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#4F46E5]/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#7C3AED]/15 blur-3xl" />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] shadow-lg shadow-indigo-500/30">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d={LOGO_PATH}/>
            </svg>
          </div>
          <span className="text-[17px] font-bold tracking-tight text-white">AssetFlow</span>
        </div>

        {/* Testimonial */}
        <div className="relative space-y-4">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FBBF24">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            ))}
          </div>
          <p className="text-[20px] font-semibold leading-relaxed text-white/90">
            &ldquo;Managing 3,000+ assets across 12 locations has never been this seamless.&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 text-[13px] font-bold text-white">OL</div>
            <div>
              <p className="text-[13px] font-semibold text-white">Operations Lead</p>
              <p className="text-[12px] text-[#6B7280]">Acme Corporation</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="relative grid grid-cols-3 gap-3">
          {[
            { value: "99.8%", label: "Uptime" },
            { value: "3.2k+", label: "Assets tracked" },
            { value: "12", label: "Locations" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-sm">
              <p className="text-[22px] font-bold text-white">{stat.value}</p>
              <p className="text-[11px] text-[#6B7280]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex flex-1 flex-col items-center justify-center bg-[#F8F9FB] px-6 py-12">
        <div className="w-full max-w-[400px]">
          {/* Mobile logo */}
          <div className="mb-10 flex items-center gap-2.5 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#7C3AED]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={LOGO_PATH}/>
              </svg>
            </div>
            <span className="text-[16px] font-bold tracking-tight text-[#0F1117]">AssetFlow</span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-[28px] font-bold tracking-tight text-[#0F1117]">Welcome back</h1>
            <p className="mt-1 text-[14px] text-[#6B7280]">Sign in to continue to your dashboard</p>
          </div>

          {/* Error alert */}
          {submissionError && (
            <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3.5">
              <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <div>
                <p className="text-[13px] font-semibold text-red-700">Login failed</p>
                <p className="text-[12px] text-red-600">{submissionError}</p>
              </div>
            </div>
          )}

          <form className="space-y-5" noValidate onSubmit={onSubmit}>
            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-[13px] font-semibold text-[#1F2937]">Email address</label>
              <input
                id="email" type="email" autoComplete="email"
                placeholder="name@company.com" disabled={isSubmitting}
                {...register("email")}
                className="w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-[14px] text-[#0F1117] shadow-sm placeholder:text-[#9CA3AF] transition-all focus:border-[#4F46E5] focus:outline-none focus:ring-3 focus:ring-[#4F46E5]/15 disabled:cursor-not-allowed disabled:opacity-60"
              />
              <FieldError message={errors.email?.message} />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-[13px] font-semibold text-[#1F2937]">Password</label>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  disabled={isSubmitting}
                  {...register("password")}
                  className="w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 pr-11 text-[14px] text-[#0F1117] shadow-sm placeholder:text-[#9CA3AF] transition-all focus:border-[#4F46E5] focus:outline-none focus:ring-3 focus:ring-[#4F46E5]/15 disabled:cursor-not-allowed disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#4F46E5] transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
              <FieldError message={errors.password?.message} />
            </div>

            {/* Submit */}
            <button
              id="login-btn" type="submit" disabled={isSubmitting}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] py-3 text-[14px] font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-indigo-500/40 hover:brightness-110 disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#E5E7EB]"/>
            <span className="text-[12px] text-[#9CA3AF]">or</span>
            <div className="h-px flex-1 bg-[#E5E7EB]"/>
          </div>

          <p className="mt-6 text-center text-[13px] text-[#6B7280]">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-semibold text-[#4F46E5] hover:text-[#4338CA] hover:underline underline-offset-4 transition-colors">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
