export interface Match {
  id: string;
  group: string;
  matchday: 1 | 2 | 3;
  homeTeamId: string;
  awayTeamId: string;
  kickoffUTC: string;   // ISO-8601 UTC
  venue: string;
  city: string;
  homeScore?: number;
  awayScore?: number;
}

// Source: official FIFA / Yahoo Sports schedule (published June 2026)
// All times converted from US Eastern (EDT = UTC-4).
// KSA display = UTC + 3 h  (handled by the UI).
//
// Conversion reminder:
//   12 PM ET  → 16:00 UTC → 19:00 KSA
//    1 PM ET  → 17:00 UTC → 20:00 KSA
//    3 PM ET  → 19:00 UTC → 22:00 KSA
//    4 PM ET  → 20:00 UTC → 23:00 KSA
//    5 PM ET  → 21:00 UTC → 00:00 KSA (+1)
//    6 PM ET  → 22:00 UTC → 01:00 KSA (+1)
//  7:30 PM ET → 23:30 UTC → 02:30 KSA (+1)
//    8 PM ET  → 00:00 UTC (+1 day) → 03:00 KSA (+1)
//  8:30 PM ET → 00:30 UTC (+1 day) → 03:30 KSA (+1)
//    9 PM ET  → 01:00 UTC (+1 day) → 04:00 KSA (+1)
//   10 PM ET  → 02:00 UTC (+1 day) → 05:00 KSA (+1)
//   11 PM ET  → 03:00 UTC (+1 day) → 06:00 KSA (+1)
//   12 AM ET  → 04:00 UTC (same day) → 07:00 KSA

export const matches: Match[] = [

  // ══════════════════════════════════════════════════════════════════
  //  GROUP A  — Mexico · South Africa · South Korea · Czech Republic
  // ══════════════════════════════════════════════════════════════════
  // MD1 ─────────────────────────────────────────────────────────────
  { id: 'A1', group: 'A', matchday: 1,
    homeTeamId: 'mex', awayTeamId: 'rsa',
    kickoffUTC: '2026-06-11T19:00:00Z',   // Thu 11 Jun, 3 PM ET → 22:00 KSA
    venue: 'Estadio Banorte', city: 'Mexico City' },

  { id: 'A2', group: 'A', matchday: 1,
    homeTeamId: 'kor', awayTeamId: 'cze',
    kickoffUTC: '2026-06-12T02:00:00Z',   // Thu 11 Jun, 10 PM ET → 05:00 KSA Fri
    venue: 'Estadio Akron', city: 'Guadalajara' },

  // MD2 ─────────────────────────────────────────────────────────────
  { id: 'A3', group: 'A', matchday: 2,
    homeTeamId: 'mex', awayTeamId: 'kor',
    kickoffUTC: '2026-06-19T01:00:00Z',   // Thu 18 Jun, 9 PM ET → 04:00 KSA Fri
    venue: 'Estadio Akron', city: 'Guadalajara' },

  { id: 'A4', group: 'A', matchday: 2,
    homeTeamId: 'cze', awayTeamId: 'rsa',
    kickoffUTC: '2026-06-18T16:00:00Z',   // Thu 18 Jun, 12 PM ET → 19:00 KSA
    venue: 'Mercedes-Benz Stadium', city: 'Atlanta' },

  // MD3 (simultaneous) ──────────────────────────────────────────────
  { id: 'A5', group: 'A', matchday: 3,
    homeTeamId: 'cze', awayTeamId: 'mex',
    kickoffUTC: '2026-06-25T01:00:00Z',   // Wed 24 Jun, 9 PM ET → 04:00 KSA Thu
    venue: 'Estadio Banorte', city: 'Mexico City' },

  { id: 'A6', group: 'A', matchday: 3,
    homeTeamId: 'rsa', awayTeamId: 'kor',
    kickoffUTC: '2026-06-25T01:00:00Z',   // simultaneous
    venue: 'Estadio BBVA', city: 'Monterrey' },

  // ══════════════════════════════════════════════════════════════════
  //  GROUP B  — Canada · Bosnia & Herzegovina · Qatar · Switzerland
  // ══════════════════════════════════════════════════════════════════
  // MD1
  { id: 'B1', group: 'B', matchday: 1,
    homeTeamId: 'can', awayTeamId: 'bih',
    kickoffUTC: '2026-06-12T19:00:00Z',   // Fri 12 Jun, 3 PM ET → 22:00 KSA
    venue: 'BMO Field', city: 'Toronto' },

  { id: 'B2', group: 'B', matchday: 1,
    homeTeamId: 'qat', awayTeamId: 'sui',
    kickoffUTC: '2026-06-13T19:00:00Z',   // Sat 13 Jun, 3 PM ET → 22:00 KSA
    venue: "Levi's Stadium", city: 'Santa Clara' },

  // MD2
  { id: 'B3', group: 'B', matchday: 2,
    homeTeamId: 'can', awayTeamId: 'qat',
    kickoffUTC: '2026-06-18T22:00:00Z',   // Wed 18 Jun, 6 PM ET → 01:00 KSA Thu
    venue: 'BC Place', city: 'Vancouver' },

  { id: 'B4', group: 'B', matchday: 2,
    homeTeamId: 'sui', awayTeamId: 'bih',
    kickoffUTC: '2026-06-18T19:00:00Z',   // Wed 18 Jun, 3 PM ET → 22:00 KSA
    venue: 'SoFi Stadium', city: 'Los Angeles' },

  // MD3 (simultaneous)
  { id: 'B5', group: 'B', matchday: 3,
    homeTeamId: 'sui', awayTeamId: 'can',
    kickoffUTC: '2026-06-24T19:00:00Z',   // Wed 24 Jun, 3 PM ET → 22:00 KSA
    venue: 'BC Place', city: 'Vancouver' },

  { id: 'B6', group: 'B', matchday: 3,
    homeTeamId: 'bih', awayTeamId: 'qat',
    kickoffUTC: '2026-06-24T19:00:00Z',   // simultaneous
    venue: 'Lumen Field', city: 'Seattle' },

  // ══════════════════════════════════════════════════════════════════
  //  GROUP C  — Brazil · Morocco · Haiti · Scotland
  // ══════════════════════════════════════════════════════════════════
  // MD1
  { id: 'C1', group: 'C', matchday: 1,
    homeTeamId: 'bra', awayTeamId: 'mar',
    kickoffUTC: '2026-06-13T22:00:00Z',   // Sat 13 Jun, 6 PM ET → 01:00 KSA Sun
    venue: 'MetLife Stadium', city: 'New York/New Jersey' },

  { id: 'C2', group: 'C', matchday: 1,
    homeTeamId: 'hai', awayTeamId: 'sco',
    kickoffUTC: '2026-06-14T01:00:00Z',   // Sat 13 Jun, 9 PM ET → 04:00 KSA Sun
    venue: 'Gillette Stadium', city: 'Boston' },

  // MD2
  { id: 'C3', group: 'C', matchday: 2,
    homeTeamId: 'bra', awayTeamId: 'hai',
    kickoffUTC: '2026-06-20T00:30:00Z',   // Fri 19 Jun, 8:30 PM ET → 03:30 KSA Sat
    venue: 'Lincoln Financial Field', city: 'Philadelphia' },

  { id: 'C4', group: 'C', matchday: 2,
    homeTeamId: 'sco', awayTeamId: 'mar',
    kickoffUTC: '2026-06-19T22:00:00Z',   // Fri 19 Jun, 6 PM ET → 01:00 KSA Sat
    venue: 'Gillette Stadium', city: 'Boston' },

  // MD3 (simultaneous)
  { id: 'C5', group: 'C', matchday: 3,
    homeTeamId: 'sco', awayTeamId: 'bra',
    kickoffUTC: '2026-06-24T22:00:00Z',   // Wed 24 Jun, 6 PM ET → 01:00 KSA Thu
    venue: 'Hard Rock Stadium', city: 'Miami' },

  { id: 'C6', group: 'C', matchday: 3,
    homeTeamId: 'mar', awayTeamId: 'hai',
    kickoffUTC: '2026-06-24T22:00:00Z',   // simultaneous
    venue: 'Mercedes-Benz Stadium', city: 'Atlanta' },

  // ══════════════════════════════════════════════════════════════════
  //  GROUP D  — United States · Paraguay · Australia · Türkiye
  // ══════════════════════════════════════════════════════════════════
  // MD1
  { id: 'D1', group: 'D', matchday: 1,
    homeTeamId: 'usa', awayTeamId: 'par',
    kickoffUTC: '2026-06-13T01:00:00Z',   // Fri 12 Jun, 9 PM ET → 04:00 KSA Sat
    venue: 'SoFi Stadium', city: 'Los Angeles' },

  { id: 'D2', group: 'D', matchday: 1,
    homeTeamId: 'aus', awayTeamId: 'tur',
    kickoffUTC: '2026-06-14T04:00:00Z',   // Sun 14 Jun, 12 AM ET → 07:00 KSA
    venue: 'BC Place', city: 'Vancouver' },

  // MD2
  { id: 'D3', group: 'D', matchday: 2,
    homeTeamId: 'usa', awayTeamId: 'aus',
    kickoffUTC: '2026-06-19T19:00:00Z',   // Fri 19 Jun, 3 PM ET → 22:00 KSA
    venue: 'Lumen Field', city: 'Seattle' },

  { id: 'D4', group: 'D', matchday: 2,
    homeTeamId: 'tur', awayTeamId: 'par',
    kickoffUTC: '2026-06-20T03:00:00Z',   // Fri 19 Jun, 11 PM ET → 06:00 KSA Sat
    venue: "Levi's Stadium", city: 'Santa Clara' },

  // MD3 (simultaneous)
  { id: 'D5', group: 'D', matchday: 3,
    homeTeamId: 'tur', awayTeamId: 'usa',
    kickoffUTC: '2026-06-26T02:00:00Z',   // Thu 25 Jun, 10 PM ET → 05:00 KSA Fri
    venue: 'SoFi Stadium', city: 'Los Angeles' },

  { id: 'D6', group: 'D', matchday: 3,
    homeTeamId: 'par', awayTeamId: 'aus',
    kickoffUTC: '2026-06-26T02:00:00Z',   // simultaneous
    venue: "Levi's Stadium", city: 'Santa Clara' },

  // ══════════════════════════════════════════════════════════════════
  //  GROUP E  — Germany · Curaçao · Côte d'Ivoire · Ecuador
  // ══════════════════════════════════════════════════════════════════
  // MD1
  { id: 'E1', group: 'E', matchday: 1,
    homeTeamId: 'ger', awayTeamId: 'cur',
    kickoffUTC: '2026-06-14T17:00:00Z',   // Sun 14 Jun, 1 PM ET → 20:00 KSA
    venue: 'NRG Stadium', city: 'Houston' },

  { id: 'E2', group: 'E', matchday: 1,
    homeTeamId: 'civ', awayTeamId: 'ecu',
    kickoffUTC: '2026-06-14T23:00:00Z',   // Sun 14 Jun, 7 PM ET → 02:00 KSA Mon
    venue: 'Lincoln Financial Field', city: 'Philadelphia' },

  // MD2
  { id: 'E3', group: 'E', matchday: 2,
    homeTeamId: 'ger', awayTeamId: 'civ',
    kickoffUTC: '2026-06-20T20:00:00Z',   // Sat 20 Jun, 4 PM ET → 23:00 KSA
    venue: 'BMO Field', city: 'Toronto' },

  { id: 'E4', group: 'E', matchday: 2,
    homeTeamId: 'ecu', awayTeamId: 'cur',
    kickoffUTC: '2026-06-21T00:00:00Z',   // Sat 20 Jun, 8 PM ET → 03:00 KSA Sun
    venue: 'Arrowhead Stadium', city: 'Kansas City' },

  // MD3 (simultaneous)
  { id: 'E5', group: 'E', matchday: 3,
    homeTeamId: 'cur', awayTeamId: 'civ',
    kickoffUTC: '2026-06-25T20:00:00Z',   // Thu 25 Jun, 4 PM ET → 23:00 KSA
    venue: 'Lincoln Financial Field', city: 'Philadelphia' },

  { id: 'E6', group: 'E', matchday: 3,
    homeTeamId: 'ecu', awayTeamId: 'ger',
    kickoffUTC: '2026-06-25T20:00:00Z',   // simultaneous
    venue: 'MetLife Stadium', city: 'New York/New Jersey' },

  // ══════════════════════════════════════════════════════════════════
  //  GROUP F  — Netherlands · Japan · Sweden · Tunisia
  // ══════════════════════════════════════════════════════════════════
  // MD1
  { id: 'F1', group: 'F', matchday: 1,
    homeTeamId: 'ned', awayTeamId: 'jpn',
    kickoffUTC: '2026-06-14T20:00:00Z',   // Sun 14 Jun, 4 PM ET → 23:00 KSA
    venue: 'AT&T Stadium', city: 'Dallas' },

  { id: 'F2', group: 'F', matchday: 1,
    homeTeamId: 'swe', awayTeamId: 'tun',
    kickoffUTC: '2026-06-15T02:00:00Z',   // Sun 14 Jun, 10 PM ET → 05:00 KSA Mon
    venue: 'Estadio BBVA', city: 'Monterrey' },

  // MD2
  { id: 'F3', group: 'F', matchday: 2,
    homeTeamId: 'ned', awayTeamId: 'swe',
    kickoffUTC: '2026-06-20T17:00:00Z',   // Sat 20 Jun, 1 PM ET → 20:00 KSA
    venue: 'NRG Stadium', city: 'Houston' },

  { id: 'F4', group: 'F', matchday: 2,
    homeTeamId: 'tun', awayTeamId: 'jpn',
    kickoffUTC: '2026-06-21T04:00:00Z',   // Sun 21 Jun, 12 AM ET → 07:00 KSA
    venue: 'Estadio BBVA', city: 'Monterrey' },

  // MD3 (simultaneous)
  { id: 'F5', group: 'F', matchday: 3,
    homeTeamId: 'jpn', awayTeamId: 'swe',
    kickoffUTC: '2026-06-25T23:00:00Z',   // Thu 25 Jun, 7 PM ET → 02:00 KSA Fri
    venue: 'AT&T Stadium', city: 'Dallas' },

  { id: 'F6', group: 'F', matchday: 3,
    homeTeamId: 'tun', awayTeamId: 'ned',
    kickoffUTC: '2026-06-25T23:00:00Z',   // simultaneous
    venue: 'Arrowhead Stadium', city: 'Kansas City' },

  // ══════════════════════════════════════════════════════════════════
  //  GROUP G  — Belgium · Egypt · Iran · New Zealand
  // ══════════════════════════════════════════════════════════════════
  // MD1
  { id: 'G1', group: 'G', matchday: 1,
    homeTeamId: 'bel', awayTeamId: 'egy',
    kickoffUTC: '2026-06-15T19:00:00Z',   // Mon 15 Jun, 3 PM ET → 22:00 KSA
    venue: 'Lumen Field', city: 'Seattle' },

  { id: 'G2', group: 'G', matchday: 1,
    homeTeamId: 'irn', awayTeamId: 'nzl',
    kickoffUTC: '2026-06-16T01:00:00Z',   // Mon 15 Jun, 9 PM ET → 04:00 KSA Tue
    venue: 'SoFi Stadium', city: 'Los Angeles' },

  // MD2
  { id: 'G3', group: 'G', matchday: 2,
    homeTeamId: 'bel', awayTeamId: 'irn',
    kickoffUTC: '2026-06-21T19:00:00Z',   // Sun 21 Jun, 3 PM ET → 22:00 KSA
    venue: 'SoFi Stadium', city: 'Los Angeles' },

  { id: 'G4', group: 'G', matchday: 2,
    homeTeamId: 'nzl', awayTeamId: 'egy',
    kickoffUTC: '2026-06-22T01:00:00Z',   // Sun 21 Jun, 9 PM ET → 04:00 KSA Mon
    venue: 'BC Place', city: 'Vancouver' },

  // MD3 (simultaneous)
  { id: 'G5', group: 'G', matchday: 3,
    homeTeamId: 'egy', awayTeamId: 'irn',
    kickoffUTC: '2026-06-27T03:00:00Z',   // Fri 26 Jun, 11 PM ET → 06:00 KSA Sat
    venue: 'Lumen Field', city: 'Seattle' },

  { id: 'G6', group: 'G', matchday: 3,
    homeTeamId: 'nzl', awayTeamId: 'bel',
    kickoffUTC: '2026-06-27T03:00:00Z',   // simultaneous
    venue: 'BC Place', city: 'Vancouver' },

  // ══════════════════════════════════════════════════════════════════
  //  GROUP H  — Spain · Cape Verde · Saudi Arabia · Uruguay
  // ══════════════════════════════════════════════════════════════════
  // MD1
  { id: 'H1', group: 'H', matchday: 1,
    homeTeamId: 'esp', awayTeamId: 'cpv',
    kickoffUTC: '2026-06-15T16:00:00Z',   // Mon 15 Jun, 12 PM ET → 19:00 KSA
    venue: 'Mercedes-Benz Stadium', city: 'Atlanta' },

  { id: 'H2', group: 'H', matchday: 1,
    homeTeamId: 'ksa', awayTeamId: 'uru',
    kickoffUTC: '2026-06-15T22:00:00Z',   // Mon 15 Jun, 6 PM ET → 01:00 KSA Tue
    venue: 'Hard Rock Stadium', city: 'Miami' },

  // MD2
  { id: 'H3', group: 'H', matchday: 2,
    homeTeamId: 'esp', awayTeamId: 'ksa',
    kickoffUTC: '2026-06-21T16:00:00Z',   // Sun 21 Jun, 12 PM ET → 19:00 KSA
    venue: 'Mercedes-Benz Stadium', city: 'Atlanta' },

  { id: 'H4', group: 'H', matchday: 2,
    homeTeamId: 'uru', awayTeamId: 'cpv',
    kickoffUTC: '2026-06-21T22:00:00Z',   // Sun 21 Jun, 6 PM ET → 01:00 KSA Mon
    venue: 'Hard Rock Stadium', city: 'Miami' },

  // MD3 (simultaneous)
  { id: 'H5', group: 'H', matchday: 3,
    homeTeamId: 'cpv', awayTeamId: 'ksa',
    kickoffUTC: '2026-06-27T00:00:00Z',   // Fri 26 Jun, 8 PM ET → 03:00 KSA Sat
    venue: 'NRG Stadium', city: 'Houston' },

  { id: 'H6', group: 'H', matchday: 3,
    homeTeamId: 'uru', awayTeamId: 'esp',
    kickoffUTC: '2026-06-27T00:00:00Z',   // simultaneous
    venue: 'Estadio Akron', city: 'Guadalajara' },

  // ══════════════════════════════════════════════════════════════════
  //  GROUP I  — France · Senegal · Iraq · Norway
  // ══════════════════════════════════════════════════════════════════
  // MD1
  { id: 'I1', group: 'I', matchday: 1,
    homeTeamId: 'fra', awayTeamId: 'sen',
    kickoffUTC: '2026-06-16T19:00:00Z',   // Tue 16 Jun, 3 PM ET → 22:00 KSA
    venue: 'MetLife Stadium', city: 'New York/New Jersey' },

  { id: 'I2', group: 'I', matchday: 1,
    homeTeamId: 'irq', awayTeamId: 'nor',
    kickoffUTC: '2026-06-16T22:00:00Z',   // Tue 16 Jun, 6 PM ET → 01:00 KSA Wed
    venue: 'Gillette Stadium', city: 'Boston' },

  // MD2
  { id: 'I3', group: 'I', matchday: 2,
    homeTeamId: 'fra', awayTeamId: 'irq',
    kickoffUTC: '2026-06-22T21:00:00Z',   // Mon 22 Jun, 5 PM ET → 00:00 KSA Tue
    venue: 'Lincoln Financial Field', city: 'Philadelphia' },

  { id: 'I4', group: 'I', matchday: 2,
    homeTeamId: 'nor', awayTeamId: 'sen',
    kickoffUTC: '2026-06-23T00:00:00Z',   // Mon 22 Jun, 8 PM ET → 03:00 KSA Tue
    venue: 'MetLife Stadium', city: 'New York/New Jersey' },

  // MD3 (simultaneous)
  { id: 'I5', group: 'I', matchday: 3,
    homeTeamId: 'nor', awayTeamId: 'fra',
    kickoffUTC: '2026-06-26T19:00:00Z',   // Fri 26 Jun, 3 PM ET → 22:00 KSA
    venue: 'Gillette Stadium', city: 'Boston' },

  { id: 'I6', group: 'I', matchday: 3,
    homeTeamId: 'sen', awayTeamId: 'irq',
    kickoffUTC: '2026-06-26T19:00:00Z',   // simultaneous
    venue: 'BMO Field', city: 'Toronto' },

  // ══════════════════════════════════════════════════════════════════
  //  GROUP J  — Argentina · Algeria · Austria · Jordan
  // ══════════════════════════════════════════════════════════════════
  // MD1
  { id: 'J1', group: 'J', matchday: 1,
    homeTeamId: 'arg', awayTeamId: 'alg',
    kickoffUTC: '2026-06-17T01:00:00Z',   // Tue 16 Jun, 9 PM ET → 04:00 KSA Wed
    venue: 'Arrowhead Stadium', city: 'Kansas City' },

  { id: 'J2', group: 'J', matchday: 1,
    homeTeamId: 'aut', awayTeamId: 'jor',
    kickoffUTC: '2026-06-17T04:00:00Z',   // Wed 17 Jun, 12 AM ET → 07:00 KSA
    venue: "Levi's Stadium", city: 'Santa Clara' },

  // MD2
  { id: 'J3', group: 'J', matchday: 2,
    homeTeamId: 'arg', awayTeamId: 'aut',
    kickoffUTC: '2026-06-22T17:00:00Z',   // Mon 22 Jun, 1 PM ET → 20:00 KSA
    venue: 'AT&T Stadium', city: 'Dallas' },

  { id: 'J4', group: 'J', matchday: 2,
    homeTeamId: 'jor', awayTeamId: 'alg',
    kickoffUTC: '2026-06-23T03:00:00Z',   // Mon 22 Jun, 11 PM ET → 06:00 KSA Tue
    venue: "Levi's Stadium", city: 'Santa Clara' },

  // MD3 (simultaneous)
  { id: 'J5', group: 'J', matchday: 3,
    homeTeamId: 'alg', awayTeamId: 'aut',
    kickoffUTC: '2026-06-28T02:00:00Z',   // Sat 27 Jun, 10 PM ET → 05:00 KSA Sun
    venue: 'Arrowhead Stadium', city: 'Kansas City' },

  { id: 'J6', group: 'J', matchday: 3,
    homeTeamId: 'jor', awayTeamId: 'arg',
    kickoffUTC: '2026-06-28T02:00:00Z',   // simultaneous
    venue: 'AT&T Stadium', city: 'Dallas' },

  // ══════════════════════════════════════════════════════════════════
  //  GROUP K  — Portugal · DR Congo · Uzbekistan · Colombia
  // ══════════════════════════════════════════════════════════════════
  // MD1
  { id: 'K1', group: 'K', matchday: 1,
    homeTeamId: 'por', awayTeamId: 'cod',
    kickoffUTC: '2026-06-17T17:00:00Z',   // Wed 17 Jun, 1 PM ET → 20:00 KSA
    venue: 'NRG Stadium', city: 'Houston' },

  { id: 'K2', group: 'K', matchday: 1,
    homeTeamId: 'uzb', awayTeamId: 'col',
    kickoffUTC: '2026-06-18T02:00:00Z',   // Wed 17 Jun, 10 PM ET → 05:00 KSA Thu
    venue: 'Estadio Banorte', city: 'Mexico City' },

  // MD2
  { id: 'K3', group: 'K', matchday: 2,
    homeTeamId: 'por', awayTeamId: 'uzb',
    kickoffUTC: '2026-06-23T17:00:00Z',   // Tue 23 Jun, 1 PM ET → 20:00 KSA
    venue: 'NRG Stadium', city: 'Houston' },

  { id: 'K4', group: 'K', matchday: 2,
    homeTeamId: 'col', awayTeamId: 'cod',
    kickoffUTC: '2026-06-24T02:00:00Z',   // Tue 23 Jun, 10 PM ET → 05:00 KSA Wed
    venue: 'Estadio Akron', city: 'Guadalajara' },

  // MD3 (simultaneous)
  { id: 'K5', group: 'K', matchday: 3,
    homeTeamId: 'col', awayTeamId: 'por',
    kickoffUTC: '2026-06-27T23:30:00Z',   // Sat 27 Jun, 7:30 PM ET → 02:30 KSA Sun
    venue: 'Hard Rock Stadium', city: 'Miami' },

  { id: 'K6', group: 'K', matchday: 3,
    homeTeamId: 'cod', awayTeamId: 'uzb',
    kickoffUTC: '2026-06-27T23:30:00Z',   // simultaneous
    venue: 'Mercedes-Benz Stadium', city: 'Atlanta' },

  // ══════════════════════════════════════════════════════════════════
  //  GROUP L  — England · Croatia · Ghana · Panama
  // ══════════════════════════════════════════════════════════════════
  // MD1
  { id: 'L1', group: 'L', matchday: 1,
    homeTeamId: 'eng', awayTeamId: 'cro',
    kickoffUTC: '2026-06-17T20:00:00Z',   // Wed 17 Jun, 4 PM ET → 23:00 KSA
    venue: 'AT&T Stadium', city: 'Dallas' },

  { id: 'L2', group: 'L', matchday: 1,
    homeTeamId: 'gha', awayTeamId: 'pan',
    kickoffUTC: '2026-06-17T23:00:00Z',   // Wed 17 Jun, 7 PM ET → 02:00 KSA Thu
    venue: 'BMO Field', city: 'Toronto' },

  // MD2
  { id: 'L3', group: 'L', matchday: 2,
    homeTeamId: 'eng', awayTeamId: 'gha',
    kickoffUTC: '2026-06-23T20:00:00Z',   // Tue 23 Jun, 4 PM ET → 23:00 KSA
    venue: 'Gillette Stadium', city: 'Boston' },

  { id: 'L4', group: 'L', matchday: 2,
    homeTeamId: 'pan', awayTeamId: 'cro',
    kickoffUTC: '2026-06-23T23:00:00Z',   // Tue 23 Jun, 7 PM ET → 02:00 KSA Wed
    venue: 'BMO Field', city: 'Toronto' },

  // MD3 (simultaneous)
  { id: 'L5', group: 'L', matchday: 3,
    homeTeamId: 'pan', awayTeamId: 'eng',
    kickoffUTC: '2026-06-27T21:00:00Z',   // Sat 27 Jun, 5 PM ET → 00:00 KSA Sun
    venue: 'MetLife Stadium', city: 'New York/New Jersey' },

  { id: 'L6', group: 'L', matchday: 3,
    homeTeamId: 'cro', awayTeamId: 'gha',
    kickoffUTC: '2026-06-27T21:00:00Z',   // simultaneous
    venue: 'Lincoln Financial Field', city: 'Philadelphia' },
];

export function getMatchesForTeam(teamId: string): Match[] {
  return matches
    .filter(m => m.homeTeamId === teamId || m.awayTeamId === teamId)
    .sort((a, b) => new Date(a.kickoffUTC).getTime() - new Date(b.kickoffUTC).getTime());
}

export function getNextMatchForTeam(teamId: string, now: Date = new Date()): Match | null {
  const teamMatches = getMatchesForTeam(teamId);
  const nowMs = now.getTime();
  const upcoming = teamMatches.find(
    m => new Date(m.kickoffUTC).getTime() + 120 * 60 * 1000 > nowMs
  );
  return upcoming ?? teamMatches[teamMatches.length - 1] ?? null;
}

export function getMatchStatus(
  match: Match,
  now: Date = new Date()
): 'upcoming' | 'live' | 'finished' {
  const kick = new Date(match.kickoffUTC).getTime();
  const nowMs = now.getTime();
  if (nowMs < kick) return 'upcoming';
  if (nowMs < kick + 120 * 60 * 1000) return 'live';
  return 'finished';
}
