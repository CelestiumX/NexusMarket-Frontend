"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Menu, Rocket, Search, ShoppingCart, X } from "lucide-react"

import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet"
import { Sidebar } from "./Sidebar"
import { WalletConnect } from "../wallet/WalletConnect"
import { useAuth } from "../hooks/useAuth"

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  const showMobileSidebar = pathname !== "/" && pathname !== "/auth/login" && pathname !== "/auth/register"

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4 md:gap-6">
          {showMobileSidebar && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-0">
                <Sidebar className="block h-full w-full border-0" />
              </SheetContent>
            </Sheet>
          )}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-r from-[#0075FF] to-[#00C2FF]">
              <Rocket className="h-4 w-4 text-white" />
            </div>
            <span className="hidden text-xl font-bold md:inline-flex">NexusMarket</span>
          </Link>
          {isAuthenticated && (
            <nav className="hidden md:flex md:gap-6">
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors hover:text-[#00C2FF] ${pathname === "/dashboard" ? "text-[#00C2FF]" : ""}`}
              >
                Dashboard
              </Link>
              <Link
                href="/marketplace"
                className={`text-sm font-medium transition-colors hover:text-[#00C2FF] ${pathname === "/marketplace" ? "text-[#00C2FF]" : ""}`}
              >
                Marketplace
              </Link>
              <Link
                href="/chats"
                className={`text-sm font-medium transition-colors hover:text-[#00C2FF] ${pathname === "/chats" ? "text-[#00C2FF]" : ""}`}
              >
                Messages
              </Link>
              <Link
                href="/sell"
                className={`text-sm font-medium transition-colors hover:text-[#00C2FF] ${pathname === "/sell" ? "text-[#00C2FF]" : ""}`}
              >
                Sell
              </Link>
            </nav>
          )}
        </div>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className={`relative transition-all duration-300 ${isSearchOpen ? "w-64" : "w-0"}`}>
                {isSearchOpen && (
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="h-9 w-full rounded-full border-[#0075FF] bg-background/80 pr-8"
                  />
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-muted-foreground hover:text-foreground"
              >
                {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              <WalletConnect />
            </>
          ) : (
            <WalletConnect />
          )}
        </div>
      </div>
    </header>
  )
}
