"use client"

import { SectionHeading } from "@/components/section-heading"
import { Timeline } from "@/components/timeline"

export function ExperienceSection() {
  return (
    <section id="experience" className="py-32 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute top-20 left-20 w-38 h-38 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
        <div className="absolute bottom-1/3 right-20 w-46 h-46 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="container relative z-10">
        <SectionHeading title="Work Experience" subtitle="My professional journey" />

        <div className="mt-16">
          <Timeline />
        </div>
      </div>
    </section>
  )
}
