'use client';

import { motion } from 'framer-motion';

const skills = [
  { name: 'Frontend Development', progress: 95 },
  { name: 'Backend Development', progress: 90 },
  { name: 'UI/UX Design', progress: 85 },
  { name: 'Mobile Development', progress: 80 },
  { name: 'DevOps', progress: 75 },
];

export function Skills() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="grid gap-6">
        {skills.map((skill, index) => (
          <div key={skill.name} className="relative">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-300">{skill.name}</span>
              <span className="text-sm font-medium text-gray-400">{skill.progress}%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-violet-500 to-cyan-500"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.2 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
