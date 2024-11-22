'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const router = useRouter();

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0, 0.95]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['top', 'projects', 'contact'];
      const viewportHeight = window.innerHeight;
      const scrollPosition = window.scrollY;

      let newActiveSection = 'top';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        const sectionTop = rect.top + scrollPosition;
        const sectionBottom = sectionTop + rect.height;

        if (
          scrollPosition >= sectionTop - viewportHeight / 2 &&
          scrollPosition < sectionBottom - viewportHeight / 3
        ) {
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
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
        className="fixed top-0 left-0 right-0 z-50 h-14 sm:h-16 md:h-20"
      >
        <nav className="relative h-full mx-auto max-w-7xl px-3 sm:px-6">
          <div className="flex h-full items-center justify-between">
            <Link href="/" onClick={handleHomeClick} className="group relative">
              <motion.div
                className="relative cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <span className="inline-block text-base sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
                  Scan
                </span>
              </motion.div>
            </Link>

            <div className="flex items-center gap-2 sm:gap-4 md:gap-8">
              {['projects', 'contact'].map((section) => (
                <Link
                  key={section}
                  href={`#${section}`}
                  className={cn(
                    'group relative px-2 sm:px-3 md:px-4 py-1 sm:py-2',
                    'text-xs sm:text-sm font-medium transition-colors duration-300',
                    'whitespace-nowrap',
                    activeSection === section ? 'text-white' : 'text-white/60 hover:text-white'
                  )}
                >
                  <span className="relative z-10 capitalize">{section}</span>
                  {activeSection === section && (
                    <motion.div
                      className="absolute inset-0 bg-white/10 rounded-full"
                      layoutId="activeSection"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </motion.header>
    </>
  );
}
