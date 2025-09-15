"use client";

import { Suspense } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { DashboardSkeleton } from "@/components/skeletons/dashboard-skeleton";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-corn-yellow-50 to-corn-green-50">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <Suspense fallback={<DashboardSkeleton />}>{children}</Suspense>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="bg-white/90 backdrop-blur-sm border-t border-corn-yellow-200 py-6 mt-12">
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
                <Link href="#" className="hover:text-corn-orange-600">
                  Rate Limit Info
                </Link>
              </div>
              <p className="text-xs text-corn-yellow-600 mt-4">
                © 2024 Bob&apos;s Corn Stand. One corn per customer per minute.
                🌽
              </p>
            </div>
          </footer>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
