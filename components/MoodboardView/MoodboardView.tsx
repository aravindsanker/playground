'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useMoodboard } from '@/context/MoodboardContext';
import { Shoe } from '@/types/shoe';

export default function MoodboardView() {
  const { liked, remove, clear } = useMoodboard();
  const boardRef = useRef<HTMLDivElement>(null);

  async function downloadMoodboard() {
    if (!boardRef.current) return;
    const { default: html2canvas } = await import('html2canvas');
    const canvas = await html2canvas(boardRef.current, {
      scale: 2,
      useCORS: true,
    });
    const link = document.createElement('a');
    link.download = 'madras-drip-moodboard.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  if (liked.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <div
          className="text-7xl text-[#2A2A2A] mb-4"
          style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.1em' }}
        >
          Empty Board
        </div>
        <p
          className="text-[#555555] text-sm uppercase tracking-widest mb-8"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          You haven&apos;t liked any designs yet
        </p>
        <Link
          href="/#gallery"
          className="bg-[#F5C518] text-[#0A0A0A] font-bold text-sm uppercase tracking-widest px-8 py-3 hover:bg-white transition-colors"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          ← Browse Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <p
            className="text-[#F5C518] text-xs uppercase tracking-widest mb-1"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Your Collection
          </p>
          <h1
            className="text-white leading-none"
            style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(3rem, 8vw, 5rem)', letterSpacing: '0.05em' }}
          >
            Moodboard
          </h1>
          <p
            className="text-[#555555] text-sm mt-1"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            {liked.length} {liked.length === 1 ? 'design' : 'designs'} saved
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={downloadMoodboard}
            className="border border-[#2A2A2A] text-[#888888] text-xs font-semibold uppercase tracking-widest px-4 py-2 hover:border-[#F5C518] hover:text-white transition-all"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            ↓ Download
          </button>
          <button
            onClick={clear}
            className="border border-[#2A2A2A] text-[#888888] text-xs font-semibold uppercase tracking-widest px-4 py-2 hover:border-red-500/60 hover:text-red-400 transition-all"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Board */}
      <div
        ref={boardRef}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-12"
      >
        <AnimatePresence mode="popLayout">
          {liked.map((shoe: Shoe) => (
            <motion.div
              key={shoe.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.25 }}
              className="group relative bg-[#141414] border border-[#2A2A2A] overflow-hidden"
            >
              {/* Image */}
              <div
                className={`relative ${
                  shoe.aspectRatio === 'tall'
                    ? 'shoe-card-tall'
                    : shoe.aspectRatio === 'wide'
                    ? 'shoe-card-wide'
                    : 'shoe-card-square'
                }`}
              >
                <Image
                  src={shoe.imageUrl}
                  alt={shoe.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 25vw"
                  crossOrigin="anonymous"
                />
                {/* Remove overlay */}
                <div className="absolute inset-0 bg-[#0A0A0A]/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => remove(shoe.id)}
                    className="w-8 h-8 bg-red-500 text-white text-sm flex items-center justify-center hover:bg-red-400 transition-colors"
                    aria-label="Remove from moodboard"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Caption */}
              <div className="p-2">
                <p
                  className="text-white text-xs font-semibold truncate"
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
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* CTA */}
      <div className="border border-[#2A2A2A] p-8 text-center">
        <p
          className="text-[#888888] text-xs uppercase tracking-widest mb-2"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          Ready to bring it to life?
        </p>
        <h2
          className="text-white mb-6"
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            letterSpacing: '0.05em',
          }}
        >
          Start Customising Your Kicks
        </h2>
        <p
          className="text-[#555555] text-sm max-w-md mx-auto mb-8"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          Share your moodboard with our artists and we&apos;ll design something one of a kind — just for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Replace href with your booking link */}
          <a
            href="https://wa.me/917xxxxxxxxx?text=Hi%2C%20I%20have%20my%20moodboard%20ready!"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#F5C518] text-[#0A0A0A] font-bold text-sm uppercase tracking-widest px-10 py-4 hover:bg-white transition-colors"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            WhatsApp Us →
          </a>
          <button
            onClick={downloadMoodboard}
            className="inline-flex items-center gap-2 border border-[#F5C518] text-[#F5C518] font-bold text-sm uppercase tracking-widest px-10 py-4 hover:bg-[#F5C518] hover:text-[#0A0A0A] transition-all"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            ↓ Save Moodboard
          </button>
        </div>
      </div>
    </div>
  );
}
