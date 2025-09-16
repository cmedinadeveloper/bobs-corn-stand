"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const errorType = searchParams.get("type");

  if (errorType === "email-confirmation") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-corn-yellow-50 to-corn-orange-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <Card className="border-red-200 shadow-lg">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <CardTitle className="text-2xl font-bold text-red-900">
                Email Confirmation Failed
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <p className="text-red-700 text-base leading-relaxed">
                  We couldn&apos;t confirm your email address. This might be
                  because:
                </p>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
                  <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
                    <li>The confirmation link has expired</li>
                    <li>The link has already been used</li>
                    <li>The link is invalid or corrupted</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <Link href="/auth/confirm-email">
                  <Button className="w-full bg-corn-yellow-600 hover:bg-corn-yellow-700 text-white">
                    Request New Confirmation Email
                  </Button>
                </Link>

                <Link href="/auth/signup">
                  <Button
                    variant="outline"
                    className="w-full border-corn-yellow-300 text-corn-yellow-700 hover:bg-corn-yellow-50"
                  >
                    Create New Account
                  </Button>
                </Link>
              </div>

              <div className="pt-4 border-t border-red-200 text-center">
                <Link
                  href="/meetbob"
                  className="text-sm text-corn-orange-600 hover:text-corn-orange-800 underline"
                >
                  Need help? Contact Bob
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Default error page
  return (
    <div className="min-h-screen bg-gradient-to-br from-corn-yellow-50 to-corn-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <Card className="border-corn-yellow-200 shadow-lg">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-corn-yellow-100 rounded-full flex items-center justify-center">
              <div className="text-3xl">🌽</div>
            </div>
            <CardTitle className="text-2xl font-bold text-corn-yellow-900">
              Oops! Something went wrong
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-corn-yellow-700 text-center">
              We&apos;re sorry, but something unexpected happened. Please try
              again or contact Bob if the problem persists.
            </p>

            <div className="space-y-3">
              <Link href="/">
                <Button className="w-full bg-corn-yellow-600 hover:bg-corn-yellow-700 text-white">
                  Go Home
                </Button>
              </Link>

              <Link href="/meetbob">
                <Button
                  variant="outline"
                  className="w-full border-corn-yellow-300 text-corn-yellow-700 hover:bg-corn-yellow-50"
                >
                  Contact Bob
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
