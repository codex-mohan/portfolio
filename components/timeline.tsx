"use client"

import { motion, useInView } from "framer-motion"
import { Calendar, MapPin, Briefcase, Building2, Code, Laptop, Zap, ChevronDown } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { useRef } from "react"

const experiences = [
  {
    title: "Senior Frontend Engineer",
    company: "Tech Innovations Inc.",
    period: "2021 - Present",
    location: "San Francisco, CA",
    type: "Full-time",
    description:
      "Lead the frontend development team in building a SaaS platform. Implemented new features, improved performance, and mentored junior developers.",
    skills: ["React", "TypeScript", "Next.js"],
    icon: Building2,
  },
  {
    title: "Frontend Developer",
    company: "Digital Solutions Co.",
    period: "2019 - 2021",
    location: "New York, NY",
    type: "Full-time",
    description:
      "Developed responsive web applications using React and TypeScript. Collaborated with designers and backend engineers to deliver high-quality products.",
    skills: ["JavaScript", "React", "Node.js"],
    icon: Code,
  },
  {
    title: "Web Developer",
    company: "Creative Agency",
    period: "2017 - 2019",
    location: "Los Angeles, CA",
    type: "Full-time",
    description:
      "Built websites and web applications for various clients. Worked with HTML, CSS, JavaScript, and WordPress.",
    skills: ["HTML/CSS", "JavaScript", "WordPress"],
    icon: Laptop,
  },
  {
    title: "Junior Developer",
    company: "Startup Hub",
    period: "2016 - 2017",
    location: "Austin, TX",
    type: "Internship",
    description:
      "Assisted in developing web applications and learned modern web development practices. Gained experience in agile development methodologies.",
    skills: ["JavaScript", "Python", "Git"],
    icon: Zap,
  },
]

export function Timeline() {
  const isMobile = useMobile()

  return (
    <div
      className={`space-y-8 md:space-y-12 relative ${
        !isMobile
          ? "before:absolute before:inset-0 before:left-1/2 before:ml-0 before:-translate-x-px before:border-l-2 before:border-zinc-700 before:h-full before:z-0"
          : "before:absolute before:inset-0 before:left-6 before:border-l-2 before:border-zinc-700 before:h-full before:z-0"
      }`}
    >
      {experiences.map((experience, index) => (
        <div key={index}>
          <div
            className={`relative z-10 flex items-center ${
              !isMobile && index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
            }`}
          >
            <motion.div
              className={`w-full ${!isMobile ? `md:w-1/2 ${index % 2 === 0 ? "md:pl-10" : "md:pr-10"}` : "pl-16"}`}
              initial={{ opacity: 0, x: !isMobile ? (index % 2 === 0 ? 50 : -50) : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 p-6 transition-all duration-300 hover:border-purple-500/30 group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-2xl blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

                <div className="relative flex items-start gap-4">
                  {/* Glassmorphic Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-zinc-800/30 backdrop-blur-sm border border-zinc-700/50 flex items-center justify-center">
                      <experience.icon className="h-6 w-6 text-zinc-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-white mb-1">{experience.title}</h3>
                    <div className="text-purple-400 font-medium mb-3">{experience.company}</div>

                    {/* Meta Information */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <Calendar className="h-4 w-4" />
                        <span>{experience.period}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <MapPin className="h-4 w-4" />
                        <span>{experience.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <Briefcase className="h-4 w-4" />
                        <span>{experience.type}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-zinc-300 text-sm mb-4 leading-relaxed">{experience.description}</p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {experience.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 text-sm rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-300 border border-purple-500/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Timeline Dot - Desktop */}
            {!isMobile && (
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                <motion.div
                  className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 z-10 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </motion.div>
              </div>
            )}

            {/* Timeline Dot - Mobile */}
            {isMobile && (
              <div className="absolute left-6 -translate-x-1/2 flex items-center justify-center">
                <motion.div
                  className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 z-10 flex items-center justify-center shadow-lg"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                  viewport={{ once: true }}
                >
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </motion.div>
              </div>
            )}

            {/* Mobile Arrow Connector */}
            {isMobile && (
              <motion.div
                className="absolute left-12 top-1/2 -translate-y-1/2 z-10"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  <div className="w-0 h-0 border-l-4 border-l-purple-500 border-t-2 border-t-transparent border-b-2 border-b-transparent ml-1"></div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Mobile Progress Arrow - Between Items */}
          {isMobile && index < experiences.length - 1 && (
            <motion.div
              className="flex justify-center my-6"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
              viewport={{ once: true }}
            >
              <TimelineProgressArrow index={index} />
            </motion.div>
          )}
        </div>
      ))}
    </div>
  )
}

function TimelineProgressArrow({ index }: { index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="w-8 h-8 rounded-full bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 flex items-center justify-center"
      animate={isInView ? {
        y: [0, 5, 0],
        scale: [1, 1.1, 1],
      } : {}}
      transition={{
        duration: 2,
        repeat: isInView ? Number.POSITIVE_INFINITY : 0,
        ease: "easeInOut",
      }}
    >
      <ChevronDown className="h-4 w-4 text-purple-400" />
    </motion.div>
  );
}
