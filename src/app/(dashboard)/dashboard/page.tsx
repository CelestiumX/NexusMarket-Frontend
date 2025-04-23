import Link from "next/link"
import { BarChart3, CircleCheck, Package, ShoppingBag, Star, TrendingUp, Users } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button
            className="bg-gradient-to-r from-[#0075FF] to-[#00C2FF] text-white hover:from-[#0075FF]/90 hover:to-[#00C2FF]/90"
            asChild
          >
            <Link href="/marketplace">Browse Marketplace</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Purchases</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Sales</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Reputation Score</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-muted-foreground">Based on 23 reviews</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245.32 XLM</div>
            <p className="text-xs text-muted-foreground">≈ $32.45 USD</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent transactions and marketplace activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0075FF]/10 text-[#00C2FF]">
                  <Package className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Purchase: Digital Art #3429</p>
                  <p className="text-xs text-muted-foreground">2 hours ago • 45.5 XLM</p>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-[#25D366]/10 px-2 py-1 text-xs font-medium text-[#25D366]">
                  <CircleCheck className="h-3 w-3" />
                  <span>Completed</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#9D4EDD]/10 text-[#9D4EDD]">
                  <ShoppingBag className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Sale: Vintage Collectible</p>
                  <p className="text-xs text-muted-foreground">Yesterday • 120 XLM</p>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-[#25D366]/10 px-2 py-1 text-xs font-medium text-[#25D366]">
                  <CircleCheck className="h-3 w-3" />
                  <span>Completed</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF41B4]/10 text-[#FF41B4]">
                  <Star className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">New Review Received</p>
                  <p className="text-xs text-muted-foreground">2 days ago • 5/5 stars</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0075FF]/10 text-[#00C2FF]">
                  <Package className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Purchase: Smart Contract Template</p>
                  <p className="text-xs text-muted-foreground">3 days ago • 75 XLM</p>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-[#25D366]/10 px-2 py-1 text-xs font-medium text-[#25D366]">
                  <CircleCheck className="h-3 w-3" />
                  <span>Completed</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:col-span-3">
          <CardHeader>
            <CardTitle>Marketplace Stats</CardTitle>
            <CardDescription>Current marketplace activity and trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Active Listings</span>
                  <span className="font-medium">12,453</span>
                </div>
                <div className="h-2 rounded-full bg-[#080E21]">
                  <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-[#0075FF] to-[#00C2FF]"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Daily Transactions</span>
                  <span className="font-medium">1,245</span>
                </div>
                <div className="h-2 rounded-full bg-[#080E21]">
                  <div className="h-2 w-1/2 rounded-full bg-gradient-to-r from-[#9D4EDD] to-[#FF41B4]"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">New Users (24h)</span>
                  <span className="font-medium">342</span>
                </div>
                <div className="h-2 rounded-full bg-[#080E21]">
                  <div className="h-2 w-1/4 rounded-full bg-gradient-to-r from-[#00C2FF] to-[#0075FF]"></div>
                </div>
              </div>
              <div className="pt-4">
                <div className="rounded-lg border border-[#0075FF]/30 bg-[#080E21]/60 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#00C2FF]" />
                    <h3 className="text-sm font-medium">Community Growth</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-16 w-16 text-[#0075FF]" />
                    <div>
                      <div className="text-2xl font-bold">+24%</div>
                      <p className="text-xs text-muted-foreground">Month over month</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
