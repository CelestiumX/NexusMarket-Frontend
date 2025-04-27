"use client"

import { useState, useEffect, useRef } from "react"
import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"

interface LazyImageProps extends Omit<ImageProps, "onLoad"> {
  fallbackSrc?: string
  loadingClassName?: string
}

export function LazyImage({
  src,
  alt,
  fallbackSrc = "/abstract-geometric-shapes.png",
  className,
  loadingClassName,
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [imgSrc, setImgSrc] = useState(fallbackSrc)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true)
              setImgSrc(src as string)
              observer.unobserve(entry.target)
            }
          })
        },
        {
          rootMargin: "200px", // Load images 200px before they come into view
          threshold: 0.01,
        },
      )

      if (imgRef.current) {
        observer.observe(imgRef.current)
      }

      return () => {
        if (imgRef.current) {
          observer.unobserve(imgRef.current)
        }
      }
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      setIsInView(true)
      setImgSrc(src as string)
    }
  }, [src])

  const handleImageLoad = () => {
    setIsLoaded(true)
  }

  const handleImageError = () => {
    setImgSrc(fallbackSrc)
    setIsLoaded(true)
  }

  return (
    <div ref={imgRef} className={cn("relative overflow-hidden", className)}>
      {isInView && (
        <Image
          src={imgSrc || "/placeholder.svg?height=300&width=300&query=Image"}
          alt={alt}
          className={cn("transition-opacity duration-300", isLoaded ? "opacity-100" : "opacity-0", loadingClassName)}
          onLoadingComplete={handleImageLoad}
          onError={handleImageError}
          {...props}
        />
      )}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#080E21]/60 animate-pulse">
          <span className="sr-only">Loading image...</span>
        </div>
      )}
    </div>
  )
}
