import { LoginForm } from "@/components/forms/login-form";
import { AuthFooter } from "@/components/footers/auth-footer";
import Link from "next/link";

export default function LoginPage() {
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
              href="/auth/signup"
              className="bg-corn-yellow-600 hover:bg-corn-yellow-700 text-white px-4 py-2 rounded-md font-medium"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <LoginForm />
        </div>
      </main>

      {/* Footer */}
      <AuthFooter />
    </div>
  );
}
