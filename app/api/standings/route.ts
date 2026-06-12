import { NextResponse } from 'next/server';

const ESPN = 'https://site.api.espn.com/apis/v2/sports/soccer/fifa.world/standings';
const FDO  = 'https://api.football-data.org/v4/competitions/WC/standings';

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
  'Accept': 'application/json',
};

export async function GET() {
  // 1. Try ESPN (no key required)
  try {
    const res = await fetch(ESPN, { headers: HEADERS, cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      return NextResponse.json({ source: 'espn', data }, {
        headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30' },
      });
    }
    console.error('[standings] ESPN responded', res.status);
  } catch (e) {
    console.error('[standings] ESPN fetch error:', e);
  }

  // 2. Fall back to football-data.org if key is configured
  const apiKey = process.env.FOOTBALL_DATA_API_KEY;
  if (apiKey) {
    try {
      const res = await fetch(FDO, {
        headers: { 'X-Auth-Token': apiKey, ...HEADERS },
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        return NextResponse.json({ source: 'fdo', data }, {
          headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30' },
        });
      }
      console.error('[standings] FDO responded', res.status);
    } catch (e) {
      console.error('[standings] FDO fetch error:', e);
    }
  }

  return NextResponse.json({ error: 'no_data' }, { status: 503 });
}
