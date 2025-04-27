"use client"

import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react"
import { useRouter, useSearchParams } from "next/navigation"

interface SearchContextProps {
  query: string
  setQuery: (query: string) => void
  filters: Record<string, string[]>
  setFilters: (filters: Record<string, string[]>) => void
  priceRange: [number, number]
  setPriceRange: (range: [number, number]) => void
  currency: "XLM" | "USDC"
  setCurrency: (currency: "XLM" | "USDC") => void
  sort: string
  setSort: (sort: string) => void
  view: "grid" | "list"
  setView: (view: "grid" | "list") => void
  page: number
  setPage: (page: number) => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  clearAll: () => void
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined)

export function SearchProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Track if we're currently updating the URL to prevent loops
  const isUpdatingUrl = useRef(false)
  // Track the last URL we pushed to avoid redundant updates
  const lastUrlRef = useRef("")

  // Initialize state from URL params
  const [query, setQuery] = useState(searchParams.get("q") || "")
  const [filters, setFilters] = useState<Record<string, string[]>>({})
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [currency, setCurrency] = useState<"XLM" | "USDC">((searchParams.get("currency") as "XLM" | "USDC") || "XLM")
  const [sort, setSort] = useState(searchParams.get("sort") || "newest")
  const [view, setView] = useState<"grid" | "list">((searchParams.get("view") as "grid" | "list") || "grid")
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1)
  const [isLoading, setIsLoading] = useState(false)

  // Initialize filters from URL params - only on mount
  useEffect(() => {
    const newFilters: Record<string, string[]> = {}

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

    // Parse type filter
    const typeParam = searchParams.get("type")
    if (typeParam) {
      newFilters.type = [typeParam]
    }

    setFilters(newFilters)

    // Parse price range
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    if (minPrice && maxPrice) {
      setPriceRange([Number.parseInt(minPrice), Number.parseInt(maxPrice)])
    }
  }, []) // Empty dependency array means this only runs once on mount

  // Update URL when search params change
  useEffect(() => {
    // Skip if we're already updating from a URL change
    if (isUpdatingUrl.current) {
      isUpdatingUrl.current = false
      return
    }

    // Create a new URLSearchParams object
    const params = new URLSearchParams()

    // Add query param
    if (query) {
      params.set("q", query)
    }

    // Add filter params
    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        const paramValue = values.join(",")
        params.set(key, paramValue)
      }
    })

    // Add price range params
    if (priceRange[0] > 0) {
      params.set("minPrice", priceRange[0].toString())
    }

    if (priceRange[1] < 1000) {
      params.set("maxPrice", priceRange[1].toString())
    }

    // Add currency param
    params.set("currency", currency)

    // Add sort param
    if (sort !== "newest") {
      params.set("sort", sort)
    }

    // Add view param
    if (view !== "grid") {
      params.set("view", view)
    }

    // Add page param
    if (page > 1) {
      params.set("page", page.toString())
    }

    const newUrl = `/marketplace?${params.toString()}`

    // Only update if the URL actually changed
    if (newUrl !== lastUrlRef.current) {
      lastUrlRef.current = newUrl
      router.push(newUrl, { scroll: false })
    }
  }, [query, filters, priceRange, currency, sort, view, page, router])

  // Listen for URL changes and update state accordingly
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search)

      isUpdatingUrl.current = true

      // Update query
      const queryParam = params.get("q")
      if (queryParam !== query) {
        setQuery(queryParam || "")
      }

      // Update filters
      const newFilters: Record<string, string[]> = {}

      const categoryParam = params.get("category")
      if (categoryParam) {
        newFilters.category = categoryParam.split(",")
      }

      const tagParam = params.get("tag")
      if (tagParam) {
        newFilters.tag = tagParam.split(",")
      }

      const typeParam = params.get("type")
      if (typeParam) {
        newFilters.type = [typeParam]
      }

      // Only update filters if they've changed
      const currentFiltersStr = JSON.stringify(filters)
      const newFiltersStr = JSON.stringify(newFilters)
      if (currentFiltersStr !== newFiltersStr) {
        setFilters(newFilters)
      }

      // Update price range
      const minPrice = params.get("minPrice")
      const maxPrice = params.get("maxPrice")
      if (minPrice && maxPrice) {
        const newRange: [number, number] = [Number.parseInt(minPrice), Number.parseInt(maxPrice)]
        if (newRange[0] !== priceRange[0] || newRange[1] !== priceRange[1]) {
          setPriceRange(newRange)
        }
      } else if (priceRange[0] !== 0 || priceRange[1] !== 1000) {
        setPriceRange([0, 1000])
      }

      // Update currency
      const currencyParam = params.get("currency") as "XLM" | "USDC"
      if (currencyParam && currencyParam !== currency) {
        setCurrency(currencyParam)
      }

      // Update sort
      const sortParam = params.get("sort")
      if (sortParam !== sort) {
        setSort(sortParam || "newest")
      }

      // Update view
      const viewParam = params.get("view") as "grid" | "list"
      if (viewParam && viewParam !== view) {
        setView(viewParam)
      }

      // Update page
      const pageParam = params.get("page")
      const newPage = pageParam ? Number(pageParam) : 1
      if (newPage !== page) {
        setPage(newPage)
      }
    }

    // Update state from URL on mount and when URL changes
    handleUrlChange()

    // Listen for popstate events (back/forward navigation)
    window.addEventListener("popstate", handleUrlChange)
    return () => window.removeEventListener("popstate", handleUrlChange)
  }, [searchParams.toString()]) // Only re-run when the URL changes

  const clearAll = () => {
    setQuery("")
    setFilters({})
    setPriceRange([0, 1000])
    setCurrency("XLM")
    setSort("newest")
    setPage(1)
    router.push("/marketplace")
  }

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        filters,
        setFilters,
        priceRange,
        setPriceRange,
        currency,
        setCurrency,
        sort,
        setSort,
        view,
        setView,
        page,
        setPage,
        isLoading,
        setIsLoading,
        clearAll,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider")
  }
  return context
}
