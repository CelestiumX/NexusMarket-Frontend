export type WalletProvider = "albedo" | "freighter" | "lobstr"

export interface WalletInfo {
  publicKey: string
  provider: WalletProvider
}

export interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  user: UserProfile | null
  wallet: WalletInfo | null
  error: string | null
}

export interface UserProfile {
  id: string
  username: string
  email?: string
  avatar?: string
  reputation?: number
  createdAt: string
  isVerified: boolean
}

export interface SignatureRequest {
  publicKey: string
  message: string
}

export interface SignatureResponse {
  publicKey: string
  signature: string
}

export interface AuthResponse {
  token: string
  user: UserProfile
  wallet: WalletInfo
}
