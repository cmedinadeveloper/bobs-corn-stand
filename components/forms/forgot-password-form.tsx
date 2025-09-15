"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/lib/auth-schemas";
import { forgotPassword } from "@/app/auth/actions";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await forgotPassword(data.email);
      if (result.success) {
        setSuccess(true);
      } else if (result.error) {
        setError(result.error);
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="overflow-hidden p-0">
          <CardContent className="p-6 md:p-8 text-center">
            <div className="text-6xl mb-4">📧</div>
            <h1 className="text-2xl font-bold text-corn-yellow-900 mb-2">
              Check Your Email
            </h1>
            <p className="text-corn-yellow-700 mb-6">
              We&apos;ve sent password reset instructions to your email address.
            </p>
            <Link
              href="/login"
              className="text-corn-orange-600 hover:text-corn-orange-800 underline underline-offset-4"
            >
              Back to login
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-corn-yellow-900">
                  Forgot Your Password?
                </h1>
                <p className="text-corn-yellow-700 text-balance">
                  No worries! We&apos;ll send you reset instructions to get back
                  to your corn orders
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div className="grid gap-3">
                <Label htmlFor="email" className="text-corn-yellow-800">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="farmer@example.com"
                  {...register("email")}
                  className={cn(
                    "border-corn-yellow-300 focus:border-corn-yellow-600 focus:ring-corn-yellow-600",
                    errors.email && "border-red-500"
                  )}
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
                <p className="text-sm text-corn-yellow-600">
                  Enter the email address associated with your Bob&apos;s Corn
                  Stand account
                </p>
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-corn-yellow-600 hover:bg-corn-yellow-700 text-white disabled:opacity-50"
              >
                {isLoading ? "Sending..." : "Send Reset Instructions"}
              </Button>
              <div className="text-center">
                <p className="text-sm text-corn-yellow-700 mb-4">
                  Remember your password?{" "}
                  <Link
                    href="/login"
                    className="text-corn-orange-600 hover:text-corn-orange-800 underline underline-offset-4"
                  >
                    Back to login
                  </Link>
                </p>
                <p className="text-xs text-corn-yellow-600">
                  Don&apos;t have an account yet?{" "}
                  <Link
                    href="/signup"
                    className="text-corn-orange-600 hover:text-corn-orange-800 underline underline-offset-4"
                  >
                    Sign up here
                  </Link>
                </p>
              </div>
            </div>
          </form>
          <div className="bg-corn-orange-50 relative hidden md:block">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="text-6xl mb-4">🔐</div>
              <h2 className="text-2xl font-bold text-corn-orange-900 mb-2">
                Secure Reset
              </h2>
              <p className="text-corn-orange-700 mb-4">
                We take your account security seriously. You&apos;ll receive a
                secure link to reset your password.
              </p>
              <div className="bg-white/80 rounded-lg p-4 border border-corn-orange-200">
                <h3 className="font-semibold text-corn-orange-800 mb-2">
                  📧 What happens next?
                </h3>
                <ul className="text-sm text-corn-orange-700 space-y-1 text-left">
                  <li>• Check your email inbox</li>
                  <li>• Click the reset link</li>
                  <li>• Create a new password</li>
                  <li>• Get back to ordering corn! 🌽</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-corn-yellow-600 text-center text-xs text-balance">
        Need help? Contact our{" "}
        <Link
          href="#"
          className="underline underline-offset-4 text-corn-orange-600 hover:text-corn-orange-700"
        >
          customer support
        </Link>{" "}
        team.
      </div>
    </div>
  );
}
