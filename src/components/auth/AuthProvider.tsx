"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useAuth } from "../../hooks/useAuth"

// Create the context with default values
const AuthContext = createContext<ReturnType<typeof useAuth> | undefined>(undefined)

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

// Hook to use the auth context
export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return context
}
