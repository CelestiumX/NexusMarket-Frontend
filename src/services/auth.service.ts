import type { AuthResponse, SignatureResponse, UserProfile } from "../types/wallet.types"

// Mock API URL - would be replaced with actual API endpoint
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.nexusmarket.io"

class AuthService {
  private token: string | null = null

  constructor() {
    // Initialize token from localStorage if available
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("nexusmarket_token")
    }
  }

  /**
   * Get the current authentication token
   */
  getToken(): string | null {
    return this.token
  }

  /**
   * Set the authentication token and store it in localStorage
   */
  setToken(token: string): void {
    this.token = token
    if (typeof window !== "undefined") {
      localStorage.setItem("nexusmarket_token", token)
    }
  }

  /**
   * Clear the authentication token and remove it from localStorage
   */
  clearToken(): void {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("nexusmarket_token")
    }
  }

  /**
   * Check if the user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.token
  }

  /**
   * Request a challenge message for wallet signature
   */
  async requestChallenge(publicKey: string): Promise<string> {
    try {
      // In a real implementation, this would call the backend API
      // For now, we'll simulate a response
      return `Sign this message to authenticate with NexusMarket: ${Date.now()}`
    } catch (error) {
      console.error("Error requesting challenge:", error)
      throw new Error("Failed to request authentication challenge")
    }
  }

  /**
   * Verify a wallet signature and authenticate the user
   */
  async verifySignature(signatureData: SignatureResponse): Promise<AuthResponse> {
    try {
      // In a real implementation, this would call the backend API
      // For now, we'll simulate a successful response
      const mockResponse: AuthResponse = {
        token: `mock_jwt_token_${Date.now()}`,
        user: {
          id: "1",
          username: "stellar_user",
          email: "user@example.com",
          avatar: "/placeholder.svg?height=100&width=100",
          reputation: 4.8,
          createdAt: new Date().toISOString(),
          isVerified: true,
        },
        wallet: {
          publicKey: signatureData.publicKey,
          provider: "freighter",
        },
      }

      this.setToken(mockResponse.token)
      return mockResponse
    } catch (error) {
      console.error("Error verifying signature:", error)
      throw new Error("Failed to verify wallet signature")
    }
  }

  /**
   * Get the current user profile
   */
  async getCurrentUser(): Promise<UserProfile> {
    if (!this.token) {
      throw new Error("Not authenticated")
    }

    try {
      // In a real implementation, this would call the backend API
      // For now, we'll simulate a response
      return {
        id: "1",
        username: "stellar_user",
        email: "user@example.com",
        avatar: "/placeholder.svg?height=100&width=100",
        reputation: 4.8,
        createdAt: new Date().toISOString(),
        isVerified: true,
      }
    } catch (error) {
      console.error("Error fetching user profile:", error)
      throw new Error("Failed to fetch user profile")
    }
  }

  /**
   * Log out the current user
   */
  logout(): void {
    this.clearToken()
  }
}

// Export a singleton instance
export const authService = new AuthService()
