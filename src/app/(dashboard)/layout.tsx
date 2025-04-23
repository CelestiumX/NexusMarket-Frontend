import type React from "react"
import { Sidebar } from "../../components/layout/Sidebar"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="grid md:grid-cols-[240px_1fr]">
      <Sidebar className="hidden md:block" />
      <div className="flex-1">{children}</div>
    </div>
  )
}
