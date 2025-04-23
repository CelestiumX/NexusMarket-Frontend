"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, FileText, ImageIcon, File } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "../../components/ui/button"

interface FileUploadProps {
  accept?: string
  maxSize?: number // in MB
  multiple?: boolean
  onFilesSelected: (files: File[]) => void
  className?: string
  variant?: "default" | "compact"
}

export function FileUpload({
  accept = "*/*",
  maxSize = 5, // 5MB default
  multiple = false,
  onFilesSelected,
  className,
  variant = "default",
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const validateFiles = (files: File[]) => {
    // Check file size
    const oversizedFiles = files.filter((file) => file.size > maxSize * 1024 * 1024)
    if (oversizedFiles.length > 0) {
      setError(`File(s) too large. Maximum size is ${maxSize}MB.`)
      return false
    }

    // If accept is specified, check file types
    if (accept !== "*/*") {
      const acceptedTypes = accept.split(",").map((type) => type.trim())
      const invalidFiles = files.filter((file) => {
        return !acceptedTypes.some((type) => {
          if (type.startsWith(".")) {
            // Check file extension
            return file.name.endsWith(type)
          } else if (type.includes("*")) {
            // Check MIME type with wildcard
            const [mainType, subType] = type.split("/")
            const [fileMainType, fileSubType] = file.type.split("/")
            return mainType === fileMainType && (subType === "*" || subType === fileSubType)
          } else {
            // Check exact MIME type
            return file.type === type
          }
        })
      })

      if (invalidFiles.length > 0) {
        setError(`Invalid file type(s). Accepted: ${accept}`)
        return false
      }
    }

    setError(null)
    return true
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files)
      const filesToAdd = multiple ? droppedFiles : [droppedFiles[0]]

      if (validateFiles(filesToAdd)) {
        setSelectedFiles((prev) => (multiple ? [...prev, ...filesToAdd] : filesToAdd))
        onFilesSelected(multiple ? [...selectedFiles, ...filesToAdd] : filesToAdd)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files)
      const filesToAdd = multiple ? selectedFiles : [selectedFiles[0]]

      if (validateFiles(filesToAdd)) {
        setSelectedFiles((prev) => (multiple ? [...prev, ...filesToAdd] : filesToAdd))
        onFilesSelected(multiple ? [...selectedFiles, ...filesToAdd] : filesToAdd)
      }
    }
  }

  const handleButtonClick = () => {
    inputRef.current?.click()
  }

  const removeFile = (index: number) => {
    const newFiles = [...selectedFiles]
    newFiles.splice(index, 1)
    setSelectedFiles(newFiles)
    onFilesSelected(newFiles)
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="h-5 w-5 text-[#00C2FF]" />
    } else if (file.type.includes("pdf")) {
      return <FileText className="h-5 w-5 text-[#FF41B4]" />
    } else {
      return <File className="h-5 w-5 text-[#9D4EDD]" />
    }
  }

  return (
    <div className={cn("w-full", className)}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
      />

      {variant === "default" && (
        <div
          className={cn(
            "flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border/40 bg-background/80 p-6 backdrop-blur transition-colors supports-[backdrop-filter]:bg-background/60",
            dragActive && "border-[#0075FF] bg-[#0075FF]/5",
            "hover:border-[#0075FF] hover:bg-[#0075FF]/5",
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0075FF]/10">
            <Upload className="h-6 w-6 text-[#00C2FF]" />
          </div>
          <p className="mb-2 text-sm font-medium">Drag and drop your files here</p>
          <p className="mb-4 text-xs text-muted-foreground">
            or <span className="text-[#00C2FF]">browse</span> to upload
          </p>
          <Button
            type="button"
            onClick={handleButtonClick}
            className="bg-gradient-to-r from-[#0075FF] to-[#00C2FF] text-white hover:from-[#0075FF]/90 hover:to-[#00C2FF]/90"
          >
            Select Files
          </Button>
          {accept !== "*/*" && <p className="mt-2 text-xs text-muted-foreground">Accepted formats: {accept}</p>}
          <p className="mt-1 text-xs text-muted-foreground">Max size: {maxSize}MB</p>
        </div>
      )}

      {variant === "compact" && (
        <Button
          type="button"
          variant="outline"
          onClick={handleButtonClick}
          className="w-full border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload Files
        </Button>
      )}

      {error && <p className="mt-2 text-sm text-[#FF3B30]">{error}</p>}

      {selectedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium">Selected files:</p>
          <ul className="space-y-2">
            {selectedFiles.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center justify-between rounded-md border border-border/40 bg-background/80 p-2 backdrop-blur supports-[backdrop-filter]:bg-background/60"
              >
                <div className="flex items-center gap-2">
                  {getFileIcon(file)}
                  <div className="overflow-hidden">
                    <p className="truncate text-sm">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(index)}
                  className="h-8 w-8 text-muted-foreground hover:text-[#FF3B30]"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove file</span>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
