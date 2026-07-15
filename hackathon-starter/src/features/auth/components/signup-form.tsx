"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signUpAction } from "../actions/signup";
import { signupSchema, type SignupFormValues } from "../schemas/signup-schema";

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

const EYE_OPEN = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const EYE_OFF = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const INPUT_CLS = "w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-[14px] text-[#0F1117] shadow-sm placeholder:text-[#9CA3AF] transition-all focus:border-[#4F46E5] focus:outline-none focus:ring-3 focus:ring-[#4F46E5]/15 disabled:cursor-not-allowed disabled:opacity-60";

export function SignupForm() {
  const router = useRouter();
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
    defaultValues: { fullName: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmissionError(null);
    clearErrors();
    const result = await signUpAction(values);
    if (!result.success) {
      if (result.fieldErrors) {
        for (const [fieldName, messages] of Object.entries(result.fieldErrors) as Array<[keyof SignupFormValues, string[] | undefined]>) {
          const message = messages?.[0];
          if (!message) continue;
          setError(fieldName, { type: "server", message });
        }
      }
      setSubmissionError(result.error?.message ?? "Unable to create your account. Please try again.");
      return;
    }
    setSuccess(true);
    setTimeout(() => {
      router.push(result.data?.redirectTo ?? "/login");
      router.refresh();
    }, 2500);
  });

  // ── Success screen ──
  if (success) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-[#F8F9FB] px-6">
        <div className="w-full max-w-[380px] text-center">
          <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-30" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-500/30">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
          </div>
          <h2 className="text-[24px] font-bold text-[#0F1117]">You&apos;re all set!</h2>
          <p className="mt-2 text-[14px] text-[#6B7280]">Your account has been created. Redirecting you to login…</p>
          <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-[#E5E7EB]">
            <div className="h-full animate-[fill_2.5s_linear_forwards] rounded-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED]" style={{ animation: "width 2.5s linear forwards", width: "100%" }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full font-sans">
      {/* ── Left branding panel ── */}
      <div className="relative hidden w-[45%] flex-col justify-between overflow-hidden bg-[#0B0D12] p-12 lg:flex">
        <div className="pointer-events-none absolute -top-40 -right-20 h-[500px] w-[500px] rounded-full bg-[#4F46E5]/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-[#7C3AED]/20 blur-3xl" />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] shadow-lg shadow-indigo-500/30">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d={LOGO_PATH}/>
            </svg>
          </div>
          <span className="text-[17px] font-bold tracking-tight text-white">AssetFlow</span>
        </div>

        {/* Feature list */}
        <div className="relative space-y-8">
          <div>
            <p className="text-[22px] font-semibold leading-relaxed text-white/90">
              Everything you need to manage your organisation&apos;s assets in one place.
            </p>
          </div>
          <ul className="space-y-4">
            {[
              { title: "Real-time tracking", desc: "Track assets across all locations instantly" },
              { title: "Smart maintenance", desc: "Schedule and approve maintenance requests" },
              { title: "Audit-ready reports", desc: "One-click compliance and audit exports" },
              { title: "Resource bookings", desc: "Let employees book shared assets easily" },
            ].map((item) => (
              <li key={item.title} className="flex items-start gap-3.5">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#4F46E5]/20 ring-1 ring-[#4F46E5]/40">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </span>
                <div>
                  <p className="text-[13px] font-semibold text-white/80">{item.title}</p>
                  <p className="text-[12px] text-[#4B5563]">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-[11px] text-[#374151]">© 2026 AssetFlow · Built for Odoo Hackathon 2026</p>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex flex-1 flex-col items-center justify-center bg-[#F8F9FB] px-6 py-12">
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="mb-10 flex items-center gap-2.5 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#7C3AED]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={LOGO_PATH}/>
              </svg>
            </div>
            <span className="text-[16px] font-bold tracking-tight text-[#0F1117]">AssetFlow</span>
          </div>

          <div className="mb-8">
            <h1 className="text-[28px] font-bold tracking-tight text-[#0F1117]">Create your account</h1>
            <p className="mt-1 text-[14px] text-[#6B7280]">Join your team on AssetFlow — it&apos;s free</p>
          </div>

          {/* Error */}
          {submissionError && (
            <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3.5">
              <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <div>
                <p className="text-[13px] font-semibold text-red-700">Signup failed</p>
                <p className="text-[12px] text-red-600">{submissionError}</p>
              </div>
            </div>
          )}

          <form className="space-y-4" noValidate onSubmit={onSubmit}>
            {/* Full name */}
            <div className="space-y-1.5">
              <label htmlFor="fullName" className="block text-[13px] font-semibold text-[#1F2937]">Full name</label>
              <input
                id="fullName" autoComplete="name"
                placeholder="e.g. Raghav Pandey" disabled={isSubmitting}
                {...register("fullName")}
                className={INPUT_CLS}
              />
              <FieldError message={errors.fullName?.message} />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-[13px] font-semibold text-[#1F2937]">Work email</label>
              <input
                id="email" type="email" autoComplete="email"
                placeholder="name@company.com" disabled={isSubmitting}
                {...register("email")}
                className={INPUT_CLS}
              />
              <FieldError message={errors.email?.message} />
            </div>

            {/* Passwords side by side */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label htmlFor="password" className="block text-[13px] font-semibold text-[#1F2937]">Password</label>
                <div className="relative">
                  <input
                    id="password" type={showPw ? "text" : "password"}
                    autoComplete="new-password" placeholder="Min. 6 chars"
                    disabled={isSubmitting} {...register("password")}
                    className={`${INPUT_CLS} pr-10`}
                  />
                  <button type="button" tabIndex={-1} onClick={() => setShowPw(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#4F46E5] transition-colors">
                    {showPw ? EYE_OFF : EYE_OPEN}
                  </button>
                </div>
                <FieldError message={errors.password?.message} />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="confirmPassword" className="block text-[13px] font-semibold text-[#1F2937]">Confirm</label>
                <div className="relative">
                  <input
                    id="confirmPassword" type={showConfirm ? "text" : "password"}
                    autoComplete="new-password" placeholder="Repeat it"
                    disabled={isSubmitting} {...register("confirmPassword")}
                    className={`${INPUT_CLS} pr-10`}
                  />
                  <button type="button" tabIndex={-1} onClick={() => setShowConfirm(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#4F46E5] transition-colors">
                    {showConfirm ? EYE_OFF : EYE_OPEN}
                  </button>
                </div>
                <FieldError message={errors.confirmPassword?.message} />
              </div>
            </div>

            {/* Submit */}
            <button
              id="signup-btn" type="submit" disabled={isSubmitting}
              className="group relative mt-1 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] py-3 text-[14px] font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:brightness-110 hover:shadow-indigo-500/40 disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Creating account...
                </>
              ) : (
                <>
                  Create free account
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </>
              )}
            </button>

            <p className="text-center text-[11px] text-[#9CA3AF]">
              By creating an account you agree to our{" "}
              <span className="text-[#6B7280] underline underline-offset-2 cursor-pointer">Terms</span>
              {" "}&amp;{" "}
              <span className="text-[#6B7280] underline underline-offset-2 cursor-pointer">Privacy Policy</span>.
            </p>
          </form>

          <div className="mt-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#E5E7EB]"/>
            <span className="text-[12px] text-[#9CA3AF]">or</span>
            <div className="h-px flex-1 bg-[#E5E7EB]"/>
          </div>

          <p className="mt-5 text-center text-[13px] text-[#6B7280]">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-[#4F46E5] hover:text-[#4338CA] underline-offset-4 hover:underline transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
