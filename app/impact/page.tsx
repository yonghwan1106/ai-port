'use client';

import { motion } from 'framer-motion';
import { Briefcase, Baby, Globe, ArrowRight, CheckCircle, XCircle, TrendingUp, Users, BarChart3, Zap } from 'lucide-react';
import AnimatedCounter from '@/components/shared/AnimatedCounter';
import GlowCard from '@/components/shared/GlowCard';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// ── KPI data ──────────────────────────────────────────────────────────────────
const KPIS = [
  {
    icon: Zap,
    label: '대기시간 혁파',
    before: '47',
    after: '0',
    unit: '분',
    end: 0,
    start: 47,
    color: '#F59E0B',
    glow: 'rgba(245,158,11,0.2)',
    desc: 'AI가 여객 도착 전 처리 완료',
  },
  {
    icon: TrendingUp,
    label: '상업매출 증대',
    value: '+15~25%',
    color: '#10B981',
    glow: 'rgba(16,185,129,0.2)',
    desc: '유휴 시간 상업시설 유도 효과',
  },
  {
    icon: Users,
    label: '혼잡 밀집도 감소',
    value: '-30%',
    color: '#00B4D8',
    glow: 'rgba(0,180,216,0.2)',
    desc: '출국장 피크 혼잡 분산',
  },
  {
    icon: BarChart3,
    label: '글로벌 선도',
    value: '세계 최초',
    color: '#8B5CF6',
    glow: 'rgba(139,92,246,0.2)',
    desc: '에이전틱 AI 공항 자율 복구 시스템',
  },
];

// ── Before/After data ──────────────────────────────────────────────────────────
const ASIS = [
  '항공편 지연 인지까지 평균 30~60분 소요',
  '안내데스크 앞 수백 명 줄서기 필수',
  '대체편 수동 검색·전화 발권 (1~2시간)',
  '언어 장벽으로 외국인 여객 방치',
  '상업시설 미유도로 매출 손실',
  '직원 1명이 수십 건 민원 동시 처리 불가',
];
const TOBE = [
  '지연 발생 즉시 AI 자동 감지 (4분 내)',
  '대체편·바우처·동선 안내 앱 푸시 자동 발송',
  '대체편 자동 검색·예약 완료 후 여객 확인만',
  '12개 언어 자동 번역 실시간 알림',
  '혼잡 예측 기반 상업시설 맞춤 쿠폰 발행',
  '직원은 고위험 예외 케이스만 집중 처리',
];

// ── Revenue chart data ─────────────────────────────────────────────────────────
const REVENUE_DATA = [
  { name: '면세점', before: 100, after: 122 },
  { name: '식당가', before: 100, after: 119 },
  { name: '라운지', before: 100, after: 125 },
  { name: '편의시설', before: 100, after: 115 },
];

// ── Personas ───────────────────────────────────────────────────────────────────
const PERSONAS = [
  {
    icon: Briefcase,
    title: '비즈니스 출장객',
    color: '#0047AB',
    glow: 'rgba(0,71,171,0.2)',
    benefits: [
      '대체 항공편 자동 예약 후 알림 수신',
      '라운지 자동 업그레이드 쿠폰 발행',
      '환승 게이트 내비게이션 실시간 안내',
      '해외 파트너사 일정 지연 알림 대신 발송',
    ],
  },
  {
    icon: Baby,
    title: '유아 동반 가족',
    color: '#10B981',
    glow: 'rgba(16,185,129,0.2)',
    benefits: [
      '유아 동반 우선 체크인 자동 처리',
      '키즈존 근처 식당가 할인 바우처 발급',
      '수유실·유모차 주차 공간 실시간 안내',
      '보호자 모바일로 아이 친화 정보 선발송',
    ],
  },
  {
    icon: Globe,
    title: '외국인 관광객',
    color: '#00B4D8',
    glow: 'rgba(0,180,216,0.2)',
    benefits: [
      '12개 언어 자동 번역 실시간 알림',
      '한국 관광 명소 추천 및 경로 안내',
      '환전소·SIM 카드 매장 위치 자동 안내',
      '대사관·여행자 보험 연락처 자동 제공',
    ],
  },
];

// ── Roadmap ────────────────────────────────────────────────────────────────────
const ROADMAP = [
  {
    phase: 'Phase 1',
    period: '2026 하반기',
    title: 'PoC 실증',
    items: ['제1터미널 파일럿 적용', '실시간 항공 데이터 연동', '기본 알림 자동화', '직원 UI 대시보드'],
    gradient: 'from-[#0047AB]/20 to-[#0047AB]/5',
    border: 'border-[#0047AB]/30',
    badge: 'bg-[#0047AB]/20 text-[#60A5FA]',
  },
  {
    phase: 'Phase 2',
    period: '2027 상반기',
    title: '서비스 확대',
    items: ['전 터미널 확장', '상업시설 연동 바우처', '다국어 지원 고도화', '혼잡 분산 최적화 엔진'],
    gradient: 'from-[#10B981]/20 to-[#10B981]/5',
    border: 'border-[#10B981]/30',
    badge: 'bg-[#10B981]/20 text-[#34D399]',
  },
  {
    phase: 'Phase 3',
    period: '2027 하반기~',
    title: '완전 자율화',
    items: ['완전 자율 의사결정', '타 공항 수출 모델화', '실시간 예측 AI 고도화', '글로벌 표준 수립'],
    gradient: 'from-[#F59E0B]/20 to-[#F59E0B]/5',
    border: 'border-[#F59E0B]/30',
    badge: 'bg-[#F59E0B]/20 text-[#FCD34D]',
  },
];

// ── Custom Tooltip ─────────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#111827] border border-[#1E293B] rounded-lg p-3 text-sm">
        <div className="text-[#E2E8F0] font-semibold mb-2">{label}</div>
        {payload.map((p) => (
          <div key={p.name} style={{ color: p.color }}>
            {p.name}: {p.value === 100 ? '기준값' : `+${p.value - 100}%`}
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-[#0B1120]">
      {/* Page Header */}
      <section className="pt-20 pb-12 px-6 bg-grid">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(16,185,129,0.08) 0%, transparent 70%)',
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#10B981]/30 bg-[#10B981]/10 text-[#10B981] text-sm font-medium mb-6"
          >
            기대효과 분석
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-[#E2E8F0] mb-4"
          >
            <span className="gradient-text">AI-PORT</span>가 만드는 변화
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#94A3B8]"
          >
            데이터 기반으로 검증된 기대 효과와 도입 로드맵
          </motion.p>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {KPIS.map((kpi, i) => {
              const Icon = kpi.icon;
              return (
                <GlowCard key={kpi.label} delay={i * 0.08} glowColor={kpi.glow}>
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${kpi.color}20` }}
                  >
                    <Icon size={20} style={{ color: kpi.color }} />
                  </div>
                  <div className="text-xs text-[#64748B] mb-1 font-medium uppercase tracking-wide">{kpi.label}</div>
                  {kpi.value ? (
                    <div className="text-3xl font-bold font-mono mb-2" style={{ color: kpi.color }}>
                      {kpi.value}
                    </div>
                  ) : (
                    <div className="text-3xl font-bold font-mono mb-2 flex items-end gap-1" style={{ color: kpi.color }}>
                      <AnimatedCounter end={kpi.end!} suffix={kpi.unit} duration={2.5} />
                    </div>
                  )}
                  <div className="text-xs text-[#64748B] leading-relaxed">{kpi.desc}</div>
                </GlowCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-16 px-6 bg-[#111827]/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#E2E8F0] mb-3">AS-IS vs TO-BE</h2>
            <p className="text-[#64748B]">현재 문제와 AI-PORT가 제시하는 해결책</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_48px_1fr] gap-0 items-stretch">
            {/* AS-IS */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-xl border border-[#EF4444]/20 bg-[#EF4444]/5 p-6"
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-[#EF4444]/20 flex items-center justify-center">
                  <XCircle size={16} className="text-[#EF4444]" />
                </div>
                <h3 className="font-bold text-[#EF4444]">AS-IS · 현재 상황</h3>
              </div>
              <ul className="space-y-3">
                {ASIS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#94A3B8]">
                    <XCircle size={14} className="text-[#EF4444] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="w-8 h-8 rounded-full bg-[#0047AB]/30 border border-[#0047AB]/50 flex items-center justify-center"
              >
                <ArrowRight size={16} className="text-[#00B4D8]" />
              </motion.div>
            </div>

            {/* TO-BE */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-xl border border-[#10B981]/20 bg-[#10B981]/5 p-6"
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-[#10B981]/20 flex items-center justify-center">
                  <CheckCircle size={16} className="text-[#10B981]" />
                </div>
                <h3 className="font-bold text-[#10B981]">TO-BE · AI-PORT 적용 후</h3>
              </div>
              <ul className="space-y-3">
                {TOBE.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#94A3B8]">
                    <CheckCircle size={14} className="text-[#10B981] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Revenue Chart */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#E2E8F0] mb-3">상업매출 기대 증대 효과</h2>
            <p className="text-[#64748B]">지연 여객의 유휴 시간을 상업시설 방문으로 전환 (기준값 대비 %)</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl border border-[#1E293B] bg-[#111827] p-6"
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={REVENUE_DATA} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="name" tick={{ fill: '#94A3B8', fontSize: 13 }} axisLine={false} tickLine={false} />
                <YAxis
                  domain={[90, 130]}
                  tick={{ fill: '#64748B', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  formatter={(value) => (
                    <span style={{ color: '#94A3B8', fontSize: 13 }}>{value}</span>
                  )}
                />
                <Bar dataKey="before" name="도입 전" fill="#1E293B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="after" name="도입 후" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </section>

      {/* Persona Benefits */}
      <section className="py-16 px-6 bg-[#111827]/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#E2E8F0] mb-3">여객 유형별 혜택</h2>
            <p className="text-[#64748B]">AI가 여객 특성을 파악하고 맞춤형 솔루션을 제공합니다</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PERSONAS.map((persona, i) => {
              const Icon = persona.icon;
              return (
                <GlowCard key={persona.title} delay={i * 0.1} glowColor={persona.glow}>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${persona.color}20` }}
                  >
                    <Icon size={24} style={{ color: persona.color }} />
                  </div>
                  <h3 className="font-bold text-[#E2E8F0] mb-4">{persona.title}</h3>
                  <ul className="space-y-2">
                    {persona.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-[#94A3B8]">
                        <CheckCircle size={13} className="mt-0.5 shrink-0" style={{ color: persona.color }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </GlowCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#E2E8F0] mb-3">도입 로드맵</h2>
            <p className="text-[#64748B]">단계적 확대를 통한 안정적 서비스 구축</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ROADMAP.map((phase, i) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`rounded-xl border ${phase.border} bg-gradient-to-b ${phase.gradient} p-6`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${phase.badge}`}>
                    {phase.phase}
                  </span>
                  <span className="text-xs text-[#64748B]">{phase.period}</span>
                </div>
                <h3 className="text-lg font-bold text-[#E2E8F0] mb-4">{phase.title}</h3>
                <ul className="space-y-2">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[#94A3B8]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#64748B]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1E293B] py-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-[#E2E8F0] font-semibold mb-2">인천공항 AI-PORT 대국민 아이디어 공모전</div>
          <div className="text-[#64748B] text-sm">Powered by Agentic AI</div>
        </div>
      </footer>
    </div>
  );
}
