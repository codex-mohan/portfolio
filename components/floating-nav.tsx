"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";
import GradientButton from "@/components/ui/gradient-button";

export function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const isMobile = useMobile();

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.substring(1)); // Remove # from href
      const scrollPosition = window.scrollY + 100; // Offset for better detection

      // Check if we're at the top of the page
      if (window.scrollY < 100) {
        setActiveSection("");
        return;
      }

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when clicking outside or pressing escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const nav = document.getElementById("floating-nav");
      if (nav && !nav.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    const sectionId = href.substring(1); // Remove # from href
    return activeSection === sectionId;
  };

  return (
    <>
      {/* Navigation spanning full width */}
      <motion.div
        id="floating-nav"
        className="fixed top-4 left-4 right-4 md:left-8 md:right-8 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
      >
        <div className="relative px-4 py-3 md:px-6 md:py-4 rounded-full bg-zinc-800/90 backdrop-blur-md border border-zinc-700/50 shadow-xl">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur opacity-50"></div>

          {isMobile ? (
            <div className="relative flex items-center justify-between">
              {/* Left: Brand */}
              <Link href="/" className="font-bold text-lg flex-shrink-0">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                  Codex
                </span>
                <span className="text-white">Mohan</span>
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
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isOpen ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <Menu className="h-5 w-5" />
                    )}
                  </motion.div>
                </Button>
              </div>
            </div>
          ) : (
            <div className="relative flex items-center justify-between">
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
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Active section indicator dot */}
                    {isActive(item.href) && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-600 shadow-lg"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 20,
                        }}
                      />
                    )}

                    <span className="relative z-10">{item.name}</span>
                  </Link>
                ))}
              </div>

              {/* Right: Resume Button */}
              <div className="flex-shrink-0">
                <GradientButton
                  fromColor="from-purple-500"
                  toColor="to-pink-500"
                  color="text-white"
                  width="auto"
                  height="auto"
                  className="text-xs font-medium"
                >
                  Resume
                </GradientButton>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Mobile menu overlay */}
      {isMobile && (
        <>
          {/* Backdrop */}
          <motion.div
            className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-sm ${
              isOpen ? "block" : "hidden"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Mobile Menu */}
          <motion.div
            className={`fixed top-20 left-4 right-4 z-50 ${
              isOpen ? "block" : "hidden"
            }`}
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
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            }}
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
                    <GradientButton
                      fromColor="from-purple-500"
                      toColor="to-pink-500"
                      color="text-white"
                      width="full"
                      height="auto"
                      className="justify-center text-base font-medium py-3"
                    >
                      Resume
                    </GradientButton>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
}
