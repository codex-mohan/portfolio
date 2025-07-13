"use client";
import { motion } from "framer-motion";
import {
  SiAmazonwebservices,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiHtml5,
  SiTailwindcss,
  SiGraphql,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiPytorch,
  SiTensorflow,
  SiNumpy,
  SiPandas,
} from "react-icons/si";

interface SkillBadgeProps {
  name: string;
  level: number;
}

const skillIcons: Record<string, any> = {
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
  "HTML/CSS": SiHtml5,
  "Tailwind CSS": SiTailwindcss,
  GraphQL: SiGraphql,
  PostgreSQL: SiPostgresql,
  AWS: SiAmazonwebservices,
  Docker: SiDocker,
  Git: SiGit,
  PyTorch: SiPytorch,
  TensorFlow: SiTensorflow,
  NumPy: SiNumpy,
  Pandas: SiPandas,
};

export function SkillBadge({ name, level }: SkillBadgeProps) {
  const IconComponent = skillIcons[name];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: false }}
      whileHover={{ y: -5 }}
    >
      <div className="relative overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-6 h-full transition-all duration-300 hover:border-purple-500/50 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

        <div className="relative">
          <div className="flex items-center justify-center mb-4">
            {IconComponent && (
              <div className="w-16 h-16 rounded-full bg-zinc-900/50 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                <IconComponent className="h-8 w-8 text-purple-400 group-hover:text-pink-400 transition-colors duration-300" />
              </div>
            )}
          </div>
          <div className="text-center mb-4 font-medium text-lg">{name}</div>

          <div className="relative h-2.5 w-full bg-zinc-700 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: `${level}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            />
          </div>

          <div className="mt-2 text-right text-sm text-zinc-400">{level}%</div>
        </div>
      </div>
    </motion.div>
  );
}
