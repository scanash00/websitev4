'use client';

import { motion } from 'framer-motion';
import { FiGithub, FiMail } from 'react-icons/fi';
import { FaDiscord } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const socialLinks = [
  {
    name: 'GitHub',
    icon: FiGithub,
    href: 'https://github.com/scanash00',
  },
  {
    name: 'X',
    icon: FaXTwitter,
    href: 'https://x.com/x_ale_pro',
  },
  {
    name: 'Discord',
    icon: FaDiscord,
    href: 'https://discord.com/users/827389583342698536',
  },
  {
    name: 'Email',
    icon: FiMail,
    href: 'mailto:scan@scanash.com',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -10 },
  show: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    }
  },
};

const horizontalItem = {
  hidden: { opacity: 0, y: 10 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    }
  },
};

export function SocialLinks({ horizontal = false, isContact = false, className = '' }: { horizontal?: boolean, isContact?: boolean, className?: string }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={`flex ${horizontal ? 'flex-row gap-4 sm:gap-6' : 'flex-col gap-4 sm:gap-6'} ${className}`}
    >
      {socialLinks.map((link) => {
        const Icon = link.icon;
        return (
          <motion.a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            variants={horizontal ? horizontalItem : item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative p-2.5 md:p-3 bg-black/50 rounded-full hover:bg-black/70 transition-colors duration-300"
          >
            <Icon className="h-5 w-5 md:w-6 md:h-6 text-white/60 group-hover:text-white transition-colors duration-300" />
            {isContact ? (
              <motion.span
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 text-white text-xs rounded opacity-0 pointer-events-none transition-opacity duration-300 whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
              >
                {link.name}
              </motion.span>
            ) : (
              <motion.div
                className={`
                  absolute ${horizontal ? 'top-1/2 left-full -translate-y-1/2 ml-2' : 'left-full top-1/2 -translate-y-1/2 ml-2'}
                  pointer-events-none px-3 py-1.5 rounded-lg
                  bg-black/50 backdrop-blur-md
                  opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100
                  transition-all duration-200 ease-out
                  whitespace-nowrap
                  text-white/90
                `}
              >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10 backdrop-blur-sm -z-10" />
                <span className="text-xs sm:text-sm font-medium text-white/90">
                  {link.name}
                </span>
              </motion.div>
            )}
          </motion.a>
        );
      })}
    </motion.div>
  );
}
