'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { teams, flagUrl } from '@/data/teams';
import { matches, getNextMatchForTeam, getMatchesForTeam, getMatchStatus } from '@/data/schedule';
import type { Match } from '@/data/schedule';
import type { Team } from '@/data/teams';
import { formatKSADate, formatKSADateShort, formatKSATime, getCurrentKSATime, getCountdown, pad } from '@/lib/utils';

/* ─────────────── Reusable flag image ─────────────── */
function FlagImg({
  iso2,
  name,
  size = 'md',
  className = '',
}: {
  iso2: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}) {
  const dims: Record<string, { w: number; h: number; cls: string }> = {
    sm:  { w: 40,  h: 27,  cls: 'w-10 h-7' },
    md:  { w: 56,  h: 38,  cls: 'w-14 h-10' },
    lg:  { w: 80,  h: 54,  cls: 'w-20 h-14' },
    xl:  { w: 120, h: 81,  cls: 'w-28 sm:w-32 h-auto' },
  };
  const { w, h, cls } = dims[size];
  return (
    <Image
      src={flagUrl(iso2, w >= 80 ? 160 : 80)}
      alt={name}
      width={w}
      height={h}
      className={`${cls} rounded shadow-sm object-cover ${className}`}
      unoptimized
    />
  );
}

/* ─────────────── Countdown ─────────────── */
function Countdown({ kickoffUTC, now }: { kickoffUTC: string; now: Date }) {
  const cd = getCountdown(kickoffUTC, now);
  if (!cd) return null;
  return (
    <div className="flex items-center gap-2 justify-center mt-4">
      {[
        { label: 'DAYS', value: cd.days },
        { label: 'HRS',  value: cd.hours },
        { label: 'MIN',  value: cd.minutes },
        { label: 'SEC',  value: cd.seconds },
      ].map(({ label, value }) => (
        <div key={label} className="np-countdown-digit flex flex-col items-center">
          <span className="text-2xl font-bold text-np-primary font-mono leading-none">{pad(value)}</span>
          <span className="text-[9px] text-np-primary/60 mt-1 font-semibold tracking-wider">{label}</span>
        </div>
      ))}
    </div>
  );
}

/* ─────────────── Match card ─────────────── */
function MatchCard({ match, now, highlightTeamId }: { match: Match; now: Date; highlightTeamId: string }) {
  const homeTeam = teams.find(t => t.id === match.homeTeamId)!;
  const awayTeam = teams.find(t => t.id === match.awayTeamId)!;
  const status = getMatchStatus(match, now);

  return (
    <div className="np-card rounded-2xl p-6 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="np-group-badge">GROUP {match.group}</span>
          <span className="text-xs text-np-fg-4">MD {match.matchday}</span>
        </div>
        {status === 'live' && (
          <span className="np-badge-live text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            LIVE
          </span>
        )}
        {status === 'finished' && (
          <span className="text-[10px] font-semibold text-np-fg-3 px-3 py-1 rounded-full bg-np-surface-sunken border border-np-border">
            FULL TIME
          </span>
        )}
        {status === 'upcoming' && (
          <span className="text-[10px] font-semibold text-np-gold px-3 py-1 rounded-full bg-np-teal-50 border border-np-teal-100">
            UPCOMING
          </span>
        )}
      </div>

      {/* Teams */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 mb-5">
        {/* Home */}
        <div className={`flex flex-col items-center gap-3 transition-all duration-300 ${match.homeTeamId === highlightTeamId ? 'scale-105' : 'opacity-80'}`}>
          <FlagImg iso2={homeTeam.iso2} name={homeTeam.name} size="xl" className="drop-shadow-md" />
          <span className="font-bold font-display text-sm sm:text-base text-center text-np-secondary leading-tight">{homeTeam.name}</span>
          {status === 'finished' && match.homeScore !== undefined && (
            <span className="text-3xl font-black text-np-secondary font-mono">{match.homeScore}</span>
          )}
        </div>

        {/* VS */}
        <div className="rounded-xl px-4 py-3 flex flex-col items-center gap-1 min-w-[72px] bg-np-surface-sunken border border-np-border">
          {status === 'finished' && match.homeScore !== undefined && match.awayScore !== undefined ? (
            <span className="text-xl font-black text-np-secondary font-mono">{match.homeScore} – {match.awayScore}</span>
          ) : (
            <span className="text-lg font-black text-np-primary/70">VS</span>
          )}
          {status === 'live' && <span className="text-[10px] text-np-danger font-bold animate-pulse">⚡ LIVE</span>}
        </div>

        {/* Away */}
        <div className={`flex flex-col items-center gap-3 transition-all duration-300 ${match.awayTeamId === highlightTeamId ? 'scale-105' : 'opacity-80'}`}>
          <FlagImg iso2={awayTeam.iso2} name={awayTeam.name} size="xl" className="drop-shadow-md" />
          <span className="font-bold font-display text-sm sm:text-base text-center text-np-secondary leading-tight">{awayTeam.name}</span>
          {status === 'finished' && match.awayScore !== undefined && (
            <span className="text-3xl font-black text-np-secondary font-mono">{match.awayScore}</span>
          )}
        </div>
      </div>

      {/* Time & Venue */}
      <div className="border-t border-np-border pt-4 space-y-3">
        <div className="flex items-center justify-center gap-2">
          <div className="text-center">
            <div className="text-np-primary font-bold text-xl font-mono">{formatKSATime(match.kickoffUTC)}</div>
            <div className="text-np-fg-3 text-xs mt-0.5">{formatKSADate(match.kickoffUTC)}</div>
          </div>
          <span className="text-xs text-np-teal-700 font-semibold bg-np-teal-50 px-2 py-0.5 rounded-full border border-np-teal-100">KSA</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-np-fg-3 text-xs">
          <span>📍</span>
          <span>{match.venue}</span>
          <span>·</span>
          <span>{match.city}</span>
        </div>
        {status === 'upcoming' && <Countdown kickoffUTC={match.kickoffUTC} now={now} />}
      </div>
    </div>
  );
}

/* ─────────────── All matches list ─────────────── */
function AllMatchesList({ teamId, now }: { teamId: string; now: Date }) {
  const allMatches = getMatchesForTeam(teamId);
  return (
    <div className="space-y-3">
      {allMatches.map(m => {
        const status = getMatchStatus(m, now);
        const homeTeam = teams.find(t => t.id === m.homeTeamId)!;
        const awayTeam = teams.find(t => t.id === m.awayTeamId)!;
        return (
          <div
            key={m.id}
            className={`np-card rounded-xl px-4 py-3 flex items-center justify-between gap-3 text-sm ${status === 'live' ? '!border-np-danger/40' : ''}`}
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <FlagImg iso2={homeTeam.iso2} name={homeTeam.name} size="sm" />
              <span className="text-np-fg-2 truncate text-xs font-medium">{homeTeam.name}</span>
            </div>
            <div className="flex flex-col items-center gap-0.5 shrink-0 px-2">
              {status === 'finished' && m.homeScore !== undefined ? (
                <span className="font-black text-np-secondary font-mono">{m.homeScore}–{m.awayScore}</span>
              ) : (
                <span className="font-bold text-np-primary text-xs whitespace-nowrap font-mono">{formatKSATime(m.kickoffUTC)}</span>
              )}
              <span className="text-[9px] text-np-fg-4 whitespace-nowrap">{formatKSADateShort(m.kickoffUTC)}</span>
              {status === 'live' && (
                <span className="np-badge-live text-[9px] font-bold px-2 py-0.5 rounded-full text-white mt-0.5">LIVE</span>
              )}
            </div>
            <div className="flex items-center gap-3 min-w-0 flex-1 justify-end">
              <span className="text-np-fg-2 truncate text-xs font-medium text-right">{awayTeam.name}</span>
              <FlagImg iso2={awayTeam.iso2} name={awayTeam.name} size="sm" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────── Team button ─────────────── */
function TeamButton({ team, selected, onClick }: { team: Team; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`
        relative np-card rounded-2xl p-2.5 flex flex-col items-center gap-1.5
        cursor-pointer group transition-all duration-200 text-center w-full
        ${selected ? 'np-card-selected' : 'hover:scale-105'}
      `}
      title={team.name}
    >
      {selected && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-np-primary rounded-full flex items-center justify-center z-10">
          <span className="text-[8px] font-black text-white">✓</span>
        </div>
      )}

      <div className="group-hover:scale-105 transition-transform duration-200 drop-shadow-sm">
        <FlagImg iso2={team.iso2} name={team.name} size="md" />
      </div>

      <span className={`text-[9px] font-semibold leading-tight line-clamp-2 max-w-full px-0.5 ${selected ? 'text-np-primary' : 'text-np-fg-2 group-hover:text-np-secondary'}`}>
        {team.name}
      </span>

      <span className="np-group-badge">{team.group}</span>
    </button>
  );
}

/* ─────────────── Group standings ─────────────── */
interface StandingRow {
  teamId: string;
  P: number; W: number; D: number; L: number;
  GF: number; GA: number; GD: number; Pts: number;
}

function computeStandings(group: string): StandingRow[] {
  const groupTeams = teams.filter(t => t.group === group);
  const rows = Object.fromEntries(
    groupTeams.map(t => [t.id, { teamId: t.id, P: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, Pts: 0 }])
  );
  for (const m of matches) {
    if (m.group !== group || m.homeScore === undefined || m.awayScore === undefined) continue;
    const h = rows[m.homeTeamId];
    const a = rows[m.awayTeamId];
    if (!h || !a) continue;
    const hs = m.homeScore, as_ = m.awayScore;
    h.P++; a.P++;
    h.GF += hs; h.GA += as_;
    a.GF += as_; a.GA += hs;
    if (hs > as_)       { h.W++; h.Pts += 3; a.L++; }
    else if (hs < as_)  { a.W++; a.Pts += 3; h.L++; }
    else                { h.D++; h.Pts++;     a.D++; a.Pts++; }
  }
  return Object.values(rows)
    .map(r => ({ ...r, GD: r.GF - r.GA }))
    .sort((a, b) => b.Pts - a.Pts || b.GD - a.GD || b.GF - a.GF);
}

const ESPN_TO_FIFA: Record<string, string> = {
  CUW: 'CUR',
};

/* eslint-disable @typescript-eslint/no-explicit-any */
function transformESPN(data: any): Record<string, StandingRow[]> {
  const result: Record<string, StandingRow[]> = {};
  for (const grp of data.children ?? []) {
    const letter: string = (grp.name as string ?? '').split(' ').pop() ?? '';
    if (!letter || letter.length !== 1) continue;
    const sv = (entry: any, name: string): number =>
      entry.stats?.find((s: any) => s.name === name)?.value ?? 0;
    result[letter] = (grp.standings?.entries ?? []).map((entry: any) => {
      const espnCode: string = entry.team?.abbreviation ?? '';
      const fifaCode = ESPN_TO_FIFA[espnCode] ?? espnCode;
      const team = teams.find(t => t.code === fifaCode);
      const GF = sv(entry, 'pointsFor');
      const GA = sv(entry, 'pointsAgainst');
      return {
        teamId: team?.id ?? fifaCode.toLowerCase(),
        P:   sv(entry, 'gamesPlayed'),
        W:   sv(entry, 'wins'),
        D:   sv(entry, 'ties'),
        L:   sv(entry, 'losses'),
        GF, GA,
        GD:  sv(entry, 'pointDifferential'),
        Pts: sv(entry, 'points'),
      } satisfies StandingRow;
    });
  }
  return result;
}

function transformFDO(data: any): Record<string, StandingRow[]> {
  const result: Record<string, StandingRow[]> = {};
  for (const standing of data.standings ?? []) {
    if (standing.type !== 'TOTAL') continue;
    const group: string = (standing.group as string)?.replace('GROUP_', '');
    if (!group) continue;
    result[group] = standing.table.map((entry: any) => {
      const team = teams.find(t => t.code === entry.team.tla);
      return {
        teamId: team?.id ?? entry.team.tla.toLowerCase(),
        P: entry.playedGames, W: entry.won, D: entry.draw, L: entry.lost,
        GF: entry.goalsFor, GA: entry.goalsAgainst, GD: entry.goalDifference,
        Pts: entry.points,
      } satisfies StandingRow;
    });
  }
  return result;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

function GroupStandingsTable({ group, liveRows }: { group: string; liveRows?: StandingRow[] }) {
  const rows = liveRows ?? computeStandings(group);
  const isLive = !!liveRows;
  return (
    <div className="np-card rounded-2xl overflow-hidden animate-slide-up">
      <div className="px-4 py-3 border-b border-np-border flex items-center gap-2 bg-np-surface">
        <span className="np-group-badge">GROUP {group}</span>
        <span className="text-np-fg-3 text-xs font-medium">Standings</span>
        {isLive && (
          <span className="ml-auto flex items-center gap-1 text-[10px] text-np-success font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-np-success animate-pulse" />
            LIVE DATA
          </span>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-np-fg-4 text-[10px] uppercase tracking-wider bg-np-surface-sunken">
              <th className="text-left px-4 py-2 font-semibold">#</th>
              <th className="text-left px-4 py-2 font-semibold">Team</th>
              <th className="px-3 py-2 font-semibold">P</th>
              <th className="px-3 py-2 font-semibold">W</th>
              <th className="px-3 py-2 font-semibold">D</th>
              <th className="px-3 py-2 font-semibold">L</th>
              <th className="px-3 py-2 font-semibold">GF</th>
              <th className="px-3 py-2 font-semibold">GA</th>
              <th className="px-3 py-2 font-semibold">GD</th>
              <th className="px-3 py-2 font-semibold text-np-gold">Pts</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const team = teams.find(t => t.id === row.teamId)!;
              return (
                <tr
                  key={row.teamId}
                  className={`border-t border-np-border hover:bg-np-teal-50 transition-colors ${i < 2 ? 'border-l-2 border-l-np-primary' : ''}`}
                >
                  <td className="px-4 py-2.5 text-np-fg-4 font-bold font-mono">{i + 1}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <FlagImg iso2={team.iso2} name={team.name} size="sm" />
                      <span className="text-np-fg-1 font-medium">{team.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-center text-np-fg-3 font-mono">{row.P}</td>
                  <td className="px-3 py-2.5 text-center text-np-fg-3 font-mono">{row.W}</td>
                  <td className="px-3 py-2.5 text-center text-np-fg-3 font-mono">{row.D}</td>
                  <td className="px-3 py-2.5 text-center text-np-fg-3 font-mono">{row.L}</td>
                  <td className="px-3 py-2.5 text-center text-np-fg-3 font-mono">{row.GF}</td>
                  <td className="px-3 py-2.5 text-center text-np-fg-3 font-mono">{row.GA}</td>
                  <td className={`px-3 py-2.5 text-center font-semibold font-mono ${row.GD > 0 ? 'text-np-success' : row.GD < 0 ? 'text-np-danger' : 'text-np-fg-4'}`}>
                    {row.GD > 0 ? '+' : ''}{row.GD}
                  </td>
                  <td className="px-3 py-2.5 text-center font-black text-np-primary font-mono">{row.Pts}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2 border-t border-np-border flex items-center gap-2 bg-np-surface-sunken">
        <div className="w-3 h-[2px] bg-np-primary/60 rounded" />
        <span className="text-[10px] text-np-fg-4">Top 2 advance · Best 3rd-place teams also advance</span>
      </div>
    </div>
  );
}

/* ─────────────── Main page ─────────────── */
export default function Home() {
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [now, setNow] = useState<Date>(() => new Date());
  const [ksaTime, setKsaTime] = useState('');
  const [activeTab, setActiveTab] = useState<'match' | 'all' | 'standings'>('match');
  const [filterGroup, setFilterGroup] = useState<string>('ALL');

  useEffect(() => {
    const tick = () => { setNow(new Date()); setKsaTime(getCurrentKSATime()); };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const groups = ['ALL', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

  const filteredTeams = useMemo(() => teams
    .filter(t => {
      const matchesSearch = !search ||
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.code.toLowerCase().includes(search.toLowerCase());
      return matchesSearch && (filterGroup === 'ALL' || t.group === filterGroup);
    })
    .sort((a, b) => a.name.localeCompare(b.name)),
  [search, filterGroup]);

  const [liveStandings, setLiveStandings] = useState<Record<string, StandingRow[]> | null>(null);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const res = await fetch('/api/standings');
        if (!res.ok) return;
        const { source, data, error } = await res.json();
        if (error) return;
        setLiveStandings(source === 'espn' ? transformESPN(data) : transformFDO(data));
      } catch {}
    };
    fetchStandings();
    const id = setInterval(fetchStandings, 60_000);
    return () => clearInterval(id);
  }, []);

  const featuredMatches = useMemo(() => {
    const sorted = [...matches].sort((a, b) => new Date(a.kickoffUTC).getTime() - new Date(b.kickoffUTC).getTime());
    const live = sorted.filter(m => getMatchStatus(m, now) === 'live');
    const upcoming = sorted.filter(m => getMatchStatus(m, now) === 'upcoming');
    const combined = [...live, ...upcoming].slice(0, 3);
    if (combined.length > 0) return combined;
    return sorted.slice(-3).reverse();
  }, [now]);

  const selectedTeam = selectedTeamId ? teams.find(t => t.id === selectedTeamId) : null;
  const nextMatch = selectedTeamId ? getNextMatchForTeam(selectedTeamId, now) : null;

  const handleTeamClick = useCallback((id: string) => {
    setSelectedTeamId(prev => {
      const next = prev === id ? null : id;
      if (next) window.scrollTo({ top: 0, behavior: 'smooth' });
      return next;
    });
    setActiveTab('match');
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-np-canvas">

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 sm:px-6">

        {/* ── HERO ── */}
        <header className="text-center mb-10 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="trophy-pulse text-4xl">🏆</span>
            <div>
              <div className="text-xs font-semibold tracking-[0.3em] text-np-primary uppercase mb-1">FIFA</div>
              <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight leading-none">
                <span className="shimmer-gold">WORLD CUP</span>{' '}
                <span className="text-np-secondary">2026</span>
              </h1>
            </div>
            <span className="trophy-pulse text-4xl">🏆</span>
          </div>

          <p className="text-np-fg-3 text-sm sm:text-base mt-3 font-medium">
            Pick your nation&apos;s flag · See the next match in{' '}
            <span className="text-np-gold font-semibold">KSA time</span>
          </p>

          {/* Live KSA clock */}
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-np-surface border border-np-border" style={{ boxShadow: 'var(--np-shadow-sm)' }}>
            <FlagImg iso2="sa" name="Saudi Arabia" size="sm" />
            <span className="text-np-primary font-mono font-bold text-base">{ksaTime}</span>
            <span className="text-np-fg-3 text-xs">KSA (UTC+3)</span>
          </div>

          {/* Host flags */}
          <div className="flex items-center justify-center gap-3 mt-4 text-np-fg-4 text-xs">
            <FlagImg iso2="us" name="USA" size="sm" />
            <FlagImg iso2="ca" name="Canada" size="sm" />
            <FlagImg iso2="mx" name="Mexico" size="sm" />
            <span>USA · Canada · Mexico · Jun 11 – Jul 19, 2026</span>
          </div>
        </header>

        {/* ── FEATURED MATCHES (earliest 3) ── */}
        {featuredMatches.length > 0 && !selectedTeam && (
          <div className="mb-8 animate-slide-up">
            <div className="flex items-center gap-2 mb-3">
              {featuredMatches.some(m => getMatchStatus(m, now) === 'live') ? (
                <span className="np-badge-live text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  LIVE NOW
                </span>
              ) : getMatchStatus(featuredMatches[0], now) === 'upcoming' ? (
                <span className="text-xs font-semibold tracking-widest text-np-secondary/70 uppercase font-display">⚡ Next Matches in KSA</span>
              ) : (
                <span className="text-xs font-semibold tracking-widest text-np-fg-4 uppercase">Last Matches</span>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featuredMatches.map(m => (
                <MatchCard key={m.id} match={m} now={now} highlightTeamId="" />
              ))}
            </div>
          </div>
        )}

        {/* ── SELECTED TEAM PANEL ── */}
        {selectedTeam && nextMatch && (
          <div className="mb-8 animate-slide-up">
            <div className="flex items-center gap-3 mb-4">
              <FlagImg iso2={selectedTeam.iso2} name={selectedTeam.name} size="sm" />
              <div>
                <h2 className="font-bold font-display text-lg text-np-secondary">{selectedTeam.name}</h2>
                <p className="text-np-fg-3 text-xs">Group {selectedTeam.group} · {selectedTeam.confederation}</p>
              </div>
              <div className="ml-auto flex gap-1.5">
                {(['match', 'all', 'standings'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-xs px-3 py-1.5 rounded-full transition-all font-medium ${
                      activeTab === tab
                        ? 'bg-np-primary text-white font-semibold'
                        : 'text-np-fg-3 hover:text-np-secondary border border-np-border hover:border-np-border-strong bg-np-surface'
                    }`}
                  >
                    {tab === 'match' ? 'Next Match' : tab === 'all' ? 'All Matches' : 'Standings'}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === 'all'
              ? <AllMatchesList teamId={selectedTeam.id} now={now} />
              : activeTab === 'standings'
              ? <GroupStandingsTable group={selectedTeam.group} liveRows={liveStandings?.[selectedTeam.group]} />
              : <MatchCard match={nextMatch} now={now} highlightTeamId={selectedTeam.id} />
            }
          </div>
        )}

        {/* ── SEARCH & GROUP FILTER ── */}
        <div className="space-y-3 mb-6">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-np-fg-4 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search teams…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-np-surface border border-np-border rounded-xl text-np-fg-1 placeholder-np-fg-4 focus:outline-none focus:border-np-primary focus:ring-2 focus:ring-np-primary/10 transition-all text-sm"
              style={{ boxShadow: 'var(--np-shadow-xs)' }}
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {groups.map(g => (
              <button
                key={g}
                onClick={() => setFilterGroup(g)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-150 ${
                  filterGroup === g
                    ? 'bg-np-primary text-white'
                    : 'bg-np-surface text-np-fg-3 hover:bg-np-teal-50 hover:text-np-secondary border border-np-border'
                }`}
              >
                {g === 'ALL' ? 'All Groups' : `Group ${g}`}
              </button>
            ))}
          </div>
        </div>

        {/* ── GROUP STANDINGS (when group filter active) ── */}
        {filterGroup !== 'ALL' && !selectedTeam && (
          <div className="mb-6">
            <GroupStandingsTable group={filterGroup} liveRows={liveStandings?.[filterGroup]} />
          </div>
        )}

        {/* ── TEAM GRID ── */}
        <section>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2">
            {filteredTeams.map(team => (
              <TeamButton
                key={team.id}
                team={team}
                selected={selectedTeamId === team.id}
                onClick={() => handleTeamClick(team.id)}
              />
            ))}
          </div>

          {filteredTeams.length === 0 && (
            <div className="text-center py-16 text-np-fg-4">
              <span className="text-4xl block mb-3">⚽</span>
              No teams found for &ldquo;{search}&rdquo;
            </div>
          )}
        </section>

        {!selectedTeamId && (
          <div className="text-center mt-12 animate-fade-in">
            <span className="text-5xl block mb-4 animate-float inline-block">⚽</span>
            <p className="text-np-fg-4 text-sm">Select a team flag above to see their match schedule</p>
          </div>
        )}

        <footer className="mt-16 text-center text-np-fg-4 text-xs pb-6 space-y-1 opacity-60">
          <p>FIFA World Cup 2026 · USA · Canada · Mexico</p>
          <p>All times displayed in Kingdom of Saudi Arabia time (UTC+3)</p>
        </footer>
      </div>
    </div>
  );
}
