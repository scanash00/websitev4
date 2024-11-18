'use client';

import { Background } from '@/components/background';
import { Nav } from '@/components/nav';
import { SocialLinks } from '@/components/social-links';
import { motion, useInView } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';
import { useRef } from 'react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

export default function Home() {
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const projectsInView = useInView(projectsRef, { once: true, margin: "-100px" });
  const contactInView = useInView(contactRef, { once: true, margin: "-100px" });

  return (
    <main className="relative min-h-screen">
      <Background />
      <Nav />
      
      <div className="relative">
        {/* Hero Section */}
        <section id="top" className="flex min-h-screen w-full flex-col items-center justify-center px-4 sm:px-6 relative overflow-hidden">
          {/* Enhanced gradient background with animated layers */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-violet-950/5 to-black" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(192,132,252,0.1),transparent_50%)]" />
          </div>
          
          {/* Animated particles with glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 pointer-events-none overflow-hidden"
          >
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full particle"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  background: `radial-gradient(circle at center, ${
                    i % 3 === 0 ? 'rgba(124,58,237,0.15)' :
                    i % 3 === 1 ? 'rgba(192,132,252,0.15)' :
                    'rgba(99,102,241,0.15)'
                  }, transparent)`,
                  width: `${Math.random() * 100 + 50}px`,
                  height: `${Math.random() * 100 + 50}px`,
                  scale: Math.random() * 0.5 + 0.5,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </motion.div>

          {/* Main content with parallax and advanced animations */}
          <motion.div 
            className="relative z-10 flex flex-col items-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative mb-6"
            >
              <div className="absolute -inset-x-20 -inset-y-16 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-cyan-500/20 blur-3xl rounded-full" />
              <div className="absolute -inset-x-20 -inset-y-16 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10 blur-2xl rounded-full animate-pulse" />
              
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight mb-4 relative text-center sm:text-left"
              >
                <Link href="/" className="inline-block animate-gradient bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 bg-[200%_auto] bg-clip-text text-transparent [text-shadow:_0_4px_20px_rgb(124_58_237_/_20%)] hover:scale-[1.02] transition-transform">
                  Scan
                </Link>
              </motion.h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-x-32 -inset-y-6 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10 blur-2xl rounded-full" />
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium bg-gradient-to-b from-white via-white/90 to-violet-200 bg-clip-text text-transparent mb-12 sm:mb-16 relative text-center sm:text-left">
                Full Stack Developer
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col items-center gap-4 relative"
            >
              <Link
                href="#projects"
                className="group relative inline-flex items-center gap-2 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 hover:scale-[1.02] transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 rounded-full opacity-100 group-hover:opacity-90 blur-md transition-all duration-500 group-hover:blur-lg animate-gradient bg-[length:200%_auto]" />
                <div className="absolute inset-0.5 bg-black rounded-full" />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
                <span className="relative text-sm sm:text-base md:text-lg font-medium text-white flex items-center gap-2">
                  View Projects
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                  >
                    →
                  </motion.span>
                </span>
              </Link>

              {/* Enhanced scroll indicator */}
              <div className="mt-12 sm:mt-16 flex flex-col items-center gap-3 fade-in" style={{ animationDelay: '0.8s' }}>
                <div 
                  className="w-4 sm:w-5 md:w-6 h-7 sm:h-8 md:h-10 border-2 border-white/30 rounded-full p-1 relative overflow-hidden backdrop-blur-sm bg-white/5 flex items-center justify-center hover-scale"
                >
                  <div 
                    className="w-1.5 sm:w-2 md:w-2.5 h-1.5 sm:h-2 md:h-2.5 bg-gradient-to-b from-violet-500 to-fuchsia-500 rounded-full scroll-indicator"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-pulse" />
                </div>
                <span 
                  className="text-[10px] sm:text-xs md:text-sm font-medium text-white/70 tracking-wider uppercase"
                  style={{ animation: 'fadeIn 2s ease-in-out infinite alternate' }}
                >
                  scroll to explore
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Social Links with enhanced positioning */}
          <div className="hidden sm:block absolute left-8 top-1/2 -translate-y-1/2">
            <SocialLinks />
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-4 md:px-6" ref={projectsRef}>
          <motion.div 
            className="max-w-7xl mx-auto"
            initial={{ opacity: 0 }}
            animate={projectsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div 
              className="space-y-12"
              initial={{ opacity: 0, y: 40 }}
              animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ 
                duration: 0.6,
                delay: 0.2,
                ease: [0.21, 0.47, 0.32, 0.98]
              }}
            >
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent [text-shadow:_0_2px_10px_rgb(124_58_237_/_20%)]">
                  Featured Projects
                </h2>
                <p className="text-white/80 max-w-2xl">
                  Here are some of my recent projects that showcase my skills and experience.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Project Name",
                    description: "A sophisticated web application built with modern technologies and beautiful animations.",
                    image: "/project1.jpg",
                    tech: ['Next.js', 'React', 'Tailwind'],
                    link: "#"
                  },
                  {
                    title: "Another Project",
                    description: "An innovative solution leveraging cutting-edge tech stack for optimal performance.",
                    image: "/project2.jpg",
                    tech: ['TypeScript', 'Node.js', 'MongoDB'],
                    link: "#"
                  },
                  {
                    title: "Featured Work",
                    description: "A high-performance application with beautiful design and smooth interactions.",
                    image: "/project3.jpg",
                    tech: ['React', 'Firebase', 'Framer'],
                    link: "#"
                  }
                ].map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={projectsInView ? { 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        duration: 0.5,
                        delay: index * 0.1 + 0.3,
                        ease: [0.21, 0.47, 0.32, 0.98]
                      }
                    } : {
                      opacity: 0,
                      y: 20
                    }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10 border border-white/5"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-fuchsia-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative p-6 backdrop-blur-sm">
                      <div className="space-y-4">
                        <div className="h-48 bg-gradient-to-br from-violet-500/40 via-fuchsia-500/40 to-cyan-500/40 rounded-lg overflow-hidden group-hover:shadow-lg group-hover:shadow-violet-500/10 transition-shadow duration-500">
                          {/* Project preview/image would go here */}
                          <div className="w-full h-full flex items-center justify-center text-white/60">
                            Preview
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent group-hover:from-violet-500 group-hover:to-cyan-500 transition-all duration-300">
                          {project.title}
                        </h3>
                        <p className="text-white/60 line-clamp-2 group-hover:text-white/80 transition-colors duration-300">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="text-sm px-3 py-1 rounded-full bg-white/10 text-white/80 backdrop-blur-sm group-hover:bg-white/20 transition-colors duration-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <motion.div 
                          className="pt-4"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        >
                          <Link 
                            href={project.link}
                            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors group/link"
                          >
                            View Project
                            <FiArrowRight className="group-hover/link:translate-x-1 transition-transform" />
                          </Link>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full px-4 py-20 bg-gradient-to-b from-transparent via-violet-950/5 to-transparent" ref={contactRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent mb-4 md:mb-8 [text-shadow:_0_2px_10px_rgb(124_58_237_/_20%)]">
              Let's Connect
            </h2>
            <p className="text-white/80 text-base md:text-lg mb-8 md:mb-12 leading-relaxed">
              Feel free to reach out through any of these platforms. I'm always interested in new opportunities and collaborations.
            </p>
            <div className="flex justify-center gap-4 md:gap-8 mb-8 md:mb-12">
              <SocialLinks horizontal isContact />
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
