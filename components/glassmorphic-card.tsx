"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface GlassmorphicCardProps {
  children: ReactNode
  className?: string
}

export function GlassmorphicCard({ children, className = "" }: GlassmorphicCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={`group ${className}`}
    >
      <div className="relative overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-6 transition-all duration-300 group-hover:border-purple-500/50 group-hover:bg-zinc-800/70">
        {/* Main glow effect - responds to group hover */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur opacity-25 group-hover:opacity-100 transition-all duration-1000 group-hover:duration-200 pointer-events-none"></div>

        {/* Secondary glow effect for more intensity */}
        <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-xl blur-xl opacity-0 group-hover:opacity-75 transition-all duration-1000 group-hover:duration-300 pointer-events-none"></div>

        {/* Subtle inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>

        {/* Content container */}
        <div className="relative z-10">{children}</div>

        {/* Hover indicator dot */}
        <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-zinc-600 opacity-0 group-hover:opacity-100 group-hover:bg-purple-400 transition-all duration-300 pointer-events-none"></div>
      </div>
    </motion.div>
  )
}
