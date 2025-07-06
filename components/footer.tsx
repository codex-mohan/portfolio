"use client"

import Link from "next/link"
import { Github, Linkedin, Twitter, Mail, MessageCircle, Tag, Phone, ArrowUp } from "lucide-react"
import { AnimatedSocialIcon } from "./animated-social-icon"
import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"

export function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

  // Define specific animations for each social icon based on their purpose
  const socialIcons = [
    {
      icon: Github,
      href: "https://github.com",
      label: "GitHub",
      animation: "flip" as const, // Code flipping like pages
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/shinekyawkyawaung/",
      label: "LinkedIn",
      animation: "rotate" as const, // Professional spinning motion
    },
    {
      icon: Twitter,
      href: "https://twitter.com",
      label: "Twitter",
      animation: "creative" as const, // Dynamic like tweets
    },
    {
      icon: Mail,
      href: "mailto:hello@example.com",
      label: "Email",
      animation: "flip" as const, // Envelope flipping
    },
    {
      icon: MessageCircle,
      href: "mailto:hello@example.com",
      label: "Message",
      animation: "creative" as const, // Bouncy like chat bubbles
    },
    {
      icon: Tag,
      href: "#contact",
      label: "Contact",
      animation: "rotate" as const, // Tag spinning
    },
    {
      icon: Phone,
      href: "tel:+1234567890",
      label: "Phone",
      animation: "flip" as const, // Phone flipping
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Slightly longer stagger for more dramatic effect
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.7 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        duration: 0.6,
      },
    },
  }

  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current) return

      const footerRect = footerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Show button when footer starts to come into view
      const footerInView = footerRect.top <= windowHeight * 0.8

      setShowBackToTop(footerInView)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial state

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer ref={footerRef} className="relative py-16 overflow-hidden">
      <div className="container relative z-10">
        <div className="flex flex-col items-center space-y-8">
          {/* Diversified Social Icons */}
          <motion.div
            className="flex gap-4 items-center flex-wrap justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {socialIcons.map((social, index) => (
              <motion.div
                key={social.label}
                variants={itemVariants}
                whileHover={{ y: -8 }} // Additional hover lift effect
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <AnimatedSocialIcon
                  icon={social.icon}
                  href={social.href}
                  label={social.label}
                  animationType={social.animation}
                  size="md"
                  className="hover:shadow-lg hover:shadow-purple-500/25 transition-shadow duration-300"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.p
            className="text-zinc-500 text-sm text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            © {new Date().getFullYear()} Shine Kyaw Kyaw Aung. All rights reserved.
          </motion.p>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <Link
              href="mailto:hello@example.com"
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 hover:from-pink-400 hover:to-purple-600 transition-all duration-300 font-medium hover:scale-105 inline-block"
            >
              hello@shinekyawkyawaung.com
            </Link>
          </motion.div>

          {/* Return to Top Button - Icon Only, Emerges from Bottom */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{
              opacity: showBackToTop ? 1 : 0,
              y: showBackToTop ? 0 : 50,
              scale: showBackToTop ? 1 : 0.8,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              duration: 0.8,
            }}
          >
            <motion.button
              onClick={scrollToTop}
              className="group/top-btn relative w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/50 shadow-lg"
              whileHover={{
                y: -5,
                scale: 1.1,
                boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Back to top"
              initial={{ rotate: 0 }}
              animate={{
                rotate: showBackToTop ? [0, 5, -5, 0] : 0,
              }}
              transition={{
                rotate: {
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
              }}
            >
              {/* Outer glow ring */}
              <div className="absolute -inset-3 rounded-full opacity-0 transition-all duration-500 ease-in-out group-hover/top-btn:opacity-60 blur-xl bg-gradient-to-r from-purple-500 to-pink-500" />

              {/* Inner glow */}
              <div className="absolute -inset-1 rounded-full opacity-30 transition-all duration-300 ease-in-out group-hover/top-btn:opacity-80 blur-md bg-gradient-to-r from-purple-400 to-pink-400" />

              {/* Icon with floating animation */}
              <motion.div
                animate={{
                  y: showBackToTop ? [0, -3, 0] : 0,
                }}
                transition={{
                  duration: 2.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="relative z-10"
              >
                <ArrowUp className="h-6 w-6 text-white drop-shadow-lg" />
              </motion.div>

              {/* Pulse ring effect */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white/30"
                animate={{
                  scale: showBackToTop ? [1, 1.2, 1] : 1,
                  opacity: showBackToTop ? [0.5, 0, 0.5] : 0,
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </motion.button>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute bottom-4 right-8"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, duration: 0.4 }}
        >
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-60 animate-pulse"></div>
        </motion.div>

        {/* Additional decorative element */}
        <motion.div
          className="absolute top-4 left-8"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.4 }}
        >
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-40 animate-pulse"></div>
        </motion.div>
      </div>
    </footer>
  )
}
