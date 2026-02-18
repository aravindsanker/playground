import { NextResponse } from 'next/server';
import { fetchShoesFromAirtable } from '@/lib/airtable';
import { MOCK_SHOES } from '@/lib/mockData';

export const revalidate = 3600; // ISR: revalidate every hour

export async function GET() {
  // Use Airtable if credentials are configured, otherwise fall back to mock data
  if (process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID) {
    try {
      const shoes = await fetchShoesFromAirtable();
      return NextResponse.json(shoes);
    } catch (err) {
      console.error('Airtable fetch failed, using mock data:', err);
    }
  }

  return NextResponse.json(MOCK_SHOES);
}
