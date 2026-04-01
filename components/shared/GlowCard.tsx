'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  delay?: number;
}

export default function GlowCard({
  children,
  className,
  glowColor = 'rgba(0, 71, 171, 0.15)',
  delay = 0,
}: GlowCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        'relative rounded-xl border border-[#1E293B] bg-[#111827] p-6 overflow-hidden',
        'hover:border-[#0047AB]/40 transition-colors duration-300',
        className
      )}
      style={{
        boxShadow: `0 0 30px ${glowColor}`,
      }}
    >
      {children}
    </motion.div>
  );
}
