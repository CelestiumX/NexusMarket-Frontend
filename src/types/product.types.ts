export type ProductType = "physical" | "digital"
export type ProductStatus = "draft" | "published" | "sold" | "archived"
export type CurrencyType = "XLM" | "USDC"

export interface ProductCategory {
  id: string
  name: string
  slug: string
  description?: string
  parentId?: string
}

export interface ProductTag {
  id: string
  name: string
  slug: string
}

export interface ProductImage {
  id: string
  url: string
  ipfsHash?: string
  alt?: string
  isPrimary?: boolean
}

export interface ProductFile {
  id: string
  name: string
  size: number
  type: string
  url?: string
  ipfsHash?: string
}

export interface ProductPrice {
  amount: number
  currency: CurrencyType
  discountAmount?: number
  originalAmount?: number
}

export interface PhysicalProductDetails {
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
  shippingOptions?: ShippingOption[]
  condition?: string
  quantity: number
  location?: string
}

export interface DigitalProductDetails {
  fileType?: string
  fileSize?: number
  downloadMethod?: "direct" | "ipfs" | "link"
  previewUrl?: string
  licenseType?: string
  usageLimits?: string
}

export interface ShippingOption {
  id: string
  name: string
  price: ProductPrice
  estimatedDelivery: string
  countries: string[]
}

export interface Product {
  id: string
  title: string
  slug: string
  description: string
  type: ProductType
  status: ProductStatus
  price: ProductPrice
  images: ProductImage[]
  categories: ProductCategory[]
  tags: ProductTag[]
  sellerId: string
  createdAt: string
  updatedAt: string
  publishedAt?: string
  physicalDetails?: PhysicalProductDetails
  digitalDetails?: DigitalProductDetails
  rating?: number
  reviewCount?: number
}

export interface ProductFormData {
  title: string
  description: string
  type: ProductType
  price: {
    amount: number
    currency: CurrencyType
  }
  images: File[]
  categories: string[]
  tags: string[]
  physicalDetails?: {
    weight?: number
    dimensions?: {
      length: number
      width: number
      height: number
    }
    condition?: string
    quantity: number
    location?: string
  }
  digitalDetails?: {
    files?: File[]
    licenseType?: string
    usageLimits?: string
  }
}
