'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  DoorOpen,
  ShoppingBag,
  Sofa,
  UtensilsCrossed,
  PlaneTakeoff,
  ClipboardCheck,
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
} from 'lucide-react';
import { zones as initialZones, hourlyData, getDensityColor, getDensityLabel, type Zone } from '@/lib/mock-data/congestion';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────
type TerminalFilter = 'T1' | 'T2' | 'all';

// ─── Zone type icon ───────────────────────────────────────────────────────────
function ZoneIcon({ type, size = 16 }: { type: Zone['type']; size?: number }) {
  const props = { size, strokeWidth: 1.8 };
  switch (type) {
    case 'departure': return <DoorOpen {...props} />;
    case 'dutyfree':  return <ShoppingBag {...props} />;
    case 'lounge':    return <Sofa {...props} />;
    case 'restaurant': return <UtensilsCrossed {...props} />;
    case 'gate':      return <PlaneTakeoff {...props} />;
    case 'checkin':   return <ClipboardCheck {...props} />;
  }
}

// ─── Trend arrow ──────────────────────────────────────────────────────────────
function TrendIcon({ trend }: { trend: Zone['trend'] }) {
  if (trend === 'up') return <TrendingUp size={14} className="text-[#EF4444]" />;
  if (trend === 'down') return <TrendingDown size={14} className="text-[#10B981]" />;
  return <Minus size={14} className="text-[#64748B]" />;
}

// ─── Zone Heatmap Cell ────────────────────────────────────────────────────────
function HeatmapCell({ zone }: { zone: Zone }) {
  const color = getDensityColor(zone.density);
  const isHot = zone.density >= 80;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'relative rounded-lg border p-3 flex flex-col gap-1.5 overflow-hidden',
        isHot ? 'border-[#EF4444]/50' : 'border-[#1E293B]'
      )}
      style={{
        backgroundColor: `${color}12`,
        boxShadow: isHot ? `0 0 16px rgba(239,68,68,0.25)` : 'none',
        gridRow: `span ${zone.gridPos.rowSpan ?? 1}`,
        gridColumn: `span ${zone.gridPos.colSpan ?? 1}`,
        animation: isHot ? 'pulse-glow 2s ease-in-out infinite' : 'none',
      }}
    >
      {/* Type icon + name */}
      <div className="flex items-center gap-1.5">
        <span style={{ color }}><ZoneIcon type={zone.type} size={13} /></span>
        <span className="text-xs font-medium text-[#94A3B8] truncate">{zone.name}</span>
        <span className="ml-auto"><TrendIcon trend={zone.trend} /></span>
      </div>

      {/* Density number */}
      <div className="flex items-end gap-1">
        <span
          className="text-2xl font-bold font-mono leading-none"
          style={{ color }}
        >
          {zone.density}
        </span>
        <span className="text-xs font-mono pb-0.5" style={{ color: `${color}cc` }}>%</span>
        <span
          className="ml-auto text-xs font-semibold px-1.5 py-0.5 rounded"
          style={{ backgroundColor: `${color}20`, color }}
        >
          {getDensityLabel(zone.density)}
        </span>
      </div>

      {/* Capacity bar */}
      <div className="h-1 rounded-full bg-[#1E293B] overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${zone.density}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[10px] text-[#64748B] font-mono">
          {zone.currentCount.toLocaleString()} / {zone.capacity.toLocaleString()}명
        </span>
      </div>

      {/* Glow overlay for hot zones */}
      {isHot && (
        <div
          className="absolute inset-0 pointer-events-none rounded-lg"
          style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(239,68,68,0.08) 0%, transparent 70%)',
          }}
        />
      )}
    </motion.div>
  );
}

// ─── Zone Detail Card ─────────────────────────────────────────────────────────
function ZoneDetailCard({ zone, index }: { zone: Zone; index: number }) {
  const color = getDensityColor(zone.density);
  const pct = zone.density;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="rounded-xl border bg-[#111827] p-4 flex flex-col gap-3"
      style={{ borderColor: `${color}40` }}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <span style={{ color }}><ZoneIcon type={zone.type} size={14} /></span>
            <span className="text-xs text-[#64748B]">{zone.terminal} · {zone.floor}F</span>
          </div>
          <p className="text-sm font-semibold text-[#E2E8F0]">{zone.name}</p>
        </div>
        <div className="flex items-center gap-1">
          <TrendIcon trend={zone.trend} />
        </div>
      </div>

      {/* Circular gauge (CSS) */}
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 shrink-0">
          <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
            <circle cx="32" cy="32" r="26" fill="none" stroke="#1E293B" strokeWidth="6" />
            <circle
              cx="32" cy="32" r="26"
              fill="none"
              stroke={color}
              strokeWidth="6"
              strokeDasharray={`${2 * Math.PI * 26}`}
              strokeDashoffset={`${2 * Math.PI * 26 * (1 - pct / 100)}`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold font-mono" style={{ color }}>{pct}%</span>
          </div>
        </div>

        <div className="flex-1 space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-[#64748B]">현재</span>
            <span className="font-mono text-[#E2E8F0]">{zone.currentCount.toLocaleString()}명</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-[#64748B]">최대</span>
            <span className="font-mono text-[#E2E8F0]">{zone.capacity.toLocaleString()}명</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-[#64748B]">상태</span>
            <span
              className="font-semibold text-xs px-2 py-0.5 rounded-full"
              style={{ backgroundColor: `${color}20`, color }}
            >
              {getDensityLabel(zone.density)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Custom Chart Tooltip ─────────────────────────────────────────────────────
function ChartTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[#1E293B] bg-[#0D1117] px-4 py-3 text-sm shadow-xl">
      <p className="font-mono text-[#64748B] text-xs mb-2">{label}</p>
      {payload.map(p => (
        <div key={p.name} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
          <span className="text-[#94A3B8]">{p.name}:</span>
          <span className="font-mono font-bold" style={{ color: p.color }}>{p.value}%</span>
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CongestionPage() {
  const [terminalFilter, setTerminalFilter] = useState<TerminalFilter>('all');
  const [showAiEffect, setShowAiEffect] = useState(false);
  const [zoneList, setZoneList] = useState<Zone[]>(initialZones);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Real-time simulation: ±1-3% every 2s
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setZoneList(prev =>
        prev.map(z => {
          const delta = (Math.random() * 6 - 3); // -3 to +3
          const next = Math.min(95, Math.max(10, Math.round(z.density + delta)));
          const newCount = Math.round((next / 100) * z.capacity);
          const trend: Zone['trend'] =
            delta > 1 ? 'up' : delta < -1 ? 'down' : 'stable';
          return { ...z, density: next, currentCount: newCount, trend };
        })
      );
    }, 2000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const visibleZones = terminalFilter === 'all'
    ? zoneList
    : zoneList.filter(z => z.terminal === terminalFilter);

  const t1Zones = zoneList.filter(z => z.terminal === 'T1');
  const t2Zones = zoneList.filter(z => z.terminal === 'T2');

  // Heatmap zones per terminal
  const heatmapZones = terminalFilter === 'T2' ? t2Zones : t1Zones;
  const heatmapTitle = terminalFilter === 'T2' ? '제2터미널' : terminalFilter === 'T1' ? '제1터미널' : '제1터미널';

  // Chart series keys
  const chartKeys = showAiEffect
    ? [
        { key: 't1', name: 'T1 현재', color: '#0047AB', dashed: false },
        { key: 't2', name: 'T2 현재', color: '#00B4D8', dashed: false },
        { key: 't1After', name: 'T1 AI 분산 후', color: '#0047AB', dashed: true },
        { key: 't2After', name: 'T2 AI 분산 후', color: '#00B4D8', dashed: true },
      ]
    : [
        { key: 't1', name: 'T1', color: '#0047AB', dashed: false },
        { key: 't2', name: 'T2', color: '#00B4D8', dashed: false },
      ];

  return (
    <div className="min-h-screen bg-[#0B1120] bg-grid text-[#E2E8F0]">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-30 border-b border-[#1E293B] bg-[#0B1120]/90 backdrop-blur-md"
      >
        <div className="mx-auto max-w-screen-xl px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00B4D8] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00B4D8]" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">터미널 혼잡도 현황</h1>
          </div>

          {/* Terminal Tab Selector */}
          <div className="flex items-center gap-1 rounded-lg border border-[#1E293B] bg-[#111827] p-1">
            {(['T1', 'T2', '전체'] as const).map(t => {
              const val: TerminalFilter = t === '전체' ? 'all' : t;
              return (
                <button
                  key={t}
                  onClick={() => setTerminalFilter(val)}
                  className={cn(
                    'rounded-md px-4 py-1.5 text-sm font-semibold transition-all duration-200',
                    terminalFilter === val
                      ? 'bg-[#0047AB] text-white shadow-[0_0_10px_rgba(0,71,171,0.4)]'
                      : 'text-[#64748B] hover:text-[#E2E8F0]'
                  )}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      <div className="mx-auto max-w-screen-xl px-6 py-8 space-y-8">

        {/* ── Heatmap Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-xl border border-[#1E293B] bg-[#0D1117] overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#1E293B]">
            <span className="text-sm font-semibold text-[#94A3B8]">
              {terminalFilter === 'all' ? '제1터미널' : heatmapTitle} 구역 현황
            </span>
            <div className="flex items-center gap-4 text-xs text-[#64748B]">
              {[
                { label: '쾌적', color: '#10B981' },
                { label: '여유', color: '#00B4D8' },
                { label: '보통', color: '#F59E0B' },
                { label: '혼잡', color: '#EF4444' },
              ].map(d => (
                <span key={d.label} className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: d.color }} />
                  {d.label}
                </span>
              ))}
            </div>
          </div>

          <div className="p-5">
            {/* T1 grid */}
            {terminalFilter !== 'T2' && (
              <div className="mb-6">
                {terminalFilter === 'all' && (
                  <p className="text-xs font-semibold text-[#64748B] uppercase tracking-widest mb-3">
                    T1 — 제1터미널
                  </p>
                )}
                <div
                  className="grid gap-3"
                  style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
                >
                  {t1Zones.map(zone => (
                    <HeatmapCell key={zone.id} zone={zone} />
                  ))}
                </div>
              </div>
            )}

            {/* T2 grid */}
            {terminalFilter !== 'T1' && (
              <div>
                {terminalFilter === 'all' && (
                  <p className="text-xs font-semibold text-[#64748B] uppercase tracking-widest mb-3 mt-4 pt-4 border-t border-[#1E293B]">
                    T2 — 제2터미널
                  </p>
                )}
                <div
                  className="grid gap-3"
                  style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
                >
                  {t2Zones.map(zone => (
                    <HeatmapCell key={zone.id} zone={zone} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* ── Chart ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-xl border border-[#1E293B] bg-[#111827] p-6"
        >
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <h2 className="text-base font-semibold text-[#E2E8F0]">시간대별 혼잡도 추이</h2>
              <p className="text-xs text-[#64748B] mt-0.5">00:00 — 23:00 전체 시간대</p>
            </div>
            <button
              onClick={() => setShowAiEffect(v => !v)}
              className={cn(
                'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold border transition-all duration-200',
                showAiEffect
                  ? 'bg-[#10B981]/15 border-[#10B981]/40 text-[#10B981] shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                  : 'border-[#1E293B] text-[#94A3B8] hover:border-[#00B4D8]/40 hover:text-[#00B4D8]'
              )}
            >
              <Sparkles size={15} />
              AI 분산 효과 {showAiEffect ? '숨기기' : '보기'}
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={showAiEffect ? 'with-ai' : 'without-ai'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={hourlyData} margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    {chartKeys.map(k => (
                      <linearGradient key={k.key} id={`grad-${k.key}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={k.color} stopOpacity={k.dashed ? 0.05 : 0.25} />
                        <stop offset="95%" stopColor={k.color} stopOpacity={0} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                  <XAxis
                    dataKey="hour"
                    tick={{ fontSize: 10, fill: '#64748B', fontFamily: 'monospace' }}
                    tickLine={false}
                    axisLine={{ stroke: '#1E293B' }}
                    interval={3}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fontSize: 10, fill: '#64748B', fontFamily: 'monospace' }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={v => `${v}%`}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: 12, color: '#94A3B8', paddingTop: 12 }}
                    iconType="circle"
                    iconSize={8}
                  />
                  {chartKeys.map(k => (
                    <Area
                      key={k.key}
                      type="monotone"
                      dataKey={k.key}
                      name={k.name}
                      stroke={k.color}
                      strokeWidth={k.dashed ? 1.5 : 2}
                      strokeDasharray={k.dashed ? '5 3' : undefined}
                      fill={`url(#grad-${k.key})`}
                      dot={false}
                      activeDot={{ r: 4, fill: k.color, stroke: '#0B1120', strokeWidth: 2 }}
                    />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          </AnimatePresence>

          {showAiEffect && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-xs text-[#10B981] flex items-center gap-1.5"
            >
              <Sparkles size={12} />
              AI 분산 시스템 적용 시 평균 혼잡도 약 15-20% 감소 예상
            </motion.p>
          )}
        </motion.div>

        {/* ── Zone Detail Cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-base font-semibold text-[#E2E8F0] mb-4">
            구역별 상세 현황
            <span className="ml-2 text-xs text-[#64748B] font-normal">
              {visibleZones.length}개 구역
            </span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleZones.map((zone, i) => (
              <ZoneDetailCard key={zone.id} zone={zone} index={i} />
            ))}
          </div>
        </motion.div>

      </div>

      {/* Inline keyframes for hot-zone pulse */}
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 16px rgba(239,68,68,0.25); }
          50%       { box-shadow: 0 0 28px rgba(239,68,68,0.45); }
        }
      `}</style>
    </div>
  );
}
