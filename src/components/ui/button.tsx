'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { motion, type HTMLMotionProps } from 'framer-motion';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:opacity-90',
        destructive:
          'bg-red-500 text-white hover:bg-red-600',
        outline:
          'border border-border bg-transparent hover:bg-secondary/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:opacity-80',
        ghost:
          'text-foreground hover:bg-secondary/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-6 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const MotionButton = motion.button;

interface ButtonProps extends 
  Omit<HTMLMotionProps<"button">, keyof VariantProps<typeof buttonVariants>>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, ...props }, ref) => {
    const content = React.isValidElement(children) ? children : <span>{children}</span>;
    
    return (
      <MotionButton
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: 1.02 }}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <motion.div
              className="h-4 w-4 rounded-full border-2 border-current border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            {content}
          </div>
        ) : (
          content
        )}
      </MotionButton>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
