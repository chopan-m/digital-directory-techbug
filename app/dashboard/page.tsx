"use client"

import { Card } from "@/components/ui/card"
import Link from "next/link"
import {
  Users,
  Trophy,
  MapPin,
  Briefcase,
  GraduationCap,
  Users2,
  FileText,
  Database,
  Share2,
} from "lucide-react"

const tables = [
  {
    title: "Users",
    description: "Manage user profiles and personal information",
    icon: Users,
    href: "/dashboard/users",
    color: "text-blue-500",
  },
  {
    title: "Achievements",
    description: "Track exceptional talents and awards",
    icon: Trophy,
    href: "/dashboard/achievements",
    color: "text-yellow-500",
  },
  {
    title: "Addresses",
    description: "Manage user addresses and locations",
    icon: MapPin,
    href: "/dashboard/addresses",
    color: "text-red-500",
  },
  {
    title: "Business",
    description: "Handle business profiles and details",
    icon: Briefcase,
    href: "/dashboard/business",
    color: "text-purple-500",
  },
  {
    title: "Education",
    description: "Track educational background",
    icon: GraduationCap,
    href: "/dashboard/education",
    color: "text-green-500",
  },
  {
    title: "Family Relations",
    description: "Manage family connections",
    icon: Users2,
    href: "/dashboard/family",
    color: "text-indigo-500",
  },
  {
    title: "Documents",
    description: "Handle identification documents",
    icon: FileText,
    href: "/dashboard/documents",
    color: "text-orange-500",
  },
  {
    title: "Metadata",
    description: "Track additional user information",
    icon: Database,
    href: "/dashboard/metadata",
    color: "text-cyan-500",
  },
  {
    title: "Social Profiles",
    description: "Manage social media connections",
    icon: Share2,
    href: "/dashboard/social",
    color: "text-pink-500",
  },
]

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Data Management Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tables.map((table) => (
          <Link key={table.href} href={table.href}>
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="flex items-start space-x-4">
                <div className={`${table.color} p-3 rounded-lg bg-background border-2 group-hover:border-primary`}>
                  <table.icon className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {table.title}
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    {table.description}
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}