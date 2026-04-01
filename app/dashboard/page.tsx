'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plane,
  CheckCircle,
  Clock,
  XCircle,
  Users,
  ChevronRight,
  Bot,
} from 'lucide-react';
import Link from 'next/link';
import { flights as initialFlights, getFlightStats, type Flight } from '@/lib/mock-data/flights';
import { AIRLINES, CITIES, type FlightStatus } from '@/lib/constants';
import StatusBadge from '@/components/shared/StatusBadge';
import AnimatedCounter from '@/components/shared/AnimatedCounter';
import { cn } from '@/lib/utils';

// ─── Clock ───────────────────────────────────────────────────────────────────
function LiveClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return <span className="text-[#64748B] font-mono text-sm">--:--:--</span>;

  const yyyy = now.getFullYear();
  const mm = now.getMonth() + 1;
  const dd = now.getDate();
  const hh = String(now.getHours()).padStart(2, '0');
  const mi = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');

  return (
    <span className="font-mono text-sm text-[#94A3B8]">
      {yyyy}년 {mm}월 {dd}일&nbsp;
      <span className="text-[#00B4D8] font-semibold">{hh}:{mi}:{ss}</span>
    </span>
  );
}

// ─── LIVE badge ───────────────────────────────────────────────────────────────
function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EF4444]/15 px-3 py-1 text-xs font-bold text-[#EF4444] border border-[#EF4444]/30">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EF4444]" />
      </span>
      LIVE
    </span>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
  delay?: number;
}

function StatCard({ label, value, icon, color, glowColor, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative rounded-xl border border-[#1E293B] bg-[#111827] p-5 overflow-hidden"
      style={{ boxShadow: `0 0 24px ${glowColor}` }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-[#64748B] mb-1">{label}</p>
          <p className="text-3xl font-bold font-mono" style={{ color }}>
            <AnimatedCounter end={value} duration={1.2} />
          </p>
        </div>
        <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}20` }}>
          <div style={{ color }}>{icon}</div>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 h-0.5 w-full opacity-40"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />
    </motion.div>
  );
}

// ─── Filter tabs ──────────────────────────────────────────────────────────────
const FILTER_TABS: { label: string; value: FlightStatus | 'all' }[] = [
  { label: '전체', value: 'all' },
  { label: '정상', value: 'normal' },
  { label: '지연', value: 'delayed' },
  { label: '결항', value: 'cancelled' },
  { label: '탑승중', value: 'boarding' },
];

// ─── Row colors ───────────────────────────────────────────────────────────────
function rowBorderColor(status: FlightStatus) {
  if (status === 'delayed') return '#F59E0B';
  if (status === 'cancelled') return '#EF4444';
  return 'transparent';
}

// ─── Flight Row ───────────────────────────────────────────────────────────────
function FlightRow({
  flight,
  index,
  animated,
}: {
  flight: Flight;
  index: number;
  animated: boolean;
}) {
  const [showBanner, setShowBanner] = useState(false);
  const isActionable = flight.status === 'delayed' || flight.status === 'cancelled';
  const airline = AIRLINES[flight.airline];
  const city = CITIES[flight.destination];

  return (
    <motion.tr
      key={flight.id}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className={cn(
        'border-b border-[#1E293B]/60 transition-colors duration-150 cursor-default',
        isActionable
          ? 'hover:bg-[#1E293B]/60 cursor-pointer'
          : 'hover:bg-[#1E293B]/30'
      )}
      style={{
        borderLeft: `3px solid ${rowBorderColor(flight.status)}`,
      }}
      onClick={() => isActionable && setShowBanner(v => !v)}
    >
      <td className="px-4 py-3">
        <span
          className={cn('font-mono font-bold text-sm tracking-wider', animated && 'flip-animation')}
          style={{ color: '#E2E8F0' }}
        >
          {flight.flightNo}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className="text-sm text-[#94A3B8]">{airline?.name ?? flight.airline}</span>
      </td>
      <td className="px-4 py-3">
        <span className="text-sm font-medium text-[#E2E8F0]">{city?.nameKo ?? flight.destination}</span>
        <span className="ml-1.5 text-xs text-[#64748B]">{flight.destination}</span>
      </td>
      <td className="px-4 py-3 font-mono text-sm text-[#94A3B8]">{flight.scheduledTime}</td>
      <td className="px-4 py-3 font-mono text-sm">
        {flight.estimatedTime ? (
          <span className="text-[#F59E0B] font-semibold">{flight.estimatedTime}</span>
        ) : (
          <span className="text-[#64748B]">—</span>
        )}
      </td>
      <td className="px-4 py-3">
        <span className="font-mono text-sm text-[#00B4D8] font-semibold">{flight.gate}</span>
      </td>
      <td className="px-4 py-3">
        <span
          className={cn(
            'inline-flex items-center justify-center rounded px-2 py-0.5 text-xs font-bold font-mono',
            flight.terminal === 'T1'
              ? 'bg-[#0047AB]/20 text-[#60A5FA]'
              : 'bg-[#00B4D8]/20 text-[#00B4D8]'
          )}
        >
          {flight.terminal}
        </span>
      </td>
      <td className="px-4 py-3">
        <StatusBadge status={flight.status} delayMinutes={flight.delayMinutes} />
      </td>
      {isActionable && (
        <td className="px-2 py-3 w-6">
          <ChevronRight
            size={14}
            className={cn(
              'text-[#64748B] transition-transform',
              showBanner && 'rotate-90'
            )}
          />
        </td>
      )}

      {/* AI Banner — renders as full-width row below */}
      <AnimatePresence>
        {showBanner && isActionable && (
          <td colSpan={9} className="p-0">
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mx-4 my-2 flex items-center justify-between rounded-lg border border-[#00B4D8]/30 bg-[#00B4D8]/5 px-4 py-3">
                <div className="flex items-center gap-3">
                  <Bot size={18} className="text-[#00B4D8] shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-[#00B4D8]">에이전틱 AI 작동 중...</p>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      {flight.flightNo} 항공편 자율 복구 시나리오를 실행하고 있습니다.
                      {flight.delayReason && ` (원인: ${flight.delayReason})`}
                    </p>
                  </div>
                </div>
                <Link
                  href="/demo"
                  onClick={e => e.stopPropagation()}
                  className="shrink-0 rounded-lg bg-[#00B4D8] px-4 py-1.5 text-xs font-semibold text-[#0B1120] hover:bg-[#00C8F0] transition-colors"
                >
                  AI 데모 보기
                </Link>
              </div>
            </motion.div>
          </td>
        )}
      </AnimatePresence>
    </motion.tr>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [filter, setFilter] = useState<FlightStatus | 'all'>('all');
  const [flightList, setFlightList] = useState<Flight[]>(initialFlights);
  const [animatedIds, setAnimatedIds] = useState<Set<string>>(new Set());

  // Sort: delayed/cancelled first, then by scheduledTime
  const sorted = [...flightList].sort((a, b) => {
    const priority = { cancelled: 0, delayed: 1, boarding: 2, normal: 3 };
    if (priority[a.status] !== priority[b.status]) return priority[a.status] - priority[b.status];
    return a.scheduledTime.localeCompare(b.scheduledTime);
  });

  const filtered =
    filter === 'all' ? sorted : sorted.filter(f => f.status === filter);

  const stats = getFlightStats(flightList);

  // Auto-update simulation: every 30s, randomly mutate 1-2 flights
  const simulate = useCallback(() => {
    const statuses: FlightStatus[] = ['normal', 'delayed', 'cancelled', 'boarding'];
    const indices = [...Array(flightList.length).keys()]
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);

    setFlightList(prev => {
      const next = [...prev];
      const changed: string[] = [];
      indices.forEach(i => {
        const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
        if (next[i].status !== newStatus) {
          next[i] = { ...next[i], status: newStatus };
          changed.push(next[i].id);
        }
      });
      setAnimatedIds(new Set(changed));
      setTimeout(() => setAnimatedIds(new Set()), 700);
      return next;
    });
  }, [flightList.length]);

  useEffect(() => {
    const id = setInterval(simulate, 30_000);
    return () => clearInterval(id);
  }, [simulate]);

  return (
    <div className="min-h-screen bg-[#0B1120] bg-grid text-[#E2E8F0]">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-30 border-b border-[#1E293B] bg-[#0B1120]/90 backdrop-blur-md"
      >
        <div className="mx-auto max-w-screen-xl px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Plane size={22} className="text-[#0047AB]" />
            <h1 className="text-xl font-bold tracking-tight">실시간 운항 현황</h1>
            <LiveBadge />
          </div>
          <LiveClock />
        </div>
      </motion.div>

      <div className="mx-auto max-w-screen-xl px-6 py-8 space-y-8">
        {/* ── Stats Row ── */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          <StatCard
            label="전체 항공편"
            value={stats.total}
            icon={<Plane size={20} />}
            color="#00B4D8"
            glowColor="rgba(0,180,216,0.12)"
            delay={0}
          />
          <StatCard
            label="정상 운항"
            value={stats.normal}
            icon={<CheckCircle size={20} />}
            color="#10B981"
            glowColor="rgba(16,185,129,0.12)"
            delay={0.05}
          />
          <StatCard
            label="지연"
            value={stats.delayed}
            icon={<Clock size={20} />}
            color="#F59E0B"
            glowColor="rgba(245,158,11,0.12)"
            delay={0.1}
          />
          <StatCard
            label="결항"
            value={stats.cancelled}
            icon={<XCircle size={20} />}
            color="#EF4444"
            glowColor="rgba(239,68,68,0.12)"
            delay={0.15}
          />
          {/* Accent: affected passengers */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative col-span-2 lg:col-span-1 rounded-xl border border-[#00B4D8]/30 bg-[#111827] p-5 overflow-hidden"
            style={{ boxShadow: '0 0 24px rgba(0,180,216,0.15)' }}
          >
            <p className="text-xs text-[#64748B] mb-1">영향 여객</p>
            <p className="text-3xl font-bold font-mono text-[#00B4D8]">
              <AnimatedCounter end={stats.affectedPassengers} duration={1.5} suffix="명" />
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Users size={12} className="text-[#64748B]" />
              <span className="text-xs text-[#64748B]">지연·결항 영향</span>
            </div>
            <div className="absolute bottom-0 left-0 h-0.5 w-full opacity-50"
              style={{ background: 'linear-gradient(90deg, transparent, #00B4D8, transparent)' }} />
          </motion.div>
        </div>

        {/* ── Filter Tabs ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex items-center gap-2 flex-wrap"
        >
          {FILTER_TABS.map(tab => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200',
                filter === tab.value
                  ? 'bg-[#0047AB] text-white shadow-[0_0_12px_rgba(0,71,171,0.5)]'
                  : 'border border-[#1E293B] text-[#94A3B8] hover:border-[#0047AB]/50 hover:text-[#E2E8F0]'
              )}
            >
              {tab.label}
              {tab.value !== 'all' && (
                <span className="ml-1.5 font-mono text-xs opacity-70">
                  {tab.value === 'normal' && stats.normal}
                  {tab.value === 'delayed' && stats.delayed}
                  {tab.value === 'cancelled' && stats.cancelled}
                  {tab.value === 'boarding' && stats.boarding}
                </span>
              )}
            </button>
          ))}
          <span className="ml-auto text-xs text-[#64748B]">
            {filtered.length}편 표시 중
          </span>
        </motion.div>

        {/* ── Flight Board ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="rounded-xl border border-[#1E293B] overflow-hidden"
          style={{ background: '#0A0E1A' }}
        >
          {/* Board header */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-[#1E293B] bg-[#0D1117]">
            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-widest">
              출발편 안내 — Departure Information
            </span>
            <span className="text-xs text-[#64748B] font-mono">
              ICN → WORLDWIDE
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse">
              <thead>
                <tr className="border-b border-[#1E293B] text-left">
                  {['편명', '항공사', '목적지', '예정시각', '변경시각', '게이트', '터미널', '상태'].map(h => (
                    <th
                      key={h}
                      className="px-4 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wider whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                  <th className="w-6" />
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filtered.map((flight, i) => (
                    <FlightRow
                      key={flight.id}
                      flight={flight}
                      index={i}
                      animated={animatedIds.has(flight.id)}
                    />
                  ))}
                </AnimatePresence>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={9} className="py-16 text-center text-[#64748B] text-sm">
                      해당 상태의 항공편이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
