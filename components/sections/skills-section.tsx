"use client"

import { SectionHeading } from "@/components/section-heading"
import { SkillBadge } from "@/components/skill-badge"

const skills = [
  { name: "JavaScript", level: 90 },
  { name: "TypeScript", level: 85 },
  { name: "React", level: 95 },
  { name: "Next.js", level: 90 },
  { name: "Node.js", level: 80 },
  { name: "HTML/CSS", level: 95 },
  { name: "Tailwind CSS", level: 90 },
  { name: "GraphQL", level: 75 },
  { name: "PostgreSQL", level: 70 },
  { name: "AWS", level: 65 },
  { name: "Docker", level: 60 },
  { name: "Git", level: 85 },
]

export function SkillsSection() {
  return (
    <section id="skills" className="py-32 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute top-10 right-10 w-36 h-36 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
        <div className="absolute bottom-1/2 left-10 w-28 h-28 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="container relative z-10">
        <SectionHeading title="My Skills" subtitle="Technologies I work with" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-16">
          {skills.map((skill, index) => (
            <SkillBadge key={skill.name} name={skill.name} level={skill.level} />
          ))}
        </div>
      </div>
    </section>
  )
}
