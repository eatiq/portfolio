'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type Stat = {
  value: string;
  label: ReactNode;
};

type StatGridProps = {
  stats: Stat[];
  columns?: 2 | 3 | 4;
};

export default function StatGrid({ stats, columns = 4 }: StatGridProps) {
  const colClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }[columns];

  return (
    <div className={`grid grid-cols-2 ${colClass} gap-px bg-foreground/10 border border-foreground/10 rounded-xl overflow-hidden mb-16 md:mb-24`}>
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4, delay: i * 0.05, ease: 'easeOut' }}
          className="bg-background p-6 md:p-8"
        >
          <div className="text-2xl md:text-4xl font-bold tracking-tight mb-2">
            {stat.value}
          </div>
          <div className="text-xs md:text-sm text-foreground/50 uppercase tracking-wider">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
