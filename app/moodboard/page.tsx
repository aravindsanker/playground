import Link from 'next/link';
import MoodboardView from '@/components/MoodboardView/MoodboardView';
import MoodboardDock from '@/components/MoodboardDock/MoodboardDock';

export const metadata = {
  title: 'Your Moodboard — Madras Drip',
  description: 'Review your saved designs and start your custom sneaker journey.',
};

export default function MoodboardPage() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <header className="border-b border-[#2A2A2A] px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 group"
        >
          <span
            className="text-[#888888] text-xs uppercase tracking-widest group-hover:text-white transition-colors"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            ← Gallery
          </span>
        </Link>

        {/* Wordmark */}
        <div className="flex items-baseline gap-2">
          <span
            className="text-white tracking-widest"
            style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.6rem', letterSpacing: '0.15em' }}
          >
            MADRAS
          </span>
          <span
            className="text-[#F5C518]"
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: '1.3rem',
              WebkitTextStroke: '1px #0A0A0A',
            }}
          >
            drip
          </span>
        </div>

        <div className="w-16" /> {/* spacer */}
      </header>

      {/* Moodboard */}
      <MoodboardView />

      {/* Dock */}
      <MoodboardDock />
    </main>
  );
}
