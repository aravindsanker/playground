// Airtable integration — plug in your credentials via .env.local
// AIRTABLE_API_KEY=your_key
// AIRTABLE_BASE_ID=your_base_id
// AIRTABLE_TABLE_NAME=Shoes (or your table name)

import { Shoe, Brand, ShoeType, Theme } from '@/types/shoe';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME ?? 'Shoes';

interface AirtableRecord {
  id: string;
  fields: {
    name?: string;
    brand?: string;
    type?: string;
    themes?: string[];
    images?: { url: string; width: number; height: number }[];
    tags?: string[];
    featured?: boolean;
  };
}

function inferAspectRatio(width: number, height: number): 'tall' | 'wide' | 'square' {
  const ratio = width / height;
  if (ratio < 0.85) return 'tall';
  if (ratio > 1.15) return 'wide';
  return 'square';
}

export async function fetchShoesFromAirtable(): Promise<Shoe[]> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    throw new Error('Airtable credentials not configured');
  }

  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}?view=Grid%20view`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
    next: { revalidate: 3600 }, // ISR: revalidate every hour
  });

  if (!res.ok) throw new Error(`Airtable error: ${res.status}`);

  const data: { records: AirtableRecord[] } = await res.json();

  return data.records.map((record) => {
    const img = record.fields.images?.[0];
    return {
      id: record.id,
      name: record.fields.name ?? 'Untitled',
      brand: (record.fields.brand as Brand) ?? 'Nike',
      type: (record.fields.type as ShoeType) ?? 'Low-top',
      themes: (record.fields.themes as Theme[]) ?? [],
      imageUrl: img?.url ?? '',
      aspectRatio: img ? inferAspectRatio(img.width, img.height) : 'square',
      tags: record.fields.tags ?? [],
      featured: record.fields.featured ?? false,
    };
  });
}
