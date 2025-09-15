import Link from "next/link";

export function AuthFooter() {
  return (
    <footer className="bg-white/90 backdrop-blur-sm border-t border-corn-yellow-200 py-6">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-wrap justify-center gap-6 text-sm text-corn-yellow-700">
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
  );
}
