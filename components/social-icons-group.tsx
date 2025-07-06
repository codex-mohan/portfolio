"use client"

import { Github, Linkedin, Twitter, Mail, MessageCircle, Tag, Phone } from "lucide-react"
import { AnimatedSocialIcon } from "./animated-social-icon"
import { motion } from "framer-motion"

interface SocialIconsGroupProps {
  animationType?: "flip" | "rotate" | "creative"
  size?: "sm" | "md" | "lg"
  layout?: "horizontal" | "vertical"
  showAll?: boolean
  className?: string
}

export function SocialIconsGroup({
  animationType = "flip",
  size = "md",
  layout = "horizontal",
  showAll = false,
  className = "",
}: SocialIconsGroupProps) {
  const mainSocialIcons = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/shinekyawkyawaung/", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
  ]

  const additionalIcons = [
    { icon: MessageCircle, href: "mailto:hello@example.com", label: "Email" },
    { icon: Tag, href: "#contact", label: "Contact" },
    { icon: Phone, href: "tel:+1234567890", label: "Phone" },
  ]

  const iconsToShow = showAll ? [...mainSocialIcons, ...additionalIcons] : mainSocialIcons

  const layoutClasses = layout === "horizontal" ? "flex gap-4" : "flex flex-col gap-4"

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  }

  return (
    <motion.div
      className={`${layoutClasses} ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {iconsToShow.map((social, index) => (
        <motion.div key={social.label} variants={itemVariants}>
          <AnimatedSocialIcon
            icon={social.icon}
            href={social.href}
            label={social.label}
            animationType={animationType}
            size={size}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}
