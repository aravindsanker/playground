'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-6 text-center overflow-hidden noise-overlay">
      {/* Background grain + glow */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[#0A0A0A]"
      />
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(245,197,24,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Decorative top line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute top-0 left-0 right-0 h-[2px] bg-[#F5C518] origin-left"
      />

      {/* Logo / Wordmark */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative z-10 mb-6"
      >
        {/* MADRAS — retro condensed */}
        <div
          className="text-white leading-none tracking-widest"
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(5rem, 18vw, 14rem)',
            letterSpacing: '0.15em',
          }}
        >
          MADRAS
        </div>

        {/* drip — graffiti / bubble feel */}
        <div
          className="leading-none -mt-4 md:-mt-8"
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(3.5rem, 14vw, 10rem)',
            letterSpacing: '0.05em',
            color: '#F5C518',
            WebkitTextStroke: '2px #0A0A0A',
            textShadow: '4px 4px 0 #0A0A0A, -2px -2px 0 #0A0A0A',
          }}
        >
          drip
        </div>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative z-10 text-[#888888] text-sm md:text-base uppercase tracking-[0.3em] mb-10 max-w-sm"
        style={{ fontFamily: 'var(--font-space-grotesk)' }}
      >
        Custom Sneaker Studio · Chennai
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="relative z-10 flex flex-col sm:flex-row gap-4 items-center"
      >
        <a
          href="#gallery"
          className="group flex items-center gap-2 bg-[#F5C518] text-[#0A0A0A] font-semibold px-8 py-3 rounded-none text-sm uppercase tracking-widest hover:bg-white transition-colors duration-200"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          Build Your Moodboard
          <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
        </a>
        <Link
          href="/moodboard"
          className="border border-[#2A2A2A] text-[#888888] font-semibold px-8 py-3 text-sm uppercase tracking-widest hover:border-[#F5C518] hover:text-white transition-all duration-200"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          View Moodboard
        </Link>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#555555]"
      >
        <span className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-[#555555] to-transparent"
        />
      </motion.div>
    </section>
  );
}
