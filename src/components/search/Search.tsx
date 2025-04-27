"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { SearchIcon, X, TrendingUp } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useSearch } from "./SearchContext"

interface SearchProps {
  placeholder?: string
  className?: string
  onSearch?: (query: string) => void
}

export function Search({ placeholder = "Search products...", className, onSearch }: SearchProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { query: contextQuery, setQuery: setContextQuery } = useSearch()
  const initialQuery = searchParams.get("q") || ""

  const [query, setQuery] = useState(initialQuery)
  const [isFocused, setIsFocused] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [popularSearches] = useState<string[]>([
    "Digital Art",
    "Smart Contracts",
    "Stellar NFTs",
    "Blockchain Templates",
    "Crypto Collectibles",
  ])
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Sync with context
  useEffect(() => {
    if (contextQuery !== query) {
      setQuery(contextQuery)
    }
  }, [contextQuery])

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches")
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches))
    }
  }, [])

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Debounce search function
  const debouncedSearch = useCallback(
    (() => {
      let timeout: NodeJS.Timeout

      return (searchQuery: string) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          if (searchQuery.trim()) {
            // Save to recent searches
            const updatedSearches = [searchQuery, ...recentSearches.filter((item) => item !== searchQuery)].slice(0, 5)

            setRecentSearches(updatedSearches)
            localStorage.setItem("recentSearches", JSON.stringify(updatedSearches))

            // Update context
            setContextQuery(searchQuery)

            // Update URL and trigger search
            const params = new URLSearchParams(searchParams.toString())
            params.set("q", searchQuery)
            params.delete("page") // Reset to first page on new search
            router.push(`/marketplace?${params.toString()}`)

            if (onSearch) {
              onSearch(searchQuery)
            }
          }
        }, 500)
      }
    })(),
    [onSearch, recentSearches, router, searchParams, setContextQuery],
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    if (value.trim()) {
      debouncedSearch(value)
    }
  }

  const handleClearSearch = () => {
    setQuery("")
    setContextQuery("")
    inputRef.current?.focus()

    // Remove query param from URL
    const params = new URLSearchParams(searchParams.toString())
    params.delete("q")
    router.push(`/marketplace?${params.toString()}`)

    if (onSearch) {
      onSearch("")
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (query.trim()) {
      // Save to recent searches
      const updatedSearches = [query, ...recentSearches.filter((item) => item !== query)].slice(0, 5)
      setRecentSearches(updatedSearches)
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches))

      // Update context
      setContextQuery(query)

      // Update URL and trigger search
      const params = new URLSearchParams(searchParams.toString())
      params.set("q", query)
      params.delete("page") // Reset to first page on new search
      router.push(`/marketplace?${params.toString()}`)

      if (onSearch) {
        onSearch(query)
      }
    }

    setIsFocused(false)
  }

  const handleRecentSearchClick = (searchQuery: string) => {
    setQuery(searchQuery)
    setContextQuery(searchQuery)
    setIsFocused(false)

    // Update URL and trigger search
    const params = new URLSearchParams(searchParams.toString())
    params.set("q", searchQuery)
    params.delete("page") // Reset to first page on new search
    router.push(`/marketplace?${params.toString()}`)

    if (onSearch) {
      onSearch(searchQuery)
    }
  }

  return (
    <div ref={searchRef} className={cn("relative w-full", className)}>
      <form onSubmit={handleSearchSubmit} className="relative flex items-center">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          className="pl-10 pr-10 h-10 bg-background/80 border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          aria-label="Search products"
          role="searchbox"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={handleClearSearch}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </form>

      {isFocused && (
        <div className="absolute top-full left-0 z-10 mt-1 w-full rounded-md border border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md">
          <div className="p-2">
            {recentSearches.length > 0 && (
              <>
                <h3 className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Recent Searches</h3>
                <ul>
                  {recentSearches.map((search, index) => (
                    <li key={`recent-${index}`}>
                      <button
                        className="flex w-full items-center px-2 py-1.5 text-sm hover:bg-[#0075FF]/10 rounded-md"
                        onClick={() => handleRecentSearchClick(search)}
                      >
                        <SearchIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                        <span className="truncate">{search}</span>
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="my-1 border-t border-border/40"></div>
              </>
            )}

            <h3 className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Popular Searches</h3>
            <ul>
              {popularSearches.map((search, index) => (
                <li key={`popular-${index}`}>
                  <button
                    className="flex w-full items-center px-2 py-1.5 text-sm hover:bg-[#0075FF]/10 rounded-md"
                    onClick={() => handleRecentSearchClick(search)}
                  >
                    <TrendingUp className="mr-2 h-3.5 w-3.5 text-[#FF41B4]" />
                    <span className="truncate">{search}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
