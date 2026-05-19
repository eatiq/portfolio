'use client';

import { motion } from 'framer-motion';

type PullQuoteProps = {
  quote: string;
  author: string;
  role?: string;
};

export default function PullQuote({ quote, author, role }: PullQuoteProps) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="border-l-2 border-foreground/20 pl-6 md:pl-8 py-2 my-8"
    >
      <blockquote className="text-lg md:text-xl leading-relaxed text-foreground/80 italic">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-4 text-sm text-foreground/50">
        <span className="font-medium text-foreground/70">{author}</span>
        {role && <span className="text-foreground/40">, {role}</span>}
      </figcaption>
    </motion.figure>
  );
}
