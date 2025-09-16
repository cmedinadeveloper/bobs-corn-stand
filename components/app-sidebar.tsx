"use client";

import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconHelp,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
      isActive: true,
    },
    {
      title: "Order History",
      url: "/dashboard/orders",
      icon: IconListDetails,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: IconChartBar,
    },
    {
      title: "Corn Inventory",
      url: "/dashboard/inventory",
      icon: IconDatabase,
    },
    {
      title: "Rate Limits",
      url: "/dashboard/limits",
      icon: IconReport,
    },
  ],
  navClouds: [
    {
      title: "Fresh Corn",
      icon: IconCamera,
      isActive: true,
      url: "/dashboard/corn",
      items: [
        {
          title: "Available Stock",
          url: "/dashboard/corn/available",
        },
        {
          title: "Pre-orders",
          url: "/dashboard/corn/preorders",
        },
      ],
    },
    {
      title: "Orders",
      icon: IconFileDescription,
      url: "/dashboard/orders",
      items: [
        {
          title: "Active Orders",
          url: "/dashboard/orders/active",
        },
        {
          title: "Order History",
          url: "/dashboard/orders/history",
        },
      ],
    },
    {
      title: "Customer Care",
      icon: IconFileAi,
      url: "/dashboard/support",
      items: [
        {
          title: "Help Center",
          url: "/dashboard/support/help",
        },
        {
          title: "Contact Bob",
          url: "/dashboard/support/contact",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Account Settings",
      url: "/dashboard/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "/dashboard/help",
      icon: IconHelp,
    },
    {
      title: "Search Orders",
      url: "/dashboard/search",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Corn Library",
      url: "/dashboard/library",
      icon: IconDatabase,
    },
    {
      name: "Purchase Reports",
      url: "/dashboard/reports",
      icon: IconReport,
    },
    {
      name: "API Documentation",
      url: "/dashboard/api-docs",
      icon: IconFileWord,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const supabase = createClient();

    async function getUser() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (!error && user) {
        setUser(user);
      }
      setLoading(false);
    }

    // Get initial user
    getUser();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Create user data for NavUser component
  const userData = React.useMemo(() => {
    if (!user) {
      return {
        name: "Guest User",
        email: "guest@example.com",
        avatar: "",
      };
    }

    const firstName = user.user_metadata?.first_name || "";
    const lastName = user.user_metadata?.last_name || "";
    const fullName =
      user.user_metadata?.full_name ||
      `${firstName} ${lastName}`.trim() ||
      user.email?.split("@")[0] ||
      "Corn Lover";

    return {
      name: fullName,
      email: user.email || "",
      avatar: user.user_metadata?.avatar_url || "",
    };
  }, [user]);
  return (
    <Sidebar
      collapsible="offcanvas"
      className="border-corn-yellow-200"
      {...props}
    >
      <SidebarHeader className="bg-corn-yellow-50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 hover:bg-corn-yellow-100"
            >
              <a href="/dashboard">
                <span className="text-2xl">🌽</span>
                <span className="text-base font-semibold text-corn-yellow-900">
                  Bob&apos;s Corn Stand
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-corn-yellow-25">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="bg-corn-yellow-50">
        {loading ? (
          <div className="p-4 text-center text-corn-yellow-600">Loading...</div>
        ) : (
          <NavUser user={userData} />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
