"use client"

import { SectionHeading } from "@/components/section-heading"
import { ProjectCard } from "@/components/project-card"

const projects = [
  {
    title: "E-commerce Platform",
    description: "A full-stack e-commerce platform built with Next.js, Stripe, and Prisma.",
    tags: ["Next.js", "TypeScript", "Prisma", "Stripe"],
    image: "/placeholder.svg?height=400&width=600",
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates.",
    tags: ["React", "Firebase", "Tailwind CSS", "Redux"],
    image: "/placeholder.svg?height=400&width=600",
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
  },
  {
    title: "AI Content Generator",
    description: "An AI-powered content generation tool using OpenAI's GPT models.",
    tags: ["Next.js", "OpenAI API", "Node.js", "MongoDB"],
    image: "/placeholder.svg?height=400&width=600",
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
  },
  {
    title: "Fitness Tracker",
    description: "A mobile-first fitness tracking application with data visualization.",
    tags: ["React Native", "TypeScript", "D3.js", "Firebase"],
    image: "/placeholder.svg?height=400&width=600",
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
  },
  {
    title: "Weather Dashboard",
    description: "A beautiful weather dashboard with forecasts and historical data.",
    tags: ["React", "Weather API", "Chart.js", "Styled Components"],
    image: "/placeholder.svg?height=400&width=600",
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
  },
  {
    title: "Portfolio Website",
    description: "This portfolio website built with Next.js and Tailwind CSS.",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    image: "/placeholder.svg?height=400&width=600",
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="py-32 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute top-1/2 right-1/3 w-44 h-44 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
        <div className="absolute bottom-10 left-10 w-52 h-52 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="container relative z-10">
        <SectionHeading title="Featured Projects" subtitle="Some of my recent work" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              tags={project.tags}
              image={project.image}
              demoUrl={project.demoUrl}
              repoUrl={project.repoUrl}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
