'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useMoodboard } from '@/context/MoodboardContext';

export default function MoodboardDock() {
  const { liked } = useMoodboard();
  const count = liked.length;
  const preview = liked.slice(-4); // show last 4 added

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
        >
          <div className="flex items-center gap-4 bg-[#141414] border border-[#2A2A2A] px-4 py-3 shadow-2xl shadow-black/60">
            {/* Thumbnail stack */}
            <div className="flex">
              {preview.map((shoe, i) => (
                <div
                  key={shoe.id}
                  className="relative w-10 h-10 border-2 border-[#141414] overflow-hidden"
                  style={{
                    marginLeft: i === 0 ? 0 : -12,
                    zIndex: preview.length - i,
                  }}
                >
                  <Image
                    src={shoe.imageUrl}
                    alt={shoe.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
              ))}
              {count > 4 && (
                <div
                  className="relative w-10 h-10 border-2 border-[#141414] bg-[#2A2A2A] flex items-center justify-center text-[#888888] text-xs font-bold"
                  style={{ marginLeft: -12, zIndex: 0 }}
                >
                  +{count - 4}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-[#2A2A2A]" />

            {/* Label */}
            <div>
              <p
                className="text-white text-xs font-semibold"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {count} {count === 1 ? 'piece' : 'pieces'} saved
              </p>
              <p
                className="text-[#555555] text-[10px] uppercase tracking-wider"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                Your Moodboard
              </p>
            </div>

            {/* CTA */}
            <Link
              href="/moodboard"
              className="flex items-center gap-2 bg-[#F5C518] text-[#0A0A0A] text-xs font-bold uppercase tracking-widest px-4 py-2 hover:bg-white transition-colors duration-200"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              View Moodboard →
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
