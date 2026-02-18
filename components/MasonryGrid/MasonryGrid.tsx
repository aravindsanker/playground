'use client';

import { useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Shoe } from '@/types/shoe';
import ShoeCard from '@/components/ShoeCard/ShoeCard';

interface MasonryGridProps {
  shoes: Shoe[];
  onOpen: (shoe: Shoe) => void;
  columns?: number;
}

export default function MasonryGrid({ shoes, onOpen, columns = 3 }: MasonryGridProps) {
  // Distribute shoes across columns
  const columnArrays = useMemo(() => {
    const cols: Shoe[][] = Array.from({ length: columns }, () => []);
    shoes.forEach((shoe, i) => {
      cols[i % columns].push(shoe);
    });
    return cols;
  }, [shoes, columns]);

  if (shoes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-[#555555]">
        <div
          className="text-6xl mb-4"
          style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.1em' }}
        >
          No Kicks Found
        </div>
        <p className="text-sm tracking-widest uppercase" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          Try adjusting your filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {columnArrays.map((col, colIdx) => (
        <div key={colIdx} className="flex flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {col.map((shoe) => (
              <ShoeCard key={shoe.id} shoe={shoe} onOpen={onOpen} />
            ))}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
