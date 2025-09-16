"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { signOut } from "@/app/auth/actions";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
}) {
  const { isMobile } = useSidebar();

  const handleLogout = () => {
    signOut();
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-corn-yellow-100 data-[state=open]:text-corn-yellow-900 hover:bg-corn-yellow-100"
            >
              <Avatar className="h-8 w-8 rounded-lg border-2 border-corn-yellow-300">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-corn-yellow-200 text-corn-yellow-900">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase() || "🌽"}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium text-corn-yellow-900">
                  {user.name}
                </span>
                <span className="truncate text-xs text-corn-yellow-600">
                  {user.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-corn-yellow-700" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg border-corn-yellow-200"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg border-2 border-corn-yellow-300">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg bg-corn-yellow-200 text-corn-yellow-900">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase() || "🌽"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium text-corn-yellow-900">
                    {user.name}
                  </span>
                  <span className="truncate text-xs text-corn-yellow-600">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-corn-yellow-200" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="hover:bg-corn-yellow-50 text-corn-yellow-700">
                <Sparkles />
                Upgrade to Premium Corn
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-corn-yellow-200" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="hover:bg-corn-yellow-50 text-corn-yellow-700">
                <BadgeCheck />
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-corn-yellow-50 text-corn-yellow-700">
                <CreditCard />
                Payment & Billing
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-corn-yellow-50 text-corn-yellow-700">
                <Bell />
                Corn Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-corn-yellow-200" />
            <DropdownMenuItem
              className="hover:bg-red-50 text-red-700 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
