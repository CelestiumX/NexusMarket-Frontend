"use client"

import { useEffect, useState } from "react"
import { SearchX, RefreshCw, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface NoResultsProps {
  searchQuery?: string
  onClearFilters?: () => void
  className?: string
}

export function NoResults({ searchQuery, onClearFilters, className }: NoResultsProps) {
  const router = useRouter()
  const [suggestedCategories, setSuggestedCategories] = useState<string[]>([])

  // Generate suggested categories based on the search query
  useEffect(() => {
    // In a real app, these would come from an API based on the query
    // For now, we'll use static suggestions
    const defaultSuggestions = ["Digital Art", "Smart Contracts", "E-books", "Collectibles", "Electronics"]

    setSuggestedCategories(defaultSuggestions)
  }, [searchQuery])

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams()
    params.set("category", category.toLowerCase().replace(/\s+/g, "-"))
    router.push(`/marketplace?${params.toString()}`)
  }

  return (
    <div className={`flex flex-col items-center justify-center py-12 text-center ${className}`}>
      <div className="mb-4 rounded-full bg-[#0075FF]/10 p-4">
        <SearchX className="h-8 w-8 text-[#00C2FF]" />
      </div>

      <h3 className="mb-2 text-xl font-medium">No products found</h3>

      {searchQuery ? (
        <p className="mb-6 text-muted-foreground">
          No results found for "<span className="font-medium text-[#FF41B4]">{searchQuery}</span>"
        </p>
      ) : (
        <p className="mb-6 text-muted-foreground">No products match your current filter criteria</p>
      )}

      <div className="mb-8 flex flex-col items-center gap-4">
        {onClearFilters && (
          <Button variant="outline" onClick={onClearFilters} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Clear all filters
          </Button>
        )}

        <div className="text-center">
          <p className="mb-3 text-sm text-muted-foreground">Or explore these categories:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {suggestedCategories.map((category, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="flex items-center gap-1 border-[#0075FF]/30 hover:bg-[#0075FF]/10"
                onClick={() => handleCategoryClick(category)}
              >
                <Tag className="h-3 w-3" />
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Try adjusting your search or filter criteria to find what you're looking for
      </p>
    </div>
  )
}
