"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  LayoutDashboard,
  Users, 
  Trophy, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Users2,
  FileText,
  Database,
  Share2,
  Menu
} from "lucide-react"
import { useNavigation } from "../providers/navigation-provider"

const items = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Achievements",
    href: "/dashboard/achievements",
    icon: Trophy,
  },
  {
    title: "Addresses",
    href: "/dashboard/addresses",
    icon: MapPin,
  },
  {
    title: "Business",
    href: "/dashboard/business",
    icon: Briefcase,
  },
  {
    title: "Education",
    href: "/dashboard/education",
    icon: GraduationCap,
  },
  {
    title: "Family Relations",
    href: "/dashboard/family",
    icon: Users2,
  },
  {
    title: "Documents",
    href: "/dashboard/documents",
    icon: FileText,
  },
  {
    title: "Metadata",
    href: "/dashboard/metadata",
    icon: Database,
  },
  {
    title: "Social Profiles",
    href: "/dashboard/social",
    icon: Share2,
  },
]

export function DashboardNav() {
  const path = usePathname()
  const { isOpen, toggle } = useNavigation()

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={toggle}>
          <Menu className="h-4 w-4" />
        </Button>
      </div>
      <div className={cn(
        "fixed inset-y-0 z-40 flex w-72 flex-col bg-background border-r transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="space-y-4 py-4">
          <div className="px-6 py-2">
            <h2 className="text-lg font-semibold">Dashboard</h2>
          </div>
          <ScrollArea className="flex-1">
            <div className="space-y-1 px-3">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    path === item.href
                      ? "bg-secondary text-secondary-foreground"
                      : "hover:bg-secondary/50"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  )
}