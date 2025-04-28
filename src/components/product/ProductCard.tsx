import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { StarRating } from "@/components/common/StarRating"
import { LazyImage } from "./LazyImage"

interface ProductCardProps {
  product: {
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
  className?: string
  variant?: "default" | "compact"
  showSecondaryPrice?: boolean
}

export function ProductCard({ product, className, variant = "default", showSecondaryPrice = true }: ProductCardProps) {
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
            <LazyImage
              src={product.image || "/placeholder.svg?height=64&width=64&query=Product"}
              alt={product.title}
              width={64}
              height={64}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex-1 overflow-hidden">
            <h3 className="truncate text-sm font-medium">{product.title}</h3>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">by {product.seller}</p>
              <div>
                <p className="font-bold text-[#00C2FF]">
                  {product.price.amount} {product.price.currency}
                </p>
                {showSecondaryPrice && product.price.usdEquivalent && (
                  <p className="text-xs text-muted-foreground text-right">≈ ${product.price.usdEquivalent} USD</p>
                )}
              </div>
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
        <div className="aspect-square overflow-hidden relative">
          <LazyImage
            src={product.image || "/placeholder.svg?height=300&width=300&query=Product"}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="rounded-full bg-[#0075FF]/10 px-2 py-1 text-xs font-medium text-[#00C2FF]">
              {product.type === "digital" ? "Digital" : "Physical"}
            </div>
            <StarRating rating={product.rating} size="sm" />
          </div>
          <h3 className="mt-2 text-base font-medium truncate">{product.title}</h3>
          <p className="text-xs text-muted-foreground">by {product.seller}</p>
        </div>
        <div className="flex items-center justify-between p-4 pt-0">
          <div>
            <div className="font-bold text-[#00C2FF]">
              {product.price.amount} {product.price.currency}
            </div>
            {showSecondaryPrice && product.price.usdEquivalent && (
              <div className="text-xs text-muted-foreground">≈ ${product.price.usdEquivalent} USD</div>
            )}
          </div>
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
