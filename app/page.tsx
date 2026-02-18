'use client';

import { useState, useMemo, useEffect } from 'react';
import Hero from '@/components/Hero/Hero';
import FilterBar from '@/components/FilterBar/FilterBar';
import MasonryGrid from '@/components/MasonryGrid/MasonryGrid';
import MoodboardDock from '@/components/MoodboardDock/MoodboardDock';
import LightBox from '@/components/LightBox/LightBox';
import { Shoe, FilterState } from '@/types/shoe';
import { ALL_BRANDS, ALL_TYPES, ALL_THEMES } from '@/lib/mockData';

export default function HomePage() {
  const [shoes, setShoes] = useState<Shoe[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({ brands: [], types: [], themes: [] });
  const [selected, setSelected] = useState<Shoe | null>(null);
  const [columns, setColumns] = useState(3);

  // Responsive column count
  useEffect(() => {
    function updateColumns() {
      if (window.innerWidth < 640) setColumns(2);
      else if (window.innerWidth < 1024) setColumns(3);
      else setColumns(4);
    }
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Fetch shoes (API falls back to mock data automatically)
  useEffect(() => {
    fetch('/api/shoes')
      .then((r) => r.json())
      .then((data: Shoe[]) => {
        // Featured shoes first
        const sorted = [...data].sort((a, b) => Number(b.featured) - Number(a.featured));
        setShoes(sorted);
      })
      .finally(() => setLoading(false));
  }, []);

  // Client-side filtering
  const filtered = useMemo(() => {
    return shoes.filter((shoe) => {
      const brandMatch = filters.brands.length === 0 || filters.brands.includes(shoe.brand);
      const typeMatch = filters.types.length === 0 || filters.types.includes(shoe.type);
      const themeMatch =
        filters.themes.length === 0 ||
        shoe.themes.some((t) => filters.themes.includes(t));
      return brandMatch && typeMatch && themeMatch;
    });
  }, [shoes, filters]);

  return (
    <main>
      {/* Hero */}
      <Hero />

      {/* Gallery section */}
      <section id="gallery" className="min-h-screen">
        {/* Filter bar */}
        <FilterBar
          brands={ALL_BRANDS}
          types={ALL_TYPES}
          themes={ALL_THEMES}
          filters={filters}
          onFilterChange={setFilters}
        />

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Section header */}
          <div className="flex items-end justify-between mb-6">
            <div>
              <p
                className="text-[#F5C518] text-xs uppercase tracking-widest mb-1"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                Browse
              </p>
              <h2
                className="text-white leading-none"
                style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  letterSpacing: '0.05em',
                }}
              >
                The Gallery
              </h2>
            </div>
            {!loading && (
              <p
                className="text-[#555555] text-sm"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {filtered.length} {filtered.length === 1 ? 'design' : 'designs'}
              </p>
            )}
          </div>

          {/* Loading skeleton */}
          {loading ? (
            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-[#141414] border border-[#2A2A2A] animate-pulse"
                  style={{ aspectRatio: i % 3 === 0 ? '3/4' : i % 3 === 1 ? '1/1' : '4/3' }}
                />
              ))}
            </div>
          ) : (
            <MasonryGrid shoes={filtered} onOpen={setSelected} columns={columns} />
          )}
        </div>
      </section>

      {/* Lightbox */}
      <LightBox shoe={selected} onClose={() => setSelected(null)} />

      {/* Floating moodboard dock */}
      <MoodboardDock />
    </main>
  );
}
