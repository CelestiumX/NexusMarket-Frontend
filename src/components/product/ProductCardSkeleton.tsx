import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface ProductCardSkeletonProps {
  className?: string
  variant?: "default" | "compact"
}

export function ProductCardSkeleton({ className, variant = "default" }: ProductCardSkeletonProps) {
  if (variant === "compact") {
    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-lg border border-border/40 bg-background/80 p-3 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          className,
        )}
      >
        <Skeleton className="h-16 w-16 rounded-md" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className,
      )}
    >
      <Skeleton className="aspect-square w-full" />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="mt-2 h-5 w-3/4" />
        <Skeleton className="mt-1 h-3 w-1/2" />
      </div>
      <div className="flex items-center justify-between p-4 pt-0">
        <div>
          <Skeleton className="h-5 w-20" />
          <Skeleton className="mt-1 h-3 w-16" />
        </div>
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>
    </div>
  )
}
