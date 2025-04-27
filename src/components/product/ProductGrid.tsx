import { cn } from "@/lib/utils"
import { ProductCard } from "./ProductCard"
import { ProductCardSkeleton } from "./ProductCardSkeleton"
import { NoResults } from "./NoResults"
import { useSearch } from "@/components/search/SearchContext"

interface Product {
  id: number | string
  title: string
  price: {
    amount: number
    currency: "XLM" | "USDC"
    usdEquivalent?: number
  }
  image: string
  category: string
  type: "digital" | "physical"
  seller: string
  rating: number
  reviewCount?: number
}

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
  className?: string
  layout?: "grid" | "list"
  skeletonCount?: number
}

export function ProductGrid({
  products = [],
  isLoading = false,
  className,
  layout = "grid",
  skeletonCount = 6,
}: ProductGridProps) {
  const { query, clearAll } = useSearch()

  const gridClassName = cn(
    layout === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4",
    className,
  )

  if (isLoading) {
    return (
      <div className={gridClassName}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <ProductCardSkeleton key={index} variant={layout === "list" ? "compact" : "default"} />
        ))}
      </div>
    )
  }

  if (!products || products.length === 0) {
    return <NoResults searchQuery={query} onClearFilters={clearAll} />
  }

  return (
    <div className={gridClassName}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} variant={layout === "list" ? "compact" : "default"} />
      ))}
    </div>
  )
}
