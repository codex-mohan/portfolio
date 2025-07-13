"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SectionHeading } from "@/components/section-heading";
import { GlassmorphicCard } from "@/components/glassmorphic-card";
import { ContactForm } from "@/components/contact-form";

export function ContactSection() {
  return (
    <section id="contact" className="py-32 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute top-10 right-1/4 w-42 h-42 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
        <div className="absolute bottom-20 left-1/4 w-34 h-34 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="container relative z-10">
        <SectionHeading title="Get In Touch" subtitle="Let's work together" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
          <GlassmorphicCard>
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 flex items-center justify-center">
                  <MdEmail className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-sm text-zinc-500">Email</div>
                  <div className="font-medium">codexmohan@gmail.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 flex items-center justify-center">
                  <FaLinkedin className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-sm text-zinc-500">LinkedIn</div>
                  <div className="font-medium">linkedin.com/in/codex-mohan</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 flex items-center justify-center">
                  <FaGithub className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-sm text-zinc-500">GitHub</div>
                  <div className="font-medium">github.com/codex-mohan</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-zinc-800">
              <h4 className="text-lg font-medium mb-4">Current Status</h4>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                <span>
                  Available for freelance work and full-time opportunities
                </span>
              </div>
            </div>
          </GlassmorphicCard>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
