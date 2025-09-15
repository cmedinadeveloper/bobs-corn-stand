import { ForgotPasswordForm } from "@/components/forms/forgot-password-form";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-corn-orange-50 to-corn-yellow-50 flex flex-col">
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
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-corn-orange-600 hover:text-corn-orange-800 font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-corn-yellow-600 hover:bg-corn-yellow-700 text-white px-4 py-2 rounded-md font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <ForgotPasswordForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/90 backdrop-blur-sm border-t border-corn-yellow-200 py-6">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-corn-yellow-700">
            <Link href="/about" className="hover:text-corn-orange-600">
              About Bob
            </Link>
            <Link href="/meetbob" className="hover:text-corn-orange-600">
              Meet Bob
            </Link>
            <Link href="/api/health" className="hover:text-corn-orange-600">
              API Status
            </Link>
            <Link href="#" className="hover:text-corn-orange-600">
              Help & Support
            </Link>
          </div>
          <p className="text-xs text-corn-yellow-600 mt-4">
            © 2024 Bob&apos;s Corn Stand. Fresh corn, one API call at a time. 🌽
          </p>
        </div>
      </footer>
    </div>
  );
}
