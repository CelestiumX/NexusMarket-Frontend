"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  BarChart3,
  CircuitBoard,
  Compass,
  CreditCard,
  FileText,
  Home,
  MessageSquare,
  Package,
  Settings,
  ShoppingBag,
  Star,
  Users,
} from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "../../components/ui/button"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] w-64 overflow-y-auto border-r border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:relative md:top-0",
        className,
      )}
    >
      <div className="h-full py-6">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-tight text-muted-foreground">Overview</h2>
          <div className="space-y-1">
            <Button
              asChild
              variant="ghost"
              className={cn("w-full justify-start", pathname === "/dashboard" && "bg-[#0075FF]/10 text-[#00C2FF]")}
            >
              <Link href="/dashboard" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={cn("w-full justify-start", pathname === "/marketplace" && "bg-[#0075FF]/10 text-[#00C2FF]")}
            >
              <Link href="/marketplace" className="flex items-center gap-2">
                <Compass className="h-4 w-4" />
                <span>Marketplace</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={cn("w-full justify-start", pathname === "/chats" && "bg-[#0075FF]/10 text-[#00C2FF]")}
            >
              <Link href="/chats" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>Messages</span>
                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-[#FF41B4] text-xs font-medium text-white">
                  3
                </span>
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={cn("w-full justify-start", pathname === "/account/orders" && "bg-[#0075FF]/10 text-[#00C2FF]")}
            >
              <Link href="/account/orders" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <span>Orders</span>
              </Link>
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-tight text-muted-foreground">Seller</h2>
          <div className="space-y-1">
            <Button
              asChild
              variant="ghost"
              className={cn("w-full justify-start", pathname === "/sell" && "bg-[#0075FF]/10 text-[#00C2FF]")}
            >
              <Link href="/sell" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                <span>Seller Dashboard</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={cn("w-full justify-start", pathname === "/sell/products" && "bg-[#0075FF]/10 text-[#00C2FF]")}
            >
              <Link href="/sell/products" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Products</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={cn("w-full justify-start", pathname === "/sell/orders" && "bg-[#0075FF]/10 text-[#00C2FF]")}
            >
              <Link href="/sell/orders" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span>Orders</span>
              </Link>
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-tight text-muted-foreground">Account</h2>
          <div className="space-y-1">
            <Button
              asChild
              variant="ghost"
              className={cn(
                "w-full justify-start",
                pathname === "/account/profile" && "bg-[#0075FF]/10 text-[#00C2FF]",
              )}
            >
              <Link href="/account/profile" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Profile</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={cn("w-full justify-start", pathname === "/account/wallet" && "bg-[#0075FF]/10 text-[#00C2FF]")}
            >
              <Link href="/account/wallet" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span>Wallet</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={cn(
                "w-full justify-start",
                pathname === "/account/reputation" && "bg-[#0075FF]/10 text-[#00C2FF]",
              )}
            >
              <Link href="/account/reputation" className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                <span>Reputation</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={cn(
                "w-full justify-start",
                pathname === "/account/settings" && "bg-[#0075FF]/10 text-[#00C2FF]",
              )}
            >
              <Link href="/account/settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <div className="space-y-1">
            <div className="rounded-lg border border-[#0075FF]/30 bg-[#080E21]/60 p-4">
              <div className="mb-2 flex items-center gap-2">
                <CircuitBoard className="h-4 w-4 text-[#FF41B4]" />
                <h3 className="text-sm font-medium">Blockchain Status</h3>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Network</span>
                  <span className="font-medium text-[#00C2FF]">Stellar Mainnet</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Gas Price</span>
                  <span className="font-medium">0.00001 XLM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Block Height</span>
                  <span className="font-medium">45,231,987</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
