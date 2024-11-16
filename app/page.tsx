import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center p-4">
      <Card className="max-w-lg w-full p-8 space-y-6">
        <h1 className="text-4xl font-bold text-center">Welcome to User Management</h1>
        <p className="text-muted-foreground text-center">
          Securely manage your user data with our comprehensive dashboard
        </p>
        <div className="flex flex-col space-y-4">
          <Link href="/auth/signin">
            <Button className="w-full">
              Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button variant="outline" className="w-full">
              Create Account
            </Button>
          </Link>
        </div>
      </Card>
    </main>
  )
}