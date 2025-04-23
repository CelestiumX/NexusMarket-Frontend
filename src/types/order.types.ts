import type { Product } from "./product.types"

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "completed" | "cancelled" | "refunded"

export type PaymentStatus = "pending" | "processing" | "completed" | "failed" | "refunded"

export type PaymentMethod = "stellar" | "credit_card" | "crypto"

export interface OrderItem {
  id: string
  productId: string
  product: Product
  quantity: number
  price: number
  currency: string
  total: number
}

export interface ShippingDetails {
  name: string
  address: string
  city: string
  state: string
  country: string
  postalCode: string
  trackingNumber?: string
  carrier?: string
}

export interface Order {
  id: string
  userId: string
  sellerIds: string[]
  orderNumber: string
  items: OrderItem[]
  status: OrderStatus
  paymentStatus: PaymentStatus
  paymentMethod: PaymentMethod
  transactionHash?: string
  subtotal: number
  shipping: number
  tax: number
  total: number
  currency: string
  shipping?: ShippingDetails
  cancellationReason?: string
  refundReason?: string
  createdAt: string
  updatedAt: string
}

export interface OrderFilters {
  status?: OrderStatus | "all"
  dateFrom?: string
  dateTo?: string
  search?: string
  productType?: "digital" | "physical"
  dateRange?: {
    from: Date
    to: Date
  }
}
