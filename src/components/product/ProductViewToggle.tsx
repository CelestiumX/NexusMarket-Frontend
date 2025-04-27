"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Grid, List } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

interface ProductViewToggleProps {
  onChange?: (view: "grid" | "list") => void
}

export function ProductViewToggle({ onChange }: ProductViewToggleProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialView = (searchParams.get("view") as "grid" | "list") || "grid"
  const isUpdatingUrl = useRef(false)
  const lastUrlRef = useRef("")

  const [view, setView] = useState<"grid" | "list">(initialView)

  // Update URL when view changes
  useEffect(() => {
    if (isUpdatingUrl.current) {
      isUpdatingUrl.current = false
      return
    }

    const params = new URLSearchParams(searchParams.toString())

    if (view !== "grid") {
      params.set("view", view)
    } else {
      params.delete("view")
    }

    const newUrl = `/marketplace?${params.toString()}`

    // Only update if the URL actually changed
    if (newUrl !== lastUrlRef.current) {
      lastUrlRef.current = newUrl
      router.push(newUrl, { scroll: false })
    }

    if (onChange) {
      onChange(view)
    }

    // Save preference to localStorage
    localStorage.setItem("productViewPreference", view)
  }, [view, router, searchParams, onChange])

  // Listen for URL changes
  useEffect(() => {
    const viewParam = searchParams.get("view") as "grid" | "list"
    if (viewParam !== view && (viewParam || "grid" !== view)) {
      isUpdatingUrl.current = true
      setView(viewParam || "grid")
    }
  }, [searchParams, view])

  return (
    <ToggleGroup type="single" value={view} onValueChange={(value) => value && setView(value as "grid" | "list")}>
      <ToggleGroupItem value="grid" aria-label="Grid view" className="h-8 w-8 p-0">
        <Grid className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="list" aria-label="List view" className="h-8 w-8 p-0">
        <List className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
