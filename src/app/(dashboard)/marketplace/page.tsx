"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Filter, ListPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FilterSidebar } from "@/components/filters/FilterSidebar"
import { ProductGrid } from "@/components/product/ProductGrid"
import { ProductSort } from "@/components/product/ProductSort"
import { ProductViewToggle } from "@/components/product/ProductViewToggle"
import { Pagination } from "@/components/product/Pagination"
import { SearchProvider, useSearch } from "@/components/search/SearchContext"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Search } from "@/components/search/Search"
import { useSearchCache } from "@/hooks/useSearchCache"

// Mock data for categories
const categories = [
  {
    id: "category",
    name: "Categories",
    options: [
      { id: "digital-art", name: "Digital Art", count: 124 },
      { id: "smart-contracts", name: "Smart Contracts", count: 87 },
      { id: "e-books", name: "E-books", count: 56 },
      { id: "collectibles", name: "Collectibles", count: 43 },
      { id: "electronics", name: "Electronics", count: 32 },
      { id: "fashion", name: "Fashion", count: 28 },
      { id: "services", name: "Services", count: 19 },
    ],
    expanded: true,
  },
]

// Mock data for tags
const tags = [
  { id: "nft", name: "NFT", count: 145 },
  { id: "blockchain", name: "Blockchain", count: 112 },
  { id: "stellar", name: "Stellar", count: 98 },
  { id: "limited-edition", name: "Limited Edition", count: 76 },
  { id: "handmade", name: "Handmade", count: 54 },
  { id: "vintage", name: "Vintage", count: 43 },
  { id: "rare", name: "Rare", count: 38 },
  { id: "exclusive", name: "Exclusive", count: 27 },
]

// Mock data for price range
const priceRange = {
  min: 0,
  max: 1000,
  currency: "XLM" as const,
}

// Mock data for sort options
const sortOptions = [
  { label: "Most Recent", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Most Popular", value: "popular" },
  { label: "Best Rated", value: "rating" },
]

// Mock data for products
const generateMockProducts = (count: number, query = "", filters: Record<string, string[]> = {}, type = "all") => {
  // In a real app, this would be an API call
  const products = Array.from({ length: count }, (_, i) => ({
    id: `product-${i + 1}`,
    title: `Product ${i + 1}`,
    price: {
      amount: Math.floor(Math.random() * 500) + 50,
      currency: Math.random() > 0.5 ? "XLM" : "USDC",
      usdEquivalent: Math.floor(Math.random() * 100) + 10,
    } as const,
    image: `/placeholder.svg?height=300&width=300&query=Product+${i + 1}`,
    category: Math.random() > 0.5 ? "Digital Art" : "Smart Contracts",
    type: Math.random() > 0.5 ? "digital" : "physical",
    seller: `Seller ${Math.floor(Math.random() * 10) + 1}`,
    rating: Math.floor(Math.random() * 5) + 1,
    reviewCount: Math.floor(Math.random() * 50) + 1,
  }))

  // Filter by search query
  let filteredProducts = products
  if (query) {
    const lowerQuery = query.toLowerCase()
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery) ||
        product.seller.toLowerCase().includes(lowerQuery),
    )
  }

  // Filter by type
  if (type !== "all") {
    filteredProducts = filteredProducts.filter((product) => product.type === type)
  }

  // Filter by category
  if (filters.category?.length) {
    filteredProducts = filteredProducts.filter((product) =>
      filters.category.some((cat) => product.category.toLowerCase().includes(cat.toLowerCase())),
    )
  }

  // Filter by tags
  if (filters.tag?.length) {
    // In a real app, products would have tags
    // For this mock, we'll just filter randomly based on the product ID
    filteredProducts = filteredProducts.filter((product) =>
      filters.tag.some(
        (tag) => Number.parseInt(product.id.toString().replace("product-", "")) % (Number.parseInt(tag) + 3) === 0,
      ),
    )
  }

  return filteredProducts
}

function MarketplaceContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { query, view, isLoading, setIsLoading, filters, priceRange: currentPriceRange } = useSearch()
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Use a ref to track the current tab value
  const activeTabRef = useRef(searchParams.get("type") || "all")
  // Track if we're handling a tab change to prevent infinite loops
  const isTabChangeRef = useRef(false)
  // Track the last URL we updated to prevent redundant updates
  const lastUrlRef = useRef("")

  // Create a cache key based on search parameters
  const cacheKey = `products_${query}_${JSON.stringify(filters)}_${activeTabRef.current}_${currentPriceRange.join("_")}`

  // Use our custom hook for cached data fetching
  const { data, isLoading: isProductsLoading } = useSearchCache(
    cacheKey,
    async () => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate mock products based on filters
      return generateMockProducts(
        3, // Only show 3 products per page as requested
        query,
        filters,
        activeTabRef.current,
      )
    },
    [query, JSON.stringify(filters), activeTabRef.current, currentPriceRange.join("_")],
  )

  // Ensure products is always an array
  const products = data || []

  // Update loading state
  useEffect(() => {
    setIsLoading(isProductsLoading)
  }, [isProductsLoading, setIsLoading])

  // Handle tab change
  const handleTabChange = (value: string) => {
    if (value === activeTabRef.current) return

    isTabChangeRef.current = true
    activeTabRef.current = value

    const params = new URLSearchParams(searchParams.toString())

    if (value !== "all") {
      params.set("type", value)
    } else {
      params.delete("type")
    }

    // Reset page
    params.delete("page")

    const newUrl = `/marketplace?${params.toString()}`

    // Only update if the URL actually changed
    if (newUrl !== lastUrlRef.current) {
      lastUrlRef.current = newUrl
      router.push(newUrl, { scroll: false })
    }
  }

  // Update activeTab when URL type parameter changes
  useEffect(() => {
    const typeParam = searchParams.get("type")
    if (!isTabChangeRef.current && typeParam !== activeTabRef.current) {
      activeTabRef.current = typeParam || "all"
    }
    isTabChangeRef.current = false
  }, [searchParams])

  const handleFilterChange = (filters: Record<string, string[]>) => {
    // This would trigger a new search in a real implementation
    console.log("Filters changed:", filters)
  }

  return (
    <div className="flex flex-col gap-6 p-8">
      {/* Breadcrumb and Title */}
      <div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground">Marketplace</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Marketplace</h1>
      </div>

      {/* Search and Actions Row */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-xl">
          <Search placeholder="Search products..." />
        </div>

        <div className="flex items-center gap-2">
          <ProductSort options={sortOptions} />

          <ProductViewToggle />

          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] p-0">
              <SheetHeader className="p-4 border-b border-border/40">
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="overflow-y-auto h-[calc(100vh-5rem)] p-4">
                <FilterSidebar
                  categories={categories}
                  tags={tags}
                  priceRange={priceRange}
                  onFilterChange={handleFilterChange}
                />
              </div>
            </SheetContent>
          </Sheet>

          <Button
            className="bg-gradient-to-r from-[#0075FF] to-[#00C2FF] text-white hover:from-[#0075FF]/90 hover:to-[#00C2FF]/90"
            asChild
          >
            <Link href="/marketplace/list-product">
              <ListPlus className="mr-2 h-4 w-4" />
              List Product
            </Link>
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div>
        <Tabs value={activeTabRef.current} onValueChange={handleTabChange}>
          <TabsList className="bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="digital">Digital</TabsTrigger>
            <TabsTrigger value="physical">Physical</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Products Grid */}
      <ProductGrid products={products} isLoading={isLoading} layout={view} skeletonCount={3} />

      {/* Pagination */}
      {!isLoading && products && products.length > 0 && (
        <div className="mt-4">
          <Pagination totalPages={5} />
        </div>
      )}
    </div>
  )
}

export default function MarketplacePage() {
  return (
    <SearchProvider>
      <MarketplaceContent />
    </SearchProvider>
  )
}
