'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Shoe } from '@/types/shoe';
import { useMoodboard } from '@/context/MoodboardContext';

interface LightBoxProps {
  shoe: Shoe | null;
  onClose: () => void;
}

export default function LightBox({ shoe, onClose }: LightBoxProps) {
  const { isLiked, toggle } = useMoodboard();

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (shoe) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [shoe]);

  return (
    <AnimatePresence>
      {shoe && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#0A0A0A]/95 backdrop-blur-sm" />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="relative z-10 bg-[#141414] border border-[#2A2A2A] max-w-3xl w-full overflow-hidden flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative flex-1 min-h-[300px] md:min-h-[440px]">
              <Image
                src={shoe.imageUrl}
                alt={shoe.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Info */}
            <div className="flex flex-col justify-between p-6 md:w-64 md:shrink-0">
              <div>
                {/* Close */}
                <button
                  onClick={onClose}
                  className="mb-4 text-[#555555] hover:text-white text-xl leading-none transition-colors"
                  aria-label="Close"
                >
                  ✕
                </button>

                {/* Brand + Name */}
                <p
                  className="text-[#F5C518] text-xs uppercase tracking-widest mb-1"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {shoe.brand}
                </p>
                <h2
                  className="text-white leading-tight mb-4"
                  style={{
                    fontFamily: 'var(--font-bebas)',
                    fontSize: '2rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  {shoe.name}
                </h2>

                {/* Type */}
                <div className="flex gap-2 flex-wrap mb-4">
                  <span
                    className="text-[10px] uppercase tracking-wider border border-[#2A2A2A] px-2 py-1 text-[#888888]"
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    {shoe.type}
                  </span>
                </div>

                {/* Themes */}
                <div className="flex gap-2 flex-wrap mb-6">
                  {shoe.themes.map((theme) => (
                    <span
                      key={theme}
                      className="text-[10px] uppercase tracking-wider bg-[#2A2A2A] text-[#F5C518] px-2 py-1"
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      {theme}
                    </span>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex gap-1 flex-wrap">
                  {shoe.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] text-[#555555]"
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Like CTA */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => toggle(shoe)}
                className={`mt-6 w-full py-3 text-sm uppercase tracking-widest font-semibold transition-all duration-200 ${
                  isLiked(shoe.id)
                    ? 'bg-[#F5C518] text-[#0A0A0A]'
                    : 'border border-[#F5C518] text-[#F5C518] hover:bg-[#F5C518] hover:text-[#0A0A0A]'
                }`}
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {isLiked(shoe.id) ? '♥ In Moodboard' : '♡ Add to Moodboard'}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
