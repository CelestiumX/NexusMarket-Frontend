import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "../../components/ui/button"
import { StarRating } from "../../components/common/StarRating"

interface ProductCardProps {
  product: {
    id: number | string
    title: string
    price: string
    image: string
    category: string
    seller: string
    rating: number
  }
  className?: string
  variant?: "default" | "compact"
}

export function ProductCard({ product, className, variant = "default" }: ProductCardProps) {
  if (variant === "compact") {
    return (
      <Link href={`/marketplace/product/${product.id}`} className="block">
        <div
          className={cn(
            "group flex items-center gap-3 rounded-lg border border-border/40 bg-background/80 p-3 backdrop-blur transition-all hover:border-[#0075FF]/40 hover:bg-[#0075FF]/5 supports-[backdrop-filter]:bg-background/60",
            className,
          )}
        >
          <div className="h-16 w-16 overflow-hidden rounded-md">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex-1 overflow-hidden">
            <h3 className="truncate text-sm font-medium">{product.title}</h3>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">by {product.seller}</p>
              <p className="font-bold text-[#00C2FF]">{product.price}</p>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/marketplace/product/${product.id}`} className="block">
      <div
        className={cn(
          "group overflow-hidden rounded-lg border border-border/40 bg-background/80 backdrop-blur transition-all hover:border-[#0075FF]/40 hover:bg-[#0075FF]/5 supports-[backdrop-filter]:bg-background/60",
          className,
        )}
      >
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="rounded-full bg-[#0075FF]/10 px-2 py-1 text-xs font-medium text-[#00C2FF]">
              {product.category === "digital" ? "Digital" : "Physical"}
            </div>
            <StarRating rating={product.rating} size="sm" />
          </div>
          <h3 className="mt-2 text-base font-medium">{product.title}</h3>
          <p className="text-xs text-muted-foreground">by {product.seller}</p>
        </div>
        <div className="flex items-center justify-between p-4 pt-0">
          <div className="font-bold text-[#00C2FF]">{product.price}</div>
          <Button
            size="sm"
            className="h-8 rounded-full bg-gradient-to-r from-[#0075FF] to-[#00C2FF] text-xs font-medium text-white hover:from-[#0075FF]/90 hover:to-[#00C2FF]/90"
          >
            <ShoppingCart className="mr-1 h-3 w-3" />
            Buy Now
          </Button>
        </div>
      </div>
    </Link>
  )
}
