'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Brand, ShoeType, Theme, FilterState } from '@/types/shoe';

interface FilterBarProps {
  brands: Brand[];
  types: ShoeType[];
  themes: Theme[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

type FilterKey = keyof FilterState;

function toggleValue<T extends string>(arr: T[], val: T): T[] {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}

const activeCount = (f: FilterState) =>
  f.brands.length + f.types.length + f.themes.length;

export default function FilterBar({
  brands,
  types,
  themes,
  filters,
  onFilterChange,
}: FilterBarProps) {
  function toggle(key: FilterKey, value: string) {
    onFilterChange({
      ...filters,
      [key]: toggleValue(filters[key] as string[], value),
    });
  }

  function clearAll() {
    onFilterChange({ brands: [], types: [], themes: [] });
  }

  const count = activeCount(filters);

  return (
    <div className="sticky top-0 z-30 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Header row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span
              className="text-xs uppercase tracking-widest text-[#888888]"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Filter
            </span>
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="bg-[#F5C518] text-[#0A0A0A] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {count > 0 && (
              <motion.button
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                onClick={clearAll}
                className="text-xs text-[#888888] hover:text-[#F5C518] uppercase tracking-widest transition-colors"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                Clear all
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Filter groups — horizontally scrollable */}
        <div className="flex gap-6 overflow-x-auto pb-1 no-scrollbar">
          {/* Brand */}
          <FilterGroup
            label="Brand"
            items={brands}
            active={filters.brands}
            onToggle={(v) => toggle('brands', v)}
          />

          {/* Type */}
          <FilterGroup
            label="Type"
            items={types}
            active={filters.types}
            onToggle={(v) => toggle('types', v)}
          />

          {/* Theme */}
          <FilterGroup
            label="Theme"
            items={themes}
            active={filters.themes}
            onToggle={(v) => toggle('themes', v)}
          />
        </div>
      </div>
    </div>
  );
}

function FilterGroup({
  label,
  items,
  active,
  onToggle,
}: {
  label: string;
  items: string[];
  active: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 shrink-0">
      <span
        className="text-xs text-[#555555] uppercase tracking-wider shrink-0"
        style={{ fontFamily: 'var(--font-space-grotesk)' }}
      >
        {label}
      </span>
      <div className="w-px h-4 bg-[#2A2A2A]" />
      <div className="flex gap-2 flex-wrap">
        {items.map((item) => {
          const isActive = active.includes(item);
          return (
            <motion.button
              key={item}
              onClick={() => onToggle(item)}
              whileTap={{ scale: 0.92 }}
              className={`text-xs px-3 py-1 border transition-all duration-150 ${
                isActive
                  ? 'bg-[#F5C518] text-[#0A0A0A] border-[#F5C518] font-semibold'
                  : 'bg-transparent text-[#888888] border-[#2A2A2A] hover:border-[#F5C518] hover:text-white'
              }`}
              style={{ fontFamily: 'var(--font-space-grotesk)', borderRadius: 0 }}
            >
              {item}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
