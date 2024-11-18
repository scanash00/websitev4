'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0, 0.95]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Get all sections
      const sections = ['top', 'projects', 'contact'];
      const viewportHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      
      // Find the currently visible section
      let newActiveSection = 'top';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;
        
        const rect = element.getBoundingClientRect();
        const sectionTop = rect.top + scrollPosition;
        const sectionBottom = sectionTop + rect.height;
        
        // Check if we're in the section with some buffer for transitions
        if (scrollPosition >= sectionTop - viewportHeight / 2 &&
            scrollPosition < sectionBottom - viewportHeight / 3) {
          newActiveSection = section;
          break;
        }
      }
      
      setActiveSection(newActiveSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveSection('top');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-14 sm:h-16 md:h-20 bg-black/50 z-40"
        style={{ opacity }}
      />
      
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        className="fixed top-0 left-0 right-0 z-50 h-14 sm:h-16 md:h-20"
      >
        <nav className="relative h-full mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-full items-center justify-between">
            <Link 
              href="/"
              className="group relative"
            >
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="inline-block text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
                  Scan
                </span>
              </motion.div>
            </Link>

            <div className="flex items-center gap-3 sm:gap-4 md:gap-8">
              {['projects', 'contact'].map((section) => (
                <Link 
                  key={section}
                  href={`#${section}`}
                  className={cn(
                    'group relative px-2 sm:px-3 md:px-4 py-1.5 sm:py-2',
                    'text-xs sm:text-sm font-medium transition-colors duration-300',
                    activeSection === section ? 'text-white' : 'text-white/60 hover:text-white'
                  )}
                >
                  <span className="relative z-10 capitalize">{section}</span>
                  {activeSection === section && (
                    <motion.div
                      className="absolute -bottom-1 left-2 right-2 h-px bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500"
                      layoutId="activeSection"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <motion.div
                    className="absolute -bottom-1 left-2 right-2 h-px bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </motion.header>
    </>
  );
}
