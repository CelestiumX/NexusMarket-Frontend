"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PaginationProps {
  totalPages: number
  siblingsCount?: number
  className?: string
  onPageChange?: (page: number) => void
}

export function Pagination({ totalPages, siblingsCount = 1, className, onPageChange }: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialPage = Number(searchParams.get("page")) || 1
  const isUpdatingUrl = useRef(false)
  const lastUrlRef = useRef("")

  const [currentPage, setCurrentPage] = useState(initialPage)

  // Update URL when page changes
  useEffect(() => {
    if (isUpdatingUrl.current) {
      isUpdatingUrl.current = false
      return
    }

    const params = new URLSearchParams(searchParams.toString())

    if (currentPage > 1) {
      params.set("page", currentPage.toString())
    } else {
      params.delete("page")
    }

    const newUrl = `/marketplace?${params.toString()}`

    // Only update if the URL actually changed
    if (newUrl !== lastUrlRef.current) {
      lastUrlRef.current = newUrl
      router.push(newUrl, { scroll: false })
    }

    if (onPageChange) {
      onPageChange(currentPage)
    }

    // Scroll to top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [currentPage, router, searchParams, onPageChange])

  // Listen for URL changes
  useEffect(() => {
    const pageParam = searchParams.get("page")
    const newPage = pageParam ? Number(pageParam) : 1
    if (newPage !== currentPage) {
      isUpdatingUrl.current = true
      setCurrentPage(newPage)
    }
  }, [searchParams, currentPage])

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = []

    // Always show first page
    pageNumbers.push(1)

    // Calculate range around current page
    const leftSibling = Math.max(currentPage - siblingsCount, 2)
    const rightSibling = Math.min(currentPage + siblingsCount, totalPages - 1)

    // Add dots if needed
    if (leftSibling > 2) {
      pageNumbers.push("dots-1")
    }

    // Add pages around current page
    for (let i = leftSibling; i <= rightSibling; i++) {
      pageNumbers.push(i)
    }

    // Add dots if needed
    if (rightSibling < totalPages - 1) {
      pageNumbers.push("dots-2")
    }

    // Always show last page if more than 1 page
    if (totalPages > 1) {
      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  const pageNumbers = getPageNumbers()

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  if (totalPages <= 1) return null

  return (
    <div className={cn("flex items-center justify-center gap-1", className)}>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>

      {pageNumbers.map((page, index) => {
        if (page === "dots-1" || page === "dots-2") {
          return (
            <span key={page} className="px-2 text-muted-foreground">
              ...
            </span>
          )
        }

        return (
          <Button
            key={index}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            className={cn(
              "h-8 w-8",
              currentPage === page
                ? "bg-gradient-to-r from-[#0075FF] to-[#00C2FF] text-white hover:from-[#0075FF]/90 hover:to-[#00C2FF]/90"
                : "border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60",
            )}
            onClick={() => handlePageChange(page as number)}
          >
            {page}
          </Button>
        )
      })}

      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
    </div>
  )
}
