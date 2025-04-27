"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface FilterOption {
  id: string
  name: string
  count?: number
}

interface FilterCategory {
  id: string
  name: string
  options: FilterOption[]
  expanded?: boolean
}

interface PriceRange {
  min: number
  max: number
  currency: "XLM" | "USDC"
}

interface FilterSidebarProps {
  className?: string
  categories: FilterCategory[]
  tags: FilterOption[]
  priceRange: PriceRange
  onFilterChange: (filters: Record<string, string[]>) => void
}

export function FilterSidebar({ className, categories, tags, priceRange, onFilterChange }: FilterSidebarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isUpdatingUrl = useRef(false)
  const lastUrlRef = useRef("")

  // Initialize filters from URL params
  const initialFilters: Record<string, string[]> = {}

  // Parse category filters
  const categoryParam = searchParams.get("category")
  if (categoryParam) {
    initialFilters.category = categoryParam.split(",")
  }

  // Parse tag filters
  const tagParam = searchParams.get("tag")
  if (tagParam) {
    initialFilters.tag = tagParam.split(",")
  }

  // Parse price range
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")
  const priceCurrency = (searchParams.get("currency") as "XLM" | "USDC") || "XLM"

  const [filters, setFilters] = useState<Record<string, string[]>>(initialFilters)
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})
  const [currentPriceRange, setCurrentPriceRange] = useState<[number, number]>([
    minPrice ? Number.parseInt(minPrice) : priceRange.min,
    maxPrice ? Number.parseInt(maxPrice) : priceRange.max,
  ])
  const [currency, setCurrency] = useState<"XLM" | "USDC">(priceCurrency)
  const [pendingPriceRange, setPendingPriceRange] = useState<[number, number]>([
    minPrice ? Number.parseInt(minPrice) : priceRange.min,
    maxPrice ? Number.parseInt(maxPrice) : priceRange.max,
  ])

  // Initialize expanded state for categories
  useEffect(() => {
    const expanded: Record<string, boolean> = {}
    categories.forEach((category) => {
      expanded[category.id] = category.expanded || false
    })
    setExpandedCategories(expanded)
  }, [categories])

  // Update URL when filters change, but with debounce for price range
  useEffect(() => {
    if (isUpdatingUrl.current) {
      isUpdatingUrl.current = false
      return
    }

    const params = new URLSearchParams(searchParams.toString())
    let hasChanges = false

    // Current params for comparison
    const currentParams = new URLSearchParams(searchParams.toString())

    // Update category param
    if (filters.category && filters.category.length > 0) {
      const paramValue = filters.category.join(",")
      if (params.get("category") !== paramValue) {
        params.set("category", paramValue)
        hasChanges = true
      }
    } else if (currentParams.has("category")) {
      params.delete("category")
      hasChanges = true
    }

    // Update tag param
    if (filters.tag && filters.tag.length > 0) {
      const paramValue = filters.tag.join(",")
      if (params.get("tag") !== paramValue) {
        params.set("tag", paramValue)
        hasChanges = true
      }
    } else if (currentParams.has("tag")) {
      params.delete("tag")
      hasChanges = true
    }

    // Update price range params
    if (currentPriceRange[0] > priceRange.min) {
      const currentMinPrice = params.get("minPrice")
      if (currentMinPrice !== currentPriceRange[0].toString()) {
        params.set("minPrice", currentPriceRange[0].toString())
        hasChanges = true
      }
    } else if (currentParams.has("minPrice")) {
      params.delete("minPrice")
      hasChanges = true
    }

    if (currentPriceRange[1] < priceRange.max) {
      const currentMaxPrice = params.get("maxPrice")
      if (currentMaxPrice !== currentPriceRange[1].toString()) {
        params.set("maxPrice", currentPriceRange[1].toString())
        hasChanges = true
      }
    } else if (currentParams.has("maxPrice")) {
      params.delete("maxPrice")
      hasChanges = true
    }

    // Update currency param
    const currentCurrency = params.get("currency")
    if (currentCurrency !== currency) {
      params.set("currency", currency)
      hasChanges = true
    }

    // Only update URL if something has changed
    if (hasChanges) {
      const newUrl = `/marketplace?${params.toString()}`
      if (newUrl !== lastUrlRef.current) {
        lastUrlRef.current = newUrl
        router.push(newUrl, { scroll: false })
        onFilterChange(filters)
      }
    }
  }, [filters, currentPriceRange, currency, router, searchParams, onFilterChange, priceRange.min, priceRange.max])

  // Listen for URL changes
  useEffect(() => {
    const newFilters: Record<string, string[]> = {}
    let shouldUpdate = false

    // Parse category filters
    const categoryParam = searchParams.get("category")
    if (categoryParam) {
      newFilters.category = categoryParam.split(",")
    }

    // Parse tag filters
    const tagParam = searchParams.get("tag")
    if (tagParam) {
      newFilters.tag = tagParam.split(",")
    }

    // Check if filters have changed
    const currentFiltersStr = JSON.stringify(filters)
    const newFiltersStr = JSON.stringify(newFilters)

    if (currentFiltersStr !== newFiltersStr) {
      shouldUpdate = true
    }

    // Parse price range
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const newPriceRange: [number, number] = [
      minPrice ? Number.parseInt(minPrice) : priceRange.min,
      maxPrice ? Number.parseInt(maxPrice) : priceRange.max,
    ]

    if (newPriceRange[0] !== currentPriceRange[0] || newPriceRange[1] !== currentPriceRange[1]) {
      shouldUpdate = true
    }

    // Parse currency
    const newCurrency = (searchParams.get("currency") as "XLM" | "USDC") || "XLM"
    if (newCurrency !== currency) {
      shouldUpdate = true
    }

    // Update state if needed
    if (shouldUpdate) {
      isUpdatingUrl.current = true
      if (currentFiltersStr !== newFiltersStr) {
        setFilters(newFilters)
      }
      if (newPriceRange[0] !== currentPriceRange[0] || newPriceRange[1] !== currentPriceRange[1]) {
        setCurrentPriceRange(newPriceRange)
        setPendingPriceRange(newPriceRange)
      }
      if (newCurrency !== currency) {
        setCurrency(newCurrency)
      }
    }
  }, [searchParams.toString()])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }))
  }

  const handleCheckboxChange = (categoryId: string, optionId: string) => {
    setFilters((prev) => {
      const currentFilters = { ...prev }

      if (!currentFilters[categoryId]) {
        currentFilters[categoryId] = []
      }

      if (currentFilters[categoryId].includes(optionId)) {
        currentFilters[categoryId] = currentFilters[categoryId].filter((id) => id !== optionId)
      } else {
        currentFilters[categoryId] = [...currentFilters[categoryId], optionId]
      }

      if (currentFilters[categoryId].length === 0) {
        delete currentFilters[categoryId]
      }

      return currentFilters
    })
  }

  // Handle slider change with debounce
  const handlePriceRangeChange = (value: number[]) => {
    setPendingPriceRange([value[0], value[1]])
  }

  // Apply price range change after slider interaction ends
  const handlePriceRangeCommit = () => {
    setCurrentPriceRange(pendingPriceRange)
  }

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === "XLM" ? "USDC" : "XLM"))
  }

  const clearAllFilters = () => {
    setFilters({})
    setCurrentPriceRange([priceRange.min, priceRange.max])
    setPendingPriceRange([priceRange.min, priceRange.max])
    setCurrency("XLM")
  }

  const hasActiveFilters =
    Object.keys(filters).length > 0 || currentPriceRange[0] > priceRange.min || currentPriceRange[1] < priceRange.max

  return (
    <div className={cn("w-full", className)}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase">Filters</h2>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-7 text-xs text-[#00C2FF]">
              Clear All
            </Button>
          )}
        </div>

        {/* Price Range Filter */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Price Range</h3>
            <Button variant="ghost" size="sm" onClick={toggleCurrency} className="h-6 px-2 text-xs">
              {currency}
            </Button>
          </div>
          <Slider
            defaultValue={pendingPriceRange}
            min={priceRange.min}
            max={priceRange.max}
            step={10}
            value={pendingPriceRange}
            onValueChange={handlePriceRangeChange}
            onValueCommit={handlePriceRangeCommit}
            className="my-6"
          />
          <div className="flex items-center justify-between text-xs">
            <span>
              {pendingPriceRange[0]} {currency}
            </span>
            <span>
              {pendingPriceRange[1]} {currency}
            </span>
          </div>
        </div>

        <Separator className="bg-border/40" />

        {/* Categories Filter */}
        {categories.map((category) => (
          <div key={category.id}>
            <button
              className="flex w-full items-center justify-between py-2 text-sm font-medium"
              onClick={() => toggleCategory(category.id)}
            >
              <span>{category.name}</span>
              {expandedCategories[category.id] ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>

            {expandedCategories[category.id] && (
              <div className="ml-2 space-y-1 pt-1">
                {category.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${category.id}-${option.id}`}
                      checked={filters[category.id]?.includes(option.id)}
                      onCheckedChange={() => handleCheckboxChange(category.id, option.id)}
                    />
                    <Label
                      htmlFor={`${category.id}-${option.id}`}
                      className="flex w-full cursor-pointer items-center justify-between text-sm"
                    >
                      <span>{option.name}</span>
                      {option.count !== undefined && (
                        <span className="text-xs text-muted-foreground">({option.count})</span>
                      )}
                    </Label>
                  </div>
                ))}
              </div>
            )}

            <Separator className="my-2 bg-border/40" />
          </div>
        ))}

        {/* Tags Filter */}
        <div>
          <h3 className="mb-2 text-sm font-medium">Tags</h3>
          <div className="space-y-1">
            {tags.map((tag) => (
              <div key={tag.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`tag-${tag.id}`}
                  checked={filters.tag?.includes(tag.id)}
                  onCheckedChange={() => handleCheckboxChange("tag", tag.id)}
                />
                <Label
                  htmlFor={`tag-${tag.id}`}
                  className="flex w-full cursor-pointer items-center justify-between text-sm"
                >
                  <span>{tag.name}</span>
                  {tag.count !== undefined && <span className="text-xs text-muted-foreground">({tag.count})</span>}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
