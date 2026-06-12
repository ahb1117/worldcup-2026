export interface Team {
  id: string;
  name: string;
  iso2: string;   // flagcdn.com country code
  group: string;
  code: string;
  confederation: string;
}

export const teams: Team[] = [
  // ── Group A ──────────────────────────────────────────────
  { id: 'mex', name: 'Mexico',               iso2: 'mx',     group: 'A', code: 'MEX', confederation: 'CONCACAF' },
  { id: 'rsa', name: 'South Africa',         iso2: 'za',     group: 'A', code: 'RSA', confederation: 'CAF' },
  { id: 'kor', name: 'South Korea',          iso2: 'kr',     group: 'A', code: 'KOR', confederation: 'AFC' },
  { id: 'cze', name: 'Czech Republic',       iso2: 'cz',     group: 'A', code: 'CZE', confederation: 'UEFA' },
  // ── Group B ──────────────────────────────────────────────
  { id: 'can', name: 'Canada',               iso2: 'ca',     group: 'B', code: 'CAN', confederation: 'CONCACAF' },
  { id: 'bih', name: 'Bosnia & Herzegovina', iso2: 'ba',     group: 'B', code: 'BIH', confederation: 'UEFA' },
  { id: 'qat', name: 'Qatar',                iso2: 'qa',     group: 'B', code: 'QAT', confederation: 'AFC' },
  { id: 'sui', name: 'Switzerland',          iso2: 'ch',     group: 'B', code: 'SUI', confederation: 'UEFA' },
  // ── Group C ──────────────────────────────────────────────
  { id: 'bra', name: 'Brazil',               iso2: 'br',     group: 'C', code: 'BRA', confederation: 'CONMEBOL' },
  { id: 'mar', name: 'Morocco',              iso2: 'ma',     group: 'C', code: 'MAR', confederation: 'CAF' },
  { id: 'hai', name: 'Haiti',                iso2: 'ht',     group: 'C', code: 'HAI', confederation: 'CONCACAF' },
  { id: 'sco', name: 'Scotland',             iso2: 'gb-sct', group: 'C', code: 'SCO', confederation: 'UEFA' },
  // ── Group D ──────────────────────────────────────────────
  { id: 'usa', name: 'United States',        iso2: 'us',     group: 'D', code: 'USA', confederation: 'CONCACAF' },
  { id: 'par', name: 'Paraguay',             iso2: 'py',     group: 'D', code: 'PAR', confederation: 'CONMEBOL' },
  { id: 'aus', name: 'Australia',            iso2: 'au',     group: 'D', code: 'AUS', confederation: 'AFC' },
  { id: 'tur', name: 'Türkiye',              iso2: 'tr',     group: 'D', code: 'TUR', confederation: 'UEFA' },
  // ── Group E ──────────────────────────────────────────────
  { id: 'ger', name: 'Germany',              iso2: 'de',     group: 'E', code: 'GER', confederation: 'UEFA' },
  { id: 'cur', name: 'Curaçao',              iso2: 'cw',     group: 'E', code: 'CUR', confederation: 'CONCACAF' },
  { id: 'civ', name: "Côte d'Ivoire",        iso2: 'ci',     group: 'E', code: 'CIV', confederation: 'CAF' },
  { id: 'ecu', name: 'Ecuador',              iso2: 'ec',     group: 'E', code: 'ECU', confederation: 'CONMEBOL' },
  // ── Group F ──────────────────────────────────────────────
  { id: 'ned', name: 'Netherlands',          iso2: 'nl',     group: 'F', code: 'NED', confederation: 'UEFA' },
  { id: 'jpn', name: 'Japan',                iso2: 'jp',     group: 'F', code: 'JPN', confederation: 'AFC' },
  { id: 'swe', name: 'Sweden',               iso2: 'se',     group: 'F', code: 'SWE', confederation: 'UEFA' },
  { id: 'tun', name: 'Tunisia',              iso2: 'tn',     group: 'F', code: 'TUN', confederation: 'CAF' },
  // ── Group G ──────────────────────────────────────────────
  { id: 'bel', name: 'Belgium',              iso2: 'be',     group: 'G', code: 'BEL', confederation: 'UEFA' },
  { id: 'egy', name: 'Egypt',                iso2: 'eg',     group: 'G', code: 'EGY', confederation: 'CAF' },
  { id: 'irn', name: 'Iran',                 iso2: 'ir',     group: 'G', code: 'IRN', confederation: 'AFC' },
  { id: 'nzl', name: 'New Zealand',          iso2: 'nz',     group: 'G', code: 'NZL', confederation: 'OFC' },
  // ── Group H ──────────────────────────────────────────────
  { id: 'esp', name: 'Spain',                iso2: 'es',     group: 'H', code: 'ESP', confederation: 'UEFA' },
  { id: 'cpv', name: 'Cape Verde',           iso2: 'cv',     group: 'H', code: 'CPV', confederation: 'CAF' },
  { id: 'ksa', name: 'Saudi Arabia',         iso2: 'sa',     group: 'H', code: 'KSA', confederation: 'AFC' },
  { id: 'uru', name: 'Uruguay',              iso2: 'uy',     group: 'H', code: 'URU', confederation: 'CONMEBOL' },
  // ── Group I ──────────────────────────────────────────────
  { id: 'fra', name: 'France',               iso2: 'fr',     group: 'I', code: 'FRA', confederation: 'UEFA' },
  { id: 'sen', name: 'Senegal',              iso2: 'sn',     group: 'I', code: 'SEN', confederation: 'CAF' },
  { id: 'irq', name: 'Iraq',                 iso2: 'iq',     group: 'I', code: 'IRQ', confederation: 'AFC' },
  { id: 'nor', name: 'Norway',               iso2: 'no',     group: 'I', code: 'NOR', confederation: 'UEFA' },
  // ── Group J ──────────────────────────────────────────────
  { id: 'arg', name: 'Argentina',            iso2: 'ar',     group: 'J', code: 'ARG', confederation: 'CONMEBOL' },
  { id: 'alg', name: 'Algeria',              iso2: 'dz',     group: 'J', code: 'ALG', confederation: 'CAF' },
  { id: 'aut', name: 'Austria',              iso2: 'at',     group: 'J', code: 'AUT', confederation: 'UEFA' },
  { id: 'jor', name: 'Jordan',               iso2: 'jo',     group: 'J', code: 'JOR', confederation: 'AFC' },
  // ── Group K ──────────────────────────────────────────────
  { id: 'por', name: 'Portugal',             iso2: 'pt',     group: 'K', code: 'POR', confederation: 'UEFA' },
  { id: 'cod', name: 'DR Congo',             iso2: 'cd',     group: 'K', code: 'COD', confederation: 'CAF' },
  { id: 'uzb', name: 'Uzbekistan',           iso2: 'uz',     group: 'K', code: 'UZB', confederation: 'AFC' },
  { id: 'col', name: 'Colombia',             iso2: 'co',     group: 'K', code: 'COL', confederation: 'CONMEBOL' },
  // ── Group L ──────────────────────────────────────────────
  { id: 'eng', name: 'England',              iso2: 'gb-eng', group: 'L', code: 'ENG', confederation: 'UEFA' },
  { id: 'cro', name: 'Croatia',              iso2: 'hr',     group: 'L', code: 'CRO', confederation: 'UEFA' },
  { id: 'gha', name: 'Ghana',                iso2: 'gh',     group: 'L', code: 'GHA', confederation: 'CAF' },
  { id: 'pan', name: 'Panama',               iso2: 'pa',     group: 'L', code: 'PAN', confederation: 'CONCACAF' },
];

export const flagUrl = (iso2: string, size: 80 | 160 = 80) =>
  `https://flagcdn.com/w${size}/${iso2}.png`;

export const getTeamById = (id: string) => teams.find(t => t.id === id);
export const teamsByGroup = teams.reduce((acc, team) => {
  if (!acc[team.group]) acc[team.group] = [];
  acc[team.group].push(team);
  return acc;
}, {} as Record<string, Team[]>);
