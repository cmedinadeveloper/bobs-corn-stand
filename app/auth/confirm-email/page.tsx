import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ConfirmEmailPage({
  searchParams,
}: {
  searchParams: { resent?: string };
}) {
  const emailResent = searchParams.resent === "true";

  return (
    <div className="min-h-screen bg-gradient-to-br from-corn-yellow-50 to-corn-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <Card className="border-corn-yellow-200 shadow-lg">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-corn-yellow-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-corn-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <CardTitle className="text-2xl font-bold text-corn-yellow-900">
              Check Your Email! 📧
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {emailResent && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <p className="text-green-700 font-medium">
                    Confirmation email sent successfully!
                  </p>
                </div>
              </div>
            )}

            <div className="text-center space-y-4">
              <p className="text-corn-yellow-700 text-base leading-relaxed">
                We&apos;ve sent you a confirmation email to verify your account.
                Please check your inbox and click the confirmation link to
                complete your registration.
              </p>

              <div className="bg-corn-yellow-50 border border-corn-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-corn-yellow-800 mb-2">
                  What&apos;s next?
                </h3>
                <ol className="text-sm text-corn-yellow-700 space-y-1 text-left list-decimal list-inside">
                  <li>Check your email inbox (and spam folder)</li>
                  <li>Click the confirmation link in the email</li>
                  <li>Start enjoying Bob&apos;s fresh corn! 🌽</li>
                </ol>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-corn-yellow-600 text-center">
                Didn&apos;t receive the email?
              </p>

              <Suspense fallback={<div>Loading...</div>}>
                <ResendEmailButton />
              </Suspense>
            </div>

            <div className="pt-4 border-t border-corn-yellow-200">
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  className="w-full border-corn-yellow-300 text-corn-yellow-700 hover:bg-corn-yellow-50"
                >
                  Back to Login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-corn-yellow-600">
            Need help?{" "}
            <Link
              href="/meetbob"
              className="text-corn-orange-600 hover:text-corn-orange-800 underline"
            >
              Contact Bob
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function ResendEmailButton() {
  return (
    <form action="/auth/resend-confirmation" method="post">
      <Button
        type="submit"
        variant="outline"
        className="w-full border-corn-orange-300 text-corn-orange-700 hover:bg-corn-orange-50"
      >
        Resend Confirmation Email
      </Button>
    </form>
  );
}
