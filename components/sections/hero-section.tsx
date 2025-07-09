"use client";

import { ArrowRight, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { motion, easeOut } from "framer-motion";

import GradientButton from "@/components/ui/gradient-button";
import { CreativeHero } from "@/components/creative-hero";
import { AnimatedSocialIcon } from "@/components/animated-social-icon";

export function HeroSection() {
  // Define specific animations for hero social icons
  const heroSocialIcons = [
    {
      icon: Github,
      href: "https://github.com/codex-mohan",
      label: "GitHub",
      animation: "rotate" as const,
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/codex-mohan/",
      label: "LinkedIn",
      animation: "flip" as const,
    },
    {
      icon: Twitter,
      href: "https://twitter.com",
      label: "Twitter",
      animation: "creative" as const,
    },
    {
      icon: Mail,
      href: "mailto:hello@example.com",
      label: "Email",
      animation: "rotate" as const,
    },
  ];

  const heroSocialVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 1.5,
      },
    },
  };

  const heroSocialItemVariants = {
    hidden: { opacity: 0, x: -30, scale: 0.8 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeOut, delay: 0.4 },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute top-60 right-1/3 w-48 h-48 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-1000"></div>
        <div className="absolute bottom-40 right-20 w-56 h-56 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-3000"></div>
      </div>

      {/* Main Content */}
      <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          {/* Top Header with Badge */}
          <div className=" z-20">
            <div className="flex justify-between">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: false }}
                className="flex-shrink-0"
              >
                <div className="relative px-3 py-1 text-sm font-medium rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                  <span className="relative z-10">
                    Full Stack & ML Developer
                  </span>
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-pulse"></span>
                </div>
              </motion.div>
            </div>
          </div>
          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tight"
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <span className="block">Hi, I'm</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Mohana Krishna
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-zinc-400 max-w-[600px]"
            variants={paragraphVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            I craft exceptional digital experiences with code, creativity, and a
            passion for innovation.
          </motion.p>
          <div className="flex flex-wrap gap-6 pt-4">
            <GradientButton
              fromColor="from-purple-500"
              toColor="to-pink-500"
              color="text-white"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Projects <ArrowRight className="ml-2 h-4 w-4" />
            </GradientButton>
            <motion.button
              className="border-zinc-700 text-zinc-300 hover:text-purple-400 hover:border-zinc-500 bg-transparent"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.button>
          </div>

          {/* Social Icons */}
          <motion.div
            className="pt-6"
            variants={heroSocialVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <motion.p
              className="text-sm text-zinc-500 mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              viewport={{ once: false }}
            >
              Connect with me
            </motion.p>
            <div className="flex gap-4">
              {heroSocialIcons.map((social, index) => (
                <motion.div
                  key={social.label}
                  variants={heroSocialItemVariants as any}
                  whileHover={{
                    y: -5,
                    transition: { type: "spring", stiffness: 400, damping: 20 },
                  }}
                  viewport={{ once: false }}
                >
                  <AnimatedSocialIcon
                    icon={social.icon}
                    href={social.href}
                    label={social.label}
                    animationType={social.animation}
                    size="md"
                    className="hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="flex justify-center">
          <CreativeHero />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center items-start p-1">
          <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
