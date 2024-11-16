"use client"

import { useEffect, useRef } from "react"
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
  Menu,
  X
} from "lucide-react"
import { useNavigation } from "../providers/navigation-provider"

const items = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Profile",
    href: "/dashboard/profile",
    icon: Users,
  },
  {
    title: "My Achievements",
    href: "/dashboard/achievements",
    icon: Trophy,
  },
  {
    title: "My Addresses",
    href: "/dashboard/addresses",
    icon: MapPin,
  },
  {
    title: "My Business",
    href: "/dashboard/business",
    icon: Briefcase,
  },
  {
    title: "My Education",
    href: "/dashboard/education",
    icon: GraduationCap,
  },
  {
    title: "Family Relations",
    href: "/dashboard/family",
    icon: Users2,
  },
  {
    title: "My Documents",
    href: "/dashboard/documents",
    icon: FileText,
  },
  {
    title: "My Metadata",
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
  const { isOpen, toggle, close } = useNavigation()
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    close()
  }, [path, close])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        close()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, close])

  return (
    <>
      <Button 
        variant="outline" 
        size="icon" 
        onClick={toggle}
        className="fixed top-4 left-4 z-50 lg:hidden"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      <div 
        ref={drawerRef}
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 bg-background border-r transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <ScrollArea className="h-full py-6">
          <div className="space-y-4 px-3">
            <div className="px-3 py-2">
              <h2 className="text-lg font-semibold">Dashboard</h2>
            </div>
            <nav className="space-y-1">
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
            </nav>
          </div>
        </ScrollArea>
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={close}
        />
      )}
    </>
  )
}