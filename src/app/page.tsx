import Link from "next/link"
import { ArrowRight, CircuitBoard, Rocket, ShieldCheck, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 z-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#080E21]/0 via-[#080E21]/50 to-[#080E21]"></div>

        {/* Animated circuit lines */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute left-1/4 top-1/3 h-px w-64 animate-pulse bg-gradient-to-r from-[#0075FF] to-transparent"></div>
          <div className="absolute right-1/4 top-2/3 h-px w-64 animate-pulse bg-gradient-to-l from-[#00C2FF] to-transparent"></div>
          <div className="absolute bottom-1/4 left-1/3 h-64 w-px animate-pulse bg-gradient-to-t from-[#9D4EDD] to-transparent"></div>
          <div className="absolute right-1/3 top-1/4 h-64 w-px animate-pulse bg-gradient-to-b from-[#FF41B4] to-transparent"></div>
        </div>

        <div className="container relative z-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0075FF]/30 bg-[#080E21]/60 px-4 py-2 text-sm backdrop-blur">
              <CircuitBoard className="h-4 w-4 text-[#FF41B4]" />
              <span>Powered by Stellar Blockchain</span>
            </div>
            <h1 className="mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
              The Future of Decentralized Commerce
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              NexusMarket transforms traditional e-commerce by eliminating intermediaries and leveraging the Stellar
              blockchain for secure, low-cost transactions.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-[#0075FF] to-[#00C2FF] text-white hover:from-[#0075FF]/90 hover:to-[#00C2FF]/90"
                asChild
              >
                <Link href="/dashboard">
                  Connect Wallet
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-[#0075FF] bg-transparent text-white hover:bg-[#0075FF]/10"
                asChild
              >
                <Link href="/marketplace">Explore Marketplace</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Powered by Blockchain Technology</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Leveraging the Stellar blockchain and Soroban smart contracts for secure, transparent, and efficient
              transactions.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="group rounded-xl border border-[#0075FF]/20 bg-[#080E21]/60 p-6 backdrop-blur transition-all hover:border-[#0075FF]/40 hover:bg-[#0075FF]/5">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#0075FF] to-[#00C2FF] text-white">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Secure Transactions</h3>
              <p className="text-muted-foreground">
                Every transaction is secured by blockchain technology, ensuring your data and assets remain protected.
              </p>
            </div>
            <div className="group rounded-xl border border-[#0075FF]/20 bg-[#080E21]/60 p-6 backdrop-blur transition-all hover:border-[#0075FF]/40 hover:bg-[#0075FF]/5">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#9D4EDD] to-[#FF41B4] text-white">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Low-Cost & Fast</h3>
              <p className="text-muted-foreground">
                Stellar blockchain provides near-instant transactions with minimal fees, making commerce accessible to
                everyone.
              </p>
            </div>
            <div className="group rounded-xl border border-[#0075FF]/20 bg-[#080E21]/60 p-6 backdrop-blur transition-all hover:border-[#0075FF]/40 hover:bg-[#0075FF]/5">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#00C2FF] to-[#0075FF] text-white">
                <Rocket className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Smart Contracts</h3>
              <p className="text-muted-foreground">
                Soroban smart contracts automate and secure marketplace operations, from escrow to reputation systems.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
