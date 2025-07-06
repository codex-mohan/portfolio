"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface GradientButtonProps {
  children: React.ReactNode
  className?: string
  width?: number | "full" | "auto"
  height?: number | "auto"
  type?: "button" | "reset" | "submit"
  color?: string // Text color (Tailwind color class like 'text-white')
  fromColor: string // Full Tailwind class for 'from' (e.g., 'from-purple-600')
  viaColor?: string // Optional Tailwind class for 'via' (e.g., 'via-pink-600')
  toColor: string // Full Tailwind class for 'to' (e.g., 'to-pink-600')
  disabled?: boolean
  onClick?: () => void | Promise<void>
}

const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  className = "",
  height = "auto",
  width = "auto",
  color = "text-white",
  type = "button",
  fromColor,
  viaColor,
  toColor,
  disabled = false,
  onClick,
}) => {
  // Build gradient classes
  const gradientClass = viaColor
    ? `bg-gradient-to-r ${fromColor} ${viaColor} ${toColor}`
    : `bg-gradient-to-r ${fromColor} ${toColor}`

  // Build size classes
  const sizeClasses = cn(
    height === "auto" ? "" : typeof height === "number" ? `h-${height}` : "h-full",
    width === "auto" ? "" : typeof width === "number" ? `w-${width}` : width === "full" ? "w-full" : "",
  )

  return (
    <div className={cn("relative group/button", className)}>
      {/* Glow effect - only on direct button hover */}
      <div
        className={cn(
          "absolute -inset-2 rounded-lg opacity-0 transition-opacity duration-300 ease-in-out group-hover/button:opacity-75 blur-xl",
          gradientClass,
          disabled && "opacity-0",
        )}
      />

      {/* Button */}
      <button
        type={type}
        disabled={disabled}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg px-6 py-3 font-medium transition-all duration-300 ease-in-out text-center text-sm",
          "focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-transparent",
          "active:scale-95 active:shadow-inner",
          "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
          gradientClass,
          color,
          sizeClasses,
          disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg hover:scale-105",
          // Prevent group hover from affecting this button
          "group-hover:shadow-none group-hover:scale-100 hover:!shadow-lg hover:!scale-105",
        )}
        onClick={disabled ? undefined : onClick}
      >
        {children}
      </button>
    </div>
  )
}

export default GradientButton
