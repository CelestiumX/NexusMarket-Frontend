"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface SortOption {
  label: string
  value: string
}

interface ProductSortProps {
  options: SortOption[]
  defaultOption?: string
  onChange?: (value: string) => void
}

export function ProductSort({ options, defaultOption = "newest", onChange }: ProductSortProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialSort = searchParams.get("sort") || defaultOption
  const isUpdatingUrl = useRef(false)
  const lastUrlRef = useRef("")

  const [selectedSort, setSelectedSort] = useState(initialSort)

  // Find the label for the current sort value
  const selectedLabel = options.find((option) => option.value === selectedSort)?.label || "Sort"

  // Update URL when sort changes
  useEffect(() => {
    if (isUpdatingUrl.current) {
      isUpdatingUrl.current = false
      return
    }

    const params = new URLSearchParams(searchParams.toString())

    if (selectedSort !== defaultOption) {
      params.set("sort", selectedSort)
    } else {
      params.delete("sort")
    }

    const newUrl = `/marketplace?${params.toString()}`

    // Only update if the URL actually changed
    if (newUrl !== lastUrlRef.current) {
      lastUrlRef.current = newUrl
      router.push(newUrl, { scroll: false })
    }

    if (onChange) {
      onChange(selectedSort)
    }
  }, [selectedSort, router, searchParams, defaultOption, onChange])

  // Listen for URL changes
  useEffect(() => {
    const sortParam = searchParams.get("sort")
    if (sortParam !== selectedSort && (sortParam || defaultOption !== selectedSort)) {
      isUpdatingUrl.current = true
      setSelectedSort(sortParam || defaultOption)
    }
  }, [searchParams, defaultOption, selectedSort])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
          {selectedLabel}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className="flex items-center justify-between"
            onClick={() => setSelectedSort(option.value)}
          >
            {option.label}
            {option.value === selectedSort && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
