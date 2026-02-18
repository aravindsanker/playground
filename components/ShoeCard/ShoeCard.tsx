'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Shoe } from '@/types/shoe';
import { useMoodboard } from '@/context/MoodboardContext';

interface ShoeCardProps {
  shoe: Shoe;
  onOpen: (shoe: Shoe) => void;
}

const aspectClass = {
  tall: 'shoe-card-tall',
  wide: 'shoe-card-wide',
  square: 'shoe-card-square',
};

export default function ShoeCard({ shoe, onOpen }: ShoeCardProps) {
  const { isLiked, toggle } = useMoodboard();
  const liked = isLiked(shoe.id);
  const [animating, setAnimating] = useState(false);

  function handleLike(e: React.MouseEvent) {
    e.stopPropagation();
    setAnimating(true);
    toggle(shoe);
    setTimeout(() => setAnimating(false), 300);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      className="group relative cursor-pointer bg-[#141414] border border-[#2A2A2A] overflow-hidden hover:border-[#F5C518]/40 transition-colors duration-300"
      onClick={() => onOpen(shoe)}
    >
      {/* Image container */}
      <div className={`relative overflow-hidden ${aspectClass[shoe.aspectRatio]}`}>
        <Image
          src={shoe.imageUrl}
          alt={shoe.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Featured badge */}
        {shoe.featured && (
          <div
            className="absolute top-2 left-2 bg-[#F5C518] text-[#0A0A0A] text-[10px] font-bold uppercase tracking-widest px-2 py-0.5"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Featured
          </div>
        )}

        {/* Like button */}
        <motion.button
          onClick={handleLike}
          whileTap={{ scale: 0.85 }}
          className={`absolute top-2 right-2 w-8 h-8 flex items-center justify-center backdrop-blur-sm transition-all duration-200 ${
            liked
              ? 'bg-[#F5C518] border-[#F5C518]'
              : 'bg-[#0A0A0A]/60 border-[#2A2A2A] opacity-0 group-hover:opacity-100'
          } border`}
          aria-label={liked ? 'Unlike' : 'Like'}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={liked ? 'liked' : 'unliked'}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: animating ? 1.3 : 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-sm"
            >
              {liked ? '♥' : '♡'}
            </motion.span>
          </AnimatePresence>
        </motion.button>

        {/* Bottom info on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <p
            className="text-white font-semibold text-xs leading-tight truncate"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            {shoe.name}
          </p>
          <p
            className="text-[#F5C518] text-[10px] uppercase tracking-wider"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            {shoe.brand}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
