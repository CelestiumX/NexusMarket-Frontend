"use client"

import { Star } from "lucide-react"
import { cn } from "../../lib/utils"

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  className?: string
  interactive?: boolean
  onRatingChange?: (rating: number) => void
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  className,
  interactive = false,
  onRatingChange,
}: StarRatingProps) {
  const stars = Array.from({ length: maxRating }, (_, i) => i + 1)

  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  const handleClick = (selectedRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(selectedRating)
    }
  }

  return (
    <div className={cn("flex items-center", className)}>
      {stars.map((star) => (
        <Star
          key={star}
          className={cn(
            sizeClasses[size],
            star <= rating ? "fill-[#FF41B4] text-[#FF41B4]" : "fill-transparent text-muted-foreground",
            interactive && "cursor-pointer transition-colors hover:text-[#FF41B4]",
          )}
          onClick={() => handleClick(star)}
        />
      ))}
    </div>
  )
}
