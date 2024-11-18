'use client';

import { Background } from '@/components/background';
import { Nav } from '@/components/nav';
import { SocialLinks } from '@/components/social-links';
import { DiscordStatus } from '@/components/discord-status';
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
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
};

export default function Home() {
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const projectsInView = useInView(projectsRef, { once: true, margin: '-100px' });
  const contactInView = useInView(contactRef, { once: true, margin: '-100px' });

  return (
    <main className="relative min-h-screen">
      <Background />
      <Nav />

      <div className="relative">
        {/* Hero Section */}
        <section
          id="top"
          className="flex min-h-screen w-full flex-col items-center justify-center px-4 sm:px-6 relative overflow-hidden"
        >
          {/* Simplified gradient background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-violet-950/5 to-black" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.1),transparent_50%)]" />
          </div>

          {/* Reduced number of particles and optimized animations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 pointer-events-none overflow-hidden"
          >
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full particle will-change-transform"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  background: `radial-gradient(circle at center, ${
                    i % 2 === 0 ? 'rgba(124,58,237,0.1)' : 'rgba(192,132,252,0.1)'
                  }, transparent)`,
                  width: `${Math.random() * 60 + 30}px`,
                  height: `${Math.random() * 60 + 30}px`,
                  scale: Math.random() * 0.3 + 0.3,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            ))}
          </motion.div>

          {/* Main content with optimized animations */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative mb-6"
            >
              <div className="absolute -inset-x-20 -inset-y-16 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10 blur-2xl rounded-full" />
              <div className="absolute -inset-x-20 -inset-y-16 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10 blur-2xl rounded-full animate-pulse" />

              <motion.h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight mb-4 relative text-center">
                <Link
                  href="/"
                  className="inline-block animate-gradient bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 bg-[200%_auto] bg-clip-text text-transparent [text-shadow:_0_4px_20px_rgb(124_58_237_/_20%)] hover:scale-[1.02] transition-transform"
                >
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
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium bg-gradient-to-b from-white via-white/90 to-violet-200 bg-clip-text text-transparent mb-12 sm:mb-16 relative text-center">
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
                className="group relative inline-flex items-center gap-2 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 hover:scale-[1.02] transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 rounded-full opacity-100 group-hover:opacity-90 blur-md transition-all duration-500 group-hover:blur-lg animate-gradient bg-[length:200%_auto]" />
                <div className="absolute inset-0.5 bg-black rounded-full" />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
                <span className="relative text-sm sm:text-base md:text-lg font-medium text-white flex items-center gap-2 whitespace-nowrap">
                  View Projects
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    →
                  </motion.span>
                </span>
              </Link>

              {/* Enhanced scroll indicator */}
              <div
                className="mt-12 sm:mt-16 flex flex-col items-center gap-3 fade-in"
                style={{ animationDelay: '0.8s' }}
              >
                <div className="w-4 sm:w-5 md:w-6 h-7 sm:h-8 md:h-10 border-2 border-white/30 rounded-full p-1 relative overflow-hidden backdrop-blur-sm bg-white/5 flex items-center justify-center hover-scale">
                  <div className="w-1.5 sm:w-2 md:w-2.5 h-1.5 sm:h-2 md:h-2.5 bg-gradient-to-b from-violet-500 to-fuchsia-500 rounded-full scroll-indicator" />
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
        <section id="projects" className="py-12 sm:py-20 px-4 md:px-6" ref={projectsRef}>
          <motion.div
            className="max-w-7xl mx-auto"
            initial={{ opacity: 0 }}
            animate={projectsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="space-y-8 sm:space-y-12"
              initial={{ opacity: 0, y: 40 }}
              animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
            >
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent [text-shadow:_0_2px_10px_rgb(124_58_237_/_20%)]">
                  Projects
                </h2>
                <p className="text-white/80 max-w-2xl text-base sm:text-lg">
                  Projects I've worked on!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* Project Cards */}
                <motion.div
                  className="group relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-cyan-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative p-6 sm:p-8 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-colors duration-500">
                    <h3 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent mb-3">
                      Scan's Website V4
                    </h3>
                    <p className="text-white/70 text-sm sm:text-base mb-4">
                      A fully made website by myself, no templates, just full myself. Built with
                      Next.js, TypeScript, and Tailwind CSS.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20">
                        Next.js
                      </span>
                      <span className="px-2 py-1 text-xs rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        TypeScript
                      </span>
                      <span className="px-2 py-1 text-xs rounded-full bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/20">
                        Tailwind CSS
                      </span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="group relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-cyan-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative p-6 sm:p-8 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-colors duration-500">
                    <h3 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent mb-3">
                      Scan's Website V3
                    </h3>
                    <p className="text-white/70 text-sm sm:text-base mb-4">
                      3rd version of my website, using Astro portfolio template.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20">
                        Astro
                      </span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="group relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-cyan-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative p-6 sm:p-8 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-colors duration-500">
                    <h3 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent mb-3">
                      Scan's Website V2
                    </h3>
                    <p className="text-white/70 text-sm sm:text-base mb-4">
                      Second version of Scan's Website, does not use frameworks, and is light. Link
                      not available.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20">
                        HTML
                      </span>
                      <span className="px-2 py-1 text-xs rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        CSS
                      </span>
                      <span className="px-2 py-1 text-xs rounded-full bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/20">
                        JavaScript
                      </span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="group relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-cyan-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative p-6 sm:p-8 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-colors duration-500">
                    <h3 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent mb-3">
                      ScanSMP
                    </h3>
                    <p className="text-white/70 text-sm sm:text-base mb-4">
                      A very cool and developed Minecraft SMP with a lot of cool features.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20">
                        Java
                      </span>
                      <span className="px-2 py-1 text-xs rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        Spigot
                      </span>
                      <span className="px-2 py-1 text-xs rounded-full bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/20">
                        MySQL
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 sm:py-20 px-4 md:px-6" ref={contactRef}>
          <motion.div
            className="max-w-7xl mx-auto"
            initial={{ opacity: 0 }}
            animate={contactInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="space-y-8 sm:space-y-12"
              initial={{ opacity: 0, y: 40 }}
              animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
            >
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent mb-4 md:mb-8 [text-shadow:_0_2px_10px_rgb(124_58_237_/_20%)]">
                  Let's Connect
                </h2>
                <p className="text-white/80 text-base md:text-lg mb-8 md:mb-12 leading-relaxed">
                  Feel free to reach out through any of these platforms. I'm always interested in
                  new opportunities and collaborations.
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="max-w-md mx-auto mb-8 md:mb-12"
                >
                  <DiscordStatus />
                </motion.div>
                <div className="flex justify-center gap-4 md:gap-8">
                  <SocialLinks horizontal isContact />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
