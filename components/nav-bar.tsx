"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const isMobile = useMobile()

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ]

  const handleNavClick = () => {
    if (isMobile) {
      setIsOpen(false)
    }
  }

  // Track scroll position for background blur effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = navItems.map((item) => item.href.substring(1))
      const scrollPosition = window.scrollY + 100

      if (window.scrollY < 100) {
        setActiveSection("")
        return
      }

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Close mobile menu when clicking outside or pressing escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      const nav = document.getElementById("nav-bar")
      if (nav && !nav.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.addEventListener("click", handleClickOutside)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isOpen])

  const isActive = (href: string) => {
    const sectionId = href.substring(1)
    return activeSection === sectionId
  }

  return (
    <>
      {/* Sticky Navigation Bar */}
      <motion.nav
        id="nav-bar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-zinc-900/95 backdrop-blur-md border-b border-zinc-800/50 shadow-lg" : "bg-transparent"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="relative py-4">
            {isMobile ? (
              <div className="flex items-center justify-between">
                {/* Left: Brand */}
                <Link href="/" className="font-bold text-lg flex-shrink-0">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    Shine
                  </span>
                  <span className="text-white">Dev</span>
                </Link>

                {/* Right: Menu button and indicator */}
                <div className="flex items-center gap-3">
                  {/* Active section indicator for mobile */}
                  {activeSection && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-600"
                    />
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-zinc-400 hover:text-white hover:bg-zinc-700/50 flex-shrink-0 h-8 w-8 p-0"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </motion.div>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                {/* Left: Brand */}
                <Link href="/" className="font-bold text-xl flex-shrink-0">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    Shine
                  </span>
                  <span className="text-white">Dev</span>
                </Link>

                {/* Center: Navigation Items */}
                <div className="flex items-center gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                        isActive(item.href)
                          ? "text-white bg-gradient-to-r from-purple-500/30 to-pink-500/30 shadow-lg"
                          : "text-zinc-400 hover:text-white hover:bg-zinc-700/30"
                      }`}
                      onClick={handleNavClick}
                    >
                      {/* Active section background glow */}
                      {isActive(item.href) && (
                        <motion.div
                          layoutId="activeSection"
                          className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full"
                          initial={false}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}

                      {/* Active section indicator dot */}
                      {isActive(item.href) && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-600 shadow-lg"
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        />
                      )}

                      <span className="relative z-10">{item.name}</span>
                    </Link>
                  ))}
                </div>

                {/* Right: Resume Button */}
                <div className="flex-shrink-0">
                  <motion.a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-2 px-6 py-2 text-sm font-medium text-zinc-300 border border-zinc-600 rounded-full transition-all duration-300 hover:text-white hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/25"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {/* Background glow on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      layoutId="resumeButtonGlow"
                    />

                    {/* Icon with animation */}
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      className="group-hover:text-purple-400 transition-colors duration-300"
                    >
                      <Download className="h-4 w-4" />
                    </motion.div>

                    {/* Text */}
                    <span className="relative z-10">Resume</span>

                    {/* Hover indicator */}
                    <motion.div
                      className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    />
                  </motion.a>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      {isMobile && (
        <>
          {/* Backdrop */}
          <motion.div
            className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-sm ${isOpen ? "block" : "hidden"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Mobile Menu */}
          <motion.div
            className={`fixed top-16 left-4 right-4 z-50 ${isOpen ? "block" : "hidden"}`}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{
              opacity: isOpen ? 1 : 0,
              y: isOpen ? 0 : -20,
              scale: isOpen ? 1 : 0.95,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="relative rounded-2xl bg-zinc-800/95 backdrop-blur-md border border-zinc-700/50 shadow-2xl overflow-hidden">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur opacity-50"></div>

              <div className="relative p-6">
                <div className="flex flex-col space-y-4">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className={`relative block px-4 py-3 text-lg font-medium transition-all duration-300 rounded-lg ${
                          isActive(item.href)
                            ? "text-white bg-gradient-to-r from-purple-500/30 to-pink-500/30 shadow-lg"
                            : "text-white hover:text-purple-400 hover:bg-zinc-700/30"
                        }`}
                        onClick={handleNavClick}
                      >
                        {/* Active section background for mobile */}
                        {isActive(item.href) && (
                          <motion.div
                            layoutId="activeSectionMobile"
                            className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg"
                            initial={false}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}

                        <div className="relative z-10 flex items-center justify-between">
                          <span>{item.name}</span>
                          {/* Active section indicator for mobile menu */}
                          {isActive(item.href) && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-600"
                            />
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  ))}

                  <motion.div
                    className="pt-4 border-t border-zinc-700/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <motion.a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex items-center justify-center gap-3 w-full px-6 py-3 text-base font-medium text-zinc-300 border border-zinc-600 rounded-lg transition-all duration-300 hover:text-white hover:border-purple-400 hover:bg-zinc-700/30"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Background glow on hover */}
                      <motion.div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Icon with animation */}
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        className="group-hover:text-purple-400 transition-colors duration-300"
                      >
                        <Download className="h-5 w-5" />
                      </motion.div>

                      {/* Text */}
                      <span className="relative z-10">Download Resume</span>
                    </motion.a>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </>
  )
}
