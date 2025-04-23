import type { Product, ProductFormData, ProductCategory, ProductTag } from "../types/product.types"
import { authService } from "./auth.service"

// Mock API URL - would be replaced with actual API endpoint
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.nexusmarket.io"

interface ProductImage {
  id: string
  url: string
  ipfsHash?: string
  alt: string
  isPrimary: boolean
}

interface ProductFile {
  id: string
  name: string
  size: number
  type: string
  url: string
  ipfsHash: string
}

class ProductService {
  /**
   * Get all products with optional filtering
   */
  async getProducts(params?: {
    page?: number
    limit?: number
    type?: string
    category?: string
    search?: string
    sort?: string
  }): Promise<{ products: Product[]; total: number; pages: number }> {
    try {
      // In a real implementation, this would call the backend API with the params
      // For now, we'll simulate a response with mock data
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay

      // Mock products data
      const mockProducts: Product[] = Array.from({ length: 12 }, (_, i) => ({
        id: `product-${i + 1}`,
        title: `Product ${i + 1}`,
        slug: `product-${i + 1}`,
        description: `This is a description for product ${i + 1}`,
        type: i % 2 === 0 ? "physical" : "digital",
        status: "published",
        price: {
          amount: 100 + i * 10,
          currency: i % 3 === 0 ? "USDC" : "XLM",
        },
        images: [
          {
            id: `image-${i + 1}`,
            url: `/placeholder.svg?height=300&width=300`,
            alt: `Product ${i + 1}`,
            isPrimary: true,
          },
        ],
        categories: [
          {
            id: `category-${(i % 3) + 1}`,
            name: `Category ${(i % 3) + 1}`,
            slug: `category-${(i % 3) + 1}`,
          },
        ],
        tags: [
          {
            id: `tag-${(i % 5) + 1}`,
            name: `Tag ${(i % 5) + 1}`,
            slug: `tag-${(i % 5) + 1}`,
          },
        ],
        sellerId: "seller-1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        rating: 4 + Math.random(),
        reviewCount: Math.floor(Math.random() * 50),
      }))

      return {
        products: mockProducts,
        total: 100,
        pages: 10,
      }
    } catch (error) {
      console.error("Error fetching products:", error)
      throw new Error("Failed to fetch products")
    }
  }

  /**
   * Get a single product by ID
   */
  async getProduct(id: string): Promise<Product> {
    try {
      // In a real implementation, this would call the backend API
      // For now, we'll simulate a response
      await new Promise((resolve) => setTimeout(resolve, 300)) // Simulate API delay

      return {
        id,
        title: `Product ${id}`,
        slug: `product-${id}`,
        description:
          "This is a detailed product description that explains all the features and benefits of the product.",
        type: Math.random() > 0.5 ? "physical" : "digital",
        status: "published",
        price: {
          amount: 150,
          currency: "XLM",
        },
        images: [
          {
            id: "image-1",
            url: "/placeholder.svg?height=600&width=600",
            alt: `Product ${id}`,
            isPrimary: true,
          },
          {
            id: "image-2",
            url: "/placeholder.svg?height=600&width=600",
            alt: `Product ${id} - 2`,
            isPrimary: false,
          },
        ],
        categories: [
          {
            id: "category-1",
            name: "Category 1",
            slug: "category-1",
          },
        ],
        tags: [
          {
            id: "tag-1",
            name: "Tag 1",
            slug: "tag-1",
          },
          {
            id: "tag-2",
            name: "Tag 2",
            slug: "tag-2",
          },
        ],
        sellerId: "seller-1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
        physicalDetails: {
          weight: 1.5,
          dimensions: {
            length: 10,
            width: 5,
            height: 2,
          },
          condition: "New",
          quantity: 10,
          location: "New York, USA",
        },
        digitalDetails: {
          fileType: "PDF",
          fileSize: 2048,
          downloadMethod: "direct",
          previewUrl: "/placeholder.svg?height=300&width=300",
          licenseType: "Standard",
          usageLimits: "Personal use only",
        },
        rating: 4.7,
        reviewCount: 23,
      }
    } catch (error) {
      console.error("Error fetching product:", error)
      throw new Error("Failed to fetch product")
    }
  }

  /**
   * Create a new product
   */
  async createProduct(productData: ProductFormData): Promise<Product> {
    try {
      const token = authService.getToken()
      if (!token) {
        throw new Error("Authentication required")
      }

      // In a real implementation, this would call the backend API
      // For now, we'll simulate a response
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

      // Mock response
      return {
        id: `product-${Date.now()}`,
        title: productData.title,
        slug: productData.title.toLowerCase().replace(/\s+/g, "-"),
        description: productData.description,
        type: productData.type,
        status: "draft",
        price: {
          amount: productData.price.amount,
          currency: productData.price.currency,
        },
        images: productData.images.map((_, index) => ({
          id: `image-${index + 1}`,
          url: `/placeholder.svg?height=300&width=300`,
          alt: productData.title,
          isPrimary: index === 0,
        })),
        categories: productData.categories.map((id) => ({
          id,
          name: `Category ${id}`,
          slug: `category-${id}`,
        })),
        tags: productData.tags.map((id) => ({
          id,
          name: `Tag ${id}`,
          slug: `tag-${id}`,
        })),
        sellerId: "seller-1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        physicalDetails: productData.type === "physical" ? productData.physicalDetails : undefined,
        digitalDetails: productData.type === "digital" ? productData.digitalDetails : undefined,
      }
    } catch (error) {
      console.error("Error creating product:", error)
      throw new Error("Failed to create product")
    }
  }

  /**
   * Update an existing product
   */
  async updateProduct(id: string, productData: Partial<ProductFormData>): Promise<Product> {
    try {
      const token = authService.getToken()
      if (!token) {
        throw new Error("Authentication required")
      }

      // In a real implementation, this would call the backend API
      // For now, we'll simulate a response
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

      // Get the existing product
      const existingProduct = await this.getProduct(id)

      // Mock response with updated data
      return {
        ...existingProduct,
        ...productData,
        updatedAt: new Date().toISOString(),
      }
    } catch (error) {
      console.error("Error updating product:", error)
      throw new Error("Failed to update product")
    }
  }

  /**
   * Delete a product
   */
  async deleteProduct(id: string): Promise<boolean> {
    try {
      const token = authService.getToken()
      if (!token) {
        throw new Error("Authentication required")
      }

      // In a real implementation, this would call the backend API
      // For now, we'll simulate a response
      await new Promise((resolve) => setTimeout(resolve, 800)) // Simulate API delay

      return true
    } catch (error) {
      console.error("Error deleting product:", error)
      throw new Error("Failed to delete product")
    }
  }

  /**
   * Get all product categories
   */
  async getCategories(): Promise<ProductCategory[]> {
    try {
      // In a real implementation, this would call the backend API
      // For now, we'll simulate a response
      await new Promise((resolve) => setTimeout(resolve, 300)) // Simulate API delay

      return [
        { id: "1", name: "Digital Art", slug: "digital-art", description: "Digital artwork and NFTs" },
        { id: "2", name: "Smart Contracts", slug: "smart-contracts", description: "Smart contract templates and code" },
        { id: "3", name: "E-books", slug: "e-books", description: "Digital books and publications" },
        { id: "4", name: "Collectibles", slug: "collectibles", description: "Physical collectible items" },
        { id: "5", name: "Electronics", slug: "electronics", description: "Electronic devices and gadgets" },
        { id: "6", name: "Fashion", slug: "fashion", description: "Clothing and accessories" },
        { id: "7", name: "Services", slug: "services", description: "Professional services" },
      ]
    } catch (error) {
      console.error("Error fetching categories:", error)
      throw new Error("Failed to fetch categories")
    }
  }

  /**
   * Get all product tags
   */
  async getTags(): Promise<ProductTag[]> {
    try {
      // In a real implementation, this would call the backend API
      // For now, we'll simulate a response
      await new Promise((resolve) => setTimeout(resolve, 300)) // Simulate API delay

      return [
        { id: "1", name: "NFT", slug: "nft" },
        { id: "2", name: "Blockchain", slug: "blockchain" },
        { id: "3", name: "Stellar", slug: "stellar" },
        { id: "4", name: "Limited Edition", slug: "limited-edition" },
        { id: "5", name: "Handmade", slug: "handmade" },
        { id: "6", name: "Vintage", slug: "vintage" },
        { id: "7", name: "Rare", slug: "rare" },
        { id: "8", name: "Exclusive", slug: "exclusive" },
      ]
    } catch (error) {
      console.error("Error fetching tags:", error)
      throw new Error("Failed to fetch tags")
    }
  }

  /**
   * Upload product images to IPFS
   */
  async uploadImages(images: File[]): Promise<ProductImage[]> {
    try {
      // In a real implementation, this would upload to IPFS
      // For now, we'll simulate a response
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate upload delay

      return images.map((image, index) => ({
        id: `image-${Date.now()}-${index}`,
        url: URL.createObjectURL(image),
        ipfsHash: `ipfs-hash-${Date.now()}-${index}`,
        alt: image.name,
        isPrimary: index === 0,
      }))
    } catch (error) {
      console.error("Error uploading images:", error)
      throw new Error("Failed to upload images")
    }
  }

  /**
   * Upload product files to IPFS
   */
  async uploadFiles(files: File[]): Promise<ProductFile[]> {
    try {
      // In a real implementation, this would upload to IPFS
      // For now, we'll simulate a response
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate upload delay

      return files.map((file) => ({
        id: `file-${Date.now()}-${file.name}`,
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
        ipfsHash: `ipfs-hash-${Date.now()}-${file.name}`,
      }))
    } catch (error) {
      console.error("Error uploading files:", error)
      throw new Error("Failed to upload files")
    }
  }
}

// Export a singleton instance
export const productService = new ProductService()
