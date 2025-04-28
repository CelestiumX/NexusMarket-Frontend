"use client"

import { useState, useEffect } from "react"

interface CacheItem<T> {
  data: T
  timestamp: number
}

interface SearchCacheOptions {
  cacheTime?: number // Time in milliseconds to keep cache valid
}

export function useSearchCache<T>(
  key: string,
  fetchFn: () => Promise<T>,
  dependencies: any[] = [],
  options: SearchCacheOptions = {},
) {
  const { cacheTime = 5 * 60 * 1000 } = options // Default 5 minutes
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Try to get from cache first
        if (typeof window !== "undefined") {
          const cachedData = localStorage.getItem(`search_cache_${key}`)

          if (cachedData) {
            const parsedCache: CacheItem<T> = JSON.parse(cachedData)
            const isValid = Date.now() - parsedCache.timestamp < cacheTime

            if (isValid) {
              setData(parsedCache.data)
              setIsLoading(false)
              return
            }
          }
        }

        // If no valid cache, fetch fresh data
        const result = await fetchFn()
        setData(result)

        // Store in cache
        if (typeof window !== "undefined") {
          const cacheItem: CacheItem<T> = {
            data: result,
            timestamp: Date.now(),
          }
          localStorage.setItem(`search_cache_${key}`, JSON.stringify(cacheItem))
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, dependencies)

  return {
    data: data || ([] as T),
    isLoading,
    error,
  }
}
