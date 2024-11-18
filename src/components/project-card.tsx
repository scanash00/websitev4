'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
  tags: string[];
  priority?: boolean;
}

export function ProjectCard({
  title,
  description,
  imageUrl,
  href,
  tags,
  priority = false,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      className="group relative isolate flex h-full flex-col overflow-hidden rounded-lg border bg-secondary/80 backdrop-blur-sm"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated orb effect */}
      <motion.div
        className="absolute -z-10 rounded-full blur-2xl"
        animate={{
          scale: isHovered ? [1, 1.2, 1] : 1,
          opacity: isHovered ? [0.1, 0.15, 0.1] : 0.1,
        }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          width: '50%',
          height: '50%',
          background: 'radial-gradient(circle at center, rgba(124,58,237,0.15), transparent)',
          top: '25%',
          left: '25%',
        }}
      />

      <div className="relative aspect-video overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          className="object-cover transition-all duration-700 will-change-transform group-hover:scale-105"
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          priority={priority}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col justify-between p-6 z-10">
        <div className="flex-1">
          <h3 className="font-semibold leading-7 tracking-tight">
            <Link href={href} className="after:absolute after:inset-0">
              {title}
            </Link>
          </h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <motion.span
              key={tag}
              className="inline-flex items-center rounded-full bg-secondary-foreground/10 px-2 py-1 text-xs"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
