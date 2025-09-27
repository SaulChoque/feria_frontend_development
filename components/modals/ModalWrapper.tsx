"use client"

import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface ModalWrapperProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  isDarkMode: boolean
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  children: ReactNode
}

const sizeMap: Record<NonNullable<ModalWrapperProps["size"]>, string> = {
  sm: "max-w-[min(100vw-2rem,28rem)] sm:max-w-md",
  md: "max-w-[min(100vw-2rem,36rem)] sm:max-w-xl",
  lg: "max-w-[min(100vw-2rem,48rem)] sm:max-w-3xl",
  xl: "max-w-[min(100vw-2rem,60rem)] sm:max-w-5xl",
}

export function ModalWrapper({
  open,
  onOpenChange,
  isDarkMode,
  size = "lg",
  className,
  children,
}: ModalWrapperProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md" />
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
          <DialogPrimitive.Content
            className={cn(
              "relative w-full rounded-3xl border-2 shadow-2xl focus:outline-none p-5 sm:p-8 overflow-y-auto max-h-[calc(100vh-2rem)] sm:max-h-[90vh]",
              sizeMap[size],
              isDarkMode
                ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 text-white border-slate-700/80"
                : "bg-gradient-to-br from-white via-blue-50 to-cyan-50 text-slate-900 border-blue-200/70",
              className,
            )}
          >
            <DialogPrimitive.Close
              className={cn(
                "absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full transition-colors",
                isDarkMode
                  ? "bg-white/5 text-white hover:bg-white/10"
                  : "bg-blue-100 text-blue-600 hover:bg-blue-200",
              )}
            >
              <X className="h-5 w-5" />
            </DialogPrimitive.Close>
            {children}
          </DialogPrimitive.Content>
        </div>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
