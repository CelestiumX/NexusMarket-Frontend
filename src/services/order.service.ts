import type { Order, OrderFilters, OrderStatus, PaymentStatus } from "../types/order.types"

// Mock API URL - would be replaced with actual API endpoint
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.nexusmarket.io"

class OrderService {
  /**
   * Get all orders for the current user
   */
  async getUserOrders(filters?: OrderFilters): Promise<Order[]> {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Generate mock orders
      const mockOrders: Order[] = Array.from({ length: 10 }, (_, i) => {
        const isDigital = i % 3 === 0
        const status: OrderStatus =
          i % 7 === 0
            ? "pending"
            : i % 7 === 1
              ? "processing"
              : i % 7 === 2
                ? "shipped"
                : i % 7 === 3
                  ? "delivered"
                  : i % 7 === 4
                    ? "completed"
                    : i % 7 === 5
                      ? "cancelled"
                      : "refunded"

        const date = new Date()
        date.setDate(date.getDate() - i * 3) // Orders from different days

        return {
          id: `order-${i + 1}`,
          userId: "user-1",
          sellerIds: [`seller-${(i % 5) + 1}`],
          orderNumber: `ORD-${100000 + i}`,
          items: [
            {
              id: `item-${i}-1`,
              productId: `product-${i + 1}`,
              product: {
                id: `product-${i + 1}`,
                title: `Product ${i + 1}`,
                slug: `product-${i + 1}`,
                description: `Description for product ${i + 1}`,
                type: isDigital ? "digital" : "physical",
                status: "published",
                price: {
                  amount: 50 + i * 10,
                  currency: "XLM",
                },
                images: [
                  {
                    id: `image-${i + 1}`,
                    url: `/placeholder.svg?height=100&width=100`,
                    alt: `Product ${i + 1}`,
                    isPrimary: true,
                  },
                ],
                categories: [],
                tags: [],
                sellerId: `seller-${(i % 5) + 1}`,
                createdAt: date.toISOString(),
                updatedAt: date.toISOString(),
              },
              quantity: i + 1,
              price: 50 + i * 10,
              currency: "XLM",
              total: (50 + i * 10) * (i + 1),
            },
          ],
          status,
          paymentStatus: status === "cancelled" ? "failed" : status === "refunded" ? "refunded" : "completed",
          paymentMethod: i % 2 === 0 ? "stellar" : "crypto",
          transactionHash: i % 2 === 0 ? `0x${Math.random().toString(16).substring(2, 42)}` : undefined,
          subtotal: (50 + i * 10) * (i + 1),
          shipping: isDigital ? 0 : 10,
          tax: (50 + i * 10) * (i + 1) * 0.05,
          total: (50 + i * 10) * (i + 1) + (isDigital ? 0 : 10) + (50 + i * 10) * (i + 1) * 0.05,
          currency: "XLM",
          shipping: isDigital
            ? undefined
            : {
                name: "John Doe",
                address: "123 Main St",
                city: "Anytown",
                state: "CA",
                country: "USA",
                postalCode: "12345",
                trackingNumber: status === "shipped" || status === "delivered" ? `TRK${100000 + i}` : undefined,
                carrier: status === "shipped" || status === "delivered" ? "Stellar Express" : undefined,
              },
          createdAt: date.toISOString(),
          updatedAt: date.toISOString(),
        }
      })

      // Apply filters if provided
      let filteredOrders = [...mockOrders]

      if (filters) {
        if (filters.status) {
          filteredOrders = filteredOrders.filter((order) => order.status === filters.status)
        }

        if (filters.dateRange) {
          const fromDate = filters.dateRange.from.getTime()
          const toDate = filters.dateRange.to.getTime()
          filteredOrders = filteredOrders.filter((order) => {
            const orderDate = new Date(order.createdAt).getTime()
            return orderDate >= fromDate && orderDate <= toDate
          })
        }

        if (filters.search) {
          const searchLower = filters.search.toLowerCase()
          filteredOrders = filteredOrders.filter(
            (order) =>
              order.orderNumber.toLowerCase().includes(searchLower) ||
              order.items.some((item) => item.product.title.toLowerCase().includes(searchLower)),
          )
        }

        if (filters.productType) {
          filteredOrders = filteredOrders.filter((order) =>
            order.items.some((item) => item.product.type === filters.productType),
          )
        }
      }

      return filteredOrders
    } catch (error) {
      console.error("Error fetching orders:", error)
      throw new Error("Failed to fetch orders")
    }
  }

  /**
   * Get a single order by ID
   */
  async getOrder(orderId: string): Promise<Order | null> {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 300))

      // For the specific order ID "ord_1", return a predefined order
      if (orderId === "ord_1") {
        return {
          id: "ord_1",
          userId: "user-1",
          sellerIds: ["seller-1"],
          orderNumber: "ORD-100001",
          items: [
            {
              id: "item-1",
              productId: "product-1",
              product: {
                id: "product-1",
                title: "Digital Art Collection",
                slug: "digital-art-collection",
                description: "A collection of digital art pieces",
                type: "digital",
                status: "published",
                price: {
                  amount: 50,
                  currency: "XLM",
                },
                images: [
                  {
                    id: "image-1",
                    url: "/placeholder.svg?height=100&width=100",
                    alt: "Digital Art Collection",
                    isPrimary: true,
                  },
                ],
                categories: [],
                tags: [],
                sellerId: "seller-1",
                createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
              },
              quantity: 1,
              price: 50,
              currency: "XLM",
              total: 50,
            },
          ],
          status: "delivered" as OrderStatus,
          paymentStatus: "completed" as PaymentStatus,
          paymentMethod: "stellar",
          transactionHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
          subtotal: 50,
          shipping: 0,
          tax: 2.5,
          total: 52.5,
          currency: "XLM",
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        }
      }

      // For other order IDs, generate a mock order
      const orderNumber = Number.parseInt(orderId.replace("order-", ""), 10) || 1
      const i = orderNumber - 1
      const isDigital = i % 3 === 0
      const status: OrderStatus =
        i % 7 === 0
          ? "pending"
          : i % 7 === 1
            ? "processing"
            : i % 7 === 2
              ? "shipped"
              : i % 7 === 3
                ? "delivered"
                : i % 7 === 4
                  ? "completed"
                  : i % 7 === 5
                    ? "cancelled"
                    : "refunded"

      const date = new Date()
      date.setDate(date.getDate() - i * 3) // Orders from different days

      return {
        id: orderId,
        userId: "user-1",
        sellerIds: [`seller-${(i % 5) + 1}`],
        orderNumber: `ORD-${100000 + i}`,
        items: [
          {
            id: `item-${i}-1`,
            productId: `product-${i + 1}`,
            product: {
              id: `product-${i + 1}`,
              title: `Product ${i + 1}`,
              slug: `product-${i + 1}`,
              description: `Description for product ${i + 1}`,
              type: isDigital ? "digital" : "physical",
              status: "published",
              price: {
                amount: 50 + i * 10,
                currency: "XLM",
              },
              images: [
                {
                  id: `image-${i + 1}`,
                  url: `/placeholder.svg?height=100&width=100`,
                  alt: `Product ${i + 1}`,
                  isPrimary: true,
                },
              ],
              categories: [],
              tags: [],
              sellerId: `seller-${(i % 5) + 1}`,
              createdAt: date.toISOString(),
              updatedAt: date.toISOString(),
            },
            quantity: i + 1,
            price: 50 + i * 10,
            currency: "XLM",
            total: (50 + i * 10) * (i + 1),
          },
        ],
        status,
        paymentStatus: status === "cancelled" ? "failed" : status === "refunded" ? "refunded" : "completed",
        paymentMethod: i % 2 === 0 ? "stellar" : "crypto",
        transactionHash: i % 2 === 0 ? `0x${Math.random().toString(16).substring(2, 42)}` : undefined,
        subtotal: (50 + i * 10) * (i + 1),
        shipping: isDigital ? 0 : 10,
        tax: (50 + i * 10) * (i + 1) * 0.05,
        total: (50 + i * 10) * (i + 1) + (isDigital ? 0 : 10) + (50 + i * 10) * (i + 1) * 0.05,
        currency: "XLM",
        shipping: isDigital
          ? undefined
          : {
              name: "John Doe",
              address: "123 Main St",
              city: "Anytown",
              state: "CA",
              country: "USA",
              postalCode: "12345",
              trackingNumber: status === "shipped" || status === "delivered" ? `TRK${100000 + i}` : undefined,
              carrier: status === "shipped" || status === "delivered" ? "Stellar Express" : undefined,
            },
        createdAt: date.toISOString(),
        updatedAt: date.toISOString(),
      }
    } catch (error) {
      console.error("Error fetching order:", error)
      return null
    }
  }

  /**
   * Cancel an order
   */
  async cancelOrder(orderId: string, reason: string): Promise<Order> {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Get the existing order
      const order = await this.getOrder(orderId)

      if (!order) {
        throw new Error("Order not found")
      }

      // Check if the order can be cancelled
      if (order.status !== "pending" && order.status !== "processing") {
        throw new Error("This order cannot be cancelled")
      }

      // Update the order status
      const updatedOrder = {
        ...order,
        status: "cancelled" as OrderStatus,
        paymentStatus: "failed" as PaymentStatus,
        updatedAt: new Date().toISOString(),
        cancellationReason: reason,
      }

      return updatedOrder
    } catch (error) {
      console.error("Error cancelling order:", error)
      throw new Error("Failed to cancel order")
    }
  }

  /**
   * Request a refund for an order
   */
  async requestRefund(orderId: string, reason: string): Promise<Order> {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Get the existing order
      const order = await this.getOrder(orderId)

      if (!order) {
        throw new Error("Order not found")
      }

      // Check if the order can be refunded
      if (order.status !== "delivered" && order.status !== "completed") {
        throw new Error("This order is not eligible for refund")
      }

      // Update the order status
      const updatedOrder = {
        ...order,
        status: "refunded" as OrderStatus,
        paymentStatus: "refunded" as PaymentStatus,
        updatedAt: new Date().toISOString(),
        refundReason: reason,
      }

      return updatedOrder
    } catch (error) {
      console.error("Error requesting refund:", error)
      throw new Error("Failed to request refund")
    }
  }

  /**
   * Update order status (for sellers)
   */
  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order> {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Get the existing order
      const order = await this.getOrder(orderId)

      if (!order) {
        throw new Error("Order not found")
      }

      // Validate status transition
      const validTransitions: Record<OrderStatus, OrderStatus[]> = {
        pending: ["processing", "cancelled"],
        processing: ["shipped", "cancelled"],
        shipped: ["delivered"],
        delivered: ["completed", "refunded"],
        completed: ["refunded"],
        cancelled: [],
        refunded: [],
      }

      if (!validTransitions[order.status].includes(status)) {
        throw new Error(`Cannot transition from ${order.status} to ${status}`)
      }

      // Update payment status based on order status
      let paymentStatus = order.paymentStatus
      if (status === "cancelled") {
        paymentStatus = "failed" as PaymentStatus
      } else if (status === "refunded") {
        paymentStatus = "refunded" as PaymentStatus
      }

      // Update the order status
      const updatedOrder = {
        ...order,
        status,
        paymentStatus,
        updatedAt: new Date().toISOString(),
      }

      return updatedOrder
    } catch (error) {
      console.error("Error updating order status:", error)
      throw new Error("Failed to update order status")
    }
  }

  /**
   * Add tracking information to an order (for sellers)
   */
  async addTracking(orderId: string, trackingNumber: string, carrier: string): Promise<Order> {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Get the existing order
      const order = await this.getOrder(orderId)

      if (!order) {
        throw new Error("Order not found")
      }

      // Check if the order has shipping details
      if (!order.shipping) {
        throw new Error("This order does not have shipping details")
      }

      // Check if the order status allows adding tracking
      if (order.status !== "processing" && order.status !== "shipped") {
        throw new Error("Tracking can only be added to processing or shipped orders")
      }

      // Update the order with tracking information
      const updatedOrder = {
        ...order,
        shipping: {
          ...order.shipping,
          trackingNumber,
          carrier,
        },
        status: "shipped" as OrderStatus,
        updatedAt: new Date().toISOString(),
      }

      return updatedOrder
    } catch (error) {
      console.error("Error adding tracking:", error)
      throw new Error("Failed to add tracking information")
    }
  }
}

// Export a singleton instance
export const orderService = new OrderService()
