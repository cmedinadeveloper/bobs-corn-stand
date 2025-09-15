import { SignupForm } from "@/components/forms/signup-form";
import { AuthFooter } from "@/components/footers/auth-footer";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-corn-yellow-50 to-corn-green-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-corn-yellow-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🌽</span>
              <span className="text-xl font-bold text-corn-yellow-900">
                Bob&apos;s Corn Stand
              </span>
            </Link>
            <Link
              href="/auth/login"
              className="text-corn-orange-600 hover:text-corn-orange-800 font-medium"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <SignupForm />
        </div>
      </main>

      {/* Footer */}
      <AuthFooter />
    </div>
  );
}
