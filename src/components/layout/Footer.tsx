import Link from "next/link"
import { CircuitBoard, Github, Rocket, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-r from-[#0075FF] to-[#00C2FF]">
                <Rocket className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold">NexusMarket</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              A decentralized Web3 marketplace that transforms traditional e-commerce by leveraging the Stellar
              blockchain.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground transition-colors hover:text-[#00C2FF]">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground transition-colors hover:text-[#00C2FF]">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Marketplace</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/marketplace" className="text-muted-foreground transition-colors hover:text-[#00C2FF]">
                  Browse Products
                </Link>
              </li>
              <li>
                <Link
                  href="/marketplace/digital"
                  className="text-muted-foreground transition-colors hover:text-[#00C2FF]"
                >
                  Digital Goods
                </Link>
              </li>
              <li>
                <Link
                  href="/marketplace/physical"
                  className="text-muted-foreground transition-colors hover:text-[#00C2FF]"
                >
                  Physical Products
                </Link>
              </li>
              <li>
                <Link href="/sell" className="text-muted-foreground transition-colors hover:text-[#00C2FF]">
                  Become a Seller
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-[#00C2FF]">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-[#00C2FF]">
                  Stellar Blockchain
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-[#00C2FF]">
                  Soroban Contracts
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-[#00C2FF]">
                  Developer API
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-[#00C2FF]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-[#00C2FF]">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-[#00C2FF]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-[#00C2FF]">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-6 md:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} NexusMarket. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CircuitBoard className="h-4 w-4 text-[#9D4EDD]" />
            <span>Powered by Stellar Blockchain</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
