import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { signOut } from "@/app/auth/actions";

export function SiteHeader() {
  const handleSignOut = async () => {
    // Call the signOut function from auth/actions
    await signOut();
  };

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b border-corn-yellow-200 bg-white/90 backdrop-blur-sm transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />

        <div className="ml-auto flex items-center gap-4">
          <Badge
            variant="outline"
            className="border-corn-green-300 text-corn-green-700 bg-corn-green-50"
          >
            Farmer Status: Active
          </Badge>
          <Button
            onClick={handleSignOut}
            size="sm"
            variant="outline"
            className="border-corn-orange-300 text-corn-orange-700 hover:bg-corn-orange-50"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
}
