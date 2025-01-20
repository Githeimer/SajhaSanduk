import { Metadata } from "next"
import { DashboardShell } from "@/components/dashboard/shell"
import { DashboardHeader } from "@/components/dashboard/header"
import { ProductsList } from "@/components/dashboard/products-list"
import { RecentSales } from "@/components/dashboard/recent-sales"
import { UserProfile } from "@/components/dashboard/user-profile"
import Navbar from "@/components/Landing/Navbar"
import Footer from "@/components/Landing/Footer"

export const metadata: Metadata = {
  title: "Dashboard | Sajha Sanduk",
  description: "Manage your products and view recent sales",
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <DashboardShell>
        <div className="grid gap-6 md:grid-cols-[400px_1fr]">
          <UserProfile />
          <div className="space-y-6">
            <DashboardHeader 
              heading="Dashboard" 
              text="Manage your products and view recent activity."
            />
            <div className="grid gap-6">
              <ProductsList />
              <RecentSales />
            </div>
          </div>
        </div>
      </DashboardShell>
    
    </div>
  )
}

