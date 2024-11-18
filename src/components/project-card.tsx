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
      className="group relative isolate flex h-full flex-col overflow-hidden rounded-lg border bg-secondary"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          className="object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          priority={priority}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="flex-1">
          <h3 className="font-semibold leading-7">
            <Link href={href} className="after:absolute after:inset-0">
              <span className="absolute inset-0" />
              {title}
            </Link>
          </h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{description}</p>
        </div>

        <motion.div
          className="mt-4 flex flex-wrap gap-2"
          initial={false}
          animate={isHovered ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
                'bg-primary/10 text-primary ring-1 ring-inset ring-primary/20'
              )}
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>

      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-secondary/50 to-secondary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />
    </motion.article>
  );
}
