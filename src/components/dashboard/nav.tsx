"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const dashboardLinks = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
] as const;

interface DashboardNavProps {
  onCollapse: (collapsed: boolean) => void;
}

export function DashboardNav({ onCollapse }: DashboardNavProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    onCollapse(!isCollapsed);
  };

  return (
    <div className="relative flex h-full flex-col border-r bg-background">
      <div className="flex h-[60px] items-center justify-between px-4">
        <span className={cn("font-semibold", isCollapsed && "hidden")}>
          Navigation
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={handleCollapse}
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-all",
              isCollapsed && "rotate-180"
            )}
          />
        </Button>
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {dashboardLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname === link.href
                  ? "bg-accent text-accent-foreground"
                  : "transparent",
                isCollapsed && "justify-center px-2"
              )}
            >
              <Icon className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
              {!isCollapsed && <span>{link.title}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto border-t p-4">
        <div
          className={cn(
            "flex items-center justify-between",
            isCollapsed && "justify-center"
          )}
        >
          <div
            className={cn(
              "flex items-center space-x-2",
              isCollapsed && "hidden"
            )}
          >
            <div className="h-8 w-8 rounded-full bg-muted" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">User</p>
              <p className="text-xs text-muted-foreground">user@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
