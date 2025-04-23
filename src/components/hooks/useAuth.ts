"use client"

import { useEffect, useState } from "react"
import type { AuthState, SignatureResponse } from "../../types/wallet.types"
import { authService } from "../../services/auth.service"

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  wallet: null,
  error: null,
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>(initialState)

  // Initialize auth state from token
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const user = await authService.getCurrentUser()
          setAuthState({
            isAuthenticated: true,
            isLoading: false,
            user,
            wallet: { publicKey: user.id, provider: "freighter" }, // This would come from the actual API
            error: null,
          })
        } else {
          setAuthState({
            ...initialState,
            isLoading: false,
          })
        }
      } catch (error) {
        console.error("Auth initialization error:", error)
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          user: null,
          wallet: null,
          error: "Failed to initialize authentication",
        })
      }
    }

    initAuth()
  }, [])

  /**
   * Connect wallet and authenticate user
   */
  const connectWallet = async (
    publicKey: string,
    provider: string,
    signCallback: (message: string) => Promise<string>,
  ) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }))

      // 1. Request challenge message
      const challenge = await authService.requestChallenge(publicKey)

      // 2. Sign the challenge with wallet
      const signature = await signCallback(challenge)

      // 3. Verify signature and get auth token
      const signatureData: SignatureResponse = {
        publicKey,
        signature,
      }

      const authResponse = await authService.verifySignature(signatureData)

      // 4. Update auth state
      setAuthState({
        isAuthenticated: true,
        isLoading: false,
        user: authResponse.user,
        wallet: authResponse.wallet,
        error: null,
      })

      return authResponse
    } catch (error) {
      console.error("Wallet connection error:", error)
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to connect wallet",
      }))
      throw error
    }
  }

  /**
   * Log out the current user
   */
  const logout = () => {
    authService.logout()
    setAuthState({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      wallet: null,
      error: null,
    })
  }

  return {
    ...authState,
    connectWallet,
    logout,
  }
}
