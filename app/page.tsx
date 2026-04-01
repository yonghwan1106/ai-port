'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Radar, Search, Zap, LayoutGrid, Bell, Briefcase, Baby, Globe, Plane, ArrowRight } from 'lucide-react';
import AnimatedCounter from '@/components/shared/AnimatedCounter';
import GlowCard from '@/components/shared/GlowCard';
import { STEP_LABELS } from '@/lib/constants';

const STEP_ICONS = {
  Radar,
  Search,
  Zap,
  LayoutGrid,
  Bell,
};

const PERSONAS = [
  {
    icon: Briefcase,
    title: '비즈니스 출장객',
    desc: '환승편 자동 재예약으로 해외 미팅 일정 차질 최소화. 라운지에서 업무 지속 가능.',
    color: '#0047AB',
    glow: 'rgba(0, 71, 171, 0.2)',
  },
  {
    icon: Baby,
    title: '유아 동반 가족',
    desc: '아이와 줄 서는 스트레스 제거. 키즈존 근처 상업시설로 맞춤 유도 + 식사 바우처.',
    color: '#10B981',
    glow: 'rgba(16, 185, 129, 0.2)',
  },
  {
    icon: Globe,
    title: '외국인 관광객',
    desc: '다국어 자동 알림으로 언어 장벽 없는 안내. 한국 방문 경험 만족도 극대화.',
    color: '#00B4D8',
    glow: 'rgba(0, 180, 216, 0.2)',
  },
];

const STATS = [
  {
    end: 47,
    suffix: '분',
    label: '평균 대기 시간',
    sub: '지연 시 안내데스크 대기 (피크 시 90분+)',
    color: '#F59E0B',
  },
  {
    end: 12000,
    suffix: '+',
    label: '연간 지연 항공편',
    sub: '인천국제공항 연간 운항 기준',
    color: '#0047AB',
  },
  {
    end: 180,
    suffix: '만+',
    label: '영향 여객 수',
    sub: '지연·결항으로 직접 영향받는 연간 여객',
    color: '#00B4D8',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B1120]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid">
        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,71,171,0.12) 0%, transparent 70%)',
          }}
        />

        {/* Floating plane */}
        <motion.div
          className="absolute top-24 right-16 text-[#00B4D8] opacity-20 hidden lg:block"
          animate={{ y: [0, -18, 0], rotate: [0, 3, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Plane size={96} />
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-12 text-[#0047AB] opacity-10 hidden lg:block"
          animate={{ y: [0, 12, 0], rotate: [0, -2, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        >
          <Plane size={64} />
        </motion.div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0047AB]/40 bg-[#0047AB]/10 text-[#00B4D8] text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#00B4D8] status-dot" />
            인천공항 AI-PORT 대국민 아이디어 공모전
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6"
          >
            <span className="gradient-text">에이전틱 AI가</span>
            <br />
            <span className="text-[#E2E8F0]">지연을 해결합니다</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-2xl md:text-3xl text-[#00B4D8] font-light mb-6 cursor-blink"
          >
            여객이 알기도 전에, 이미.
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg text-[#94A3B8] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            항공편 지연·결항을 실시간 감지하고, 대체편 예약부터 터미널 혼잡 분산까지
            <br className="hidden md:block" />
            평균 <span className="text-[#E2E8F0] font-semibold">4분 내</span> 자율 완료. 여객은 그저 알림을 받을 뿐입니다.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#0047AB] to-[#0060E0] text-white font-semibold text-lg hover:from-[#003380] hover:to-[#0047AB] transition-all duration-300 glow-blue"
            >
              AI 데모 체험하기
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/impact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-[#1E293B] text-[#94A3B8] font-semibold text-lg hover:border-[#00B4D8]/40 hover:text-[#00B4D8] transition-all duration-300"
            >
              기대효과 보기
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#64748B]"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs">스크롤</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#64748B] to-transparent" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-[#E2E8F0] mb-4">지금 인천공항의 현실</h2>
            <p className="text-[#64748B]">해결해야 할 문제의 규모</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STATS.map((stat, i) => (
              <GlowCard
                key={stat.label}
                delay={i * 0.1}
                glowColor={stat.color.replace(')', ', 0.15)').replace('rgb', 'rgba')}
                className="text-center"
              >
                <div className="text-5xl font-bold font-mono mb-3" style={{ color: stat.color }}>
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} duration={2.5} />
                </div>
                <div className="text-lg font-semibold text-[#E2E8F0] mb-2">{stat.label}</div>
                <div className="text-sm text-[#64748B]">{stat.sub}</div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Step Process */}
      <section className="py-24 px-6 bg-[#111827]/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-[#E2E8F0] mb-4">5단계 자율 복구 프로세스</h2>
            <p className="text-[#64748B]">이상 감지부터 여객 알림까지, AI가 모두 처리합니다</p>
          </motion.div>

          <Link href="/demo" className="block group">
            <div className="flex flex-col lg:flex-row items-stretch gap-0 relative">
              {STEP_LABELS.map((step, i) => {
                const IconComponent = STEP_ICONS[step.icon as keyof typeof STEP_ICONS];
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex-1 relative"
                  >
                    {/* Connector arrow */}
                    {i < STEP_LABELS.length - 1 && (
                      <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 items-center justify-center w-6 h-6 rounded-full bg-[#0B1120] border border-[#1E293B]">
                        <ArrowRight size={12} className="text-[#64748B]" />
                      </div>
                    )}
                    <div
                      className="h-full mx-1 rounded-xl border border-[#1E293B] bg-[#111827] p-6 flex flex-col items-center text-center hover:border-opacity-60 transition-all duration-300 group-hover:border-[#1E293B]/80"
                      style={{ borderColor: `${step.color}22` }}
                    >
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                        style={{ backgroundColor: `${step.color}20`, border: `1px solid ${step.color}40` }}
                      >
                        <IconComponent size={24} style={{ color: step.color }} />
                      </div>
                      <div className="text-xs font-mono text-[#64748B] mb-1">
                        STEP {String(i + 1).padStart(2, '0')}
                      </div>
                      <div className="font-bold text-[#E2E8F0] mb-1">{step.label}</div>
                      <div className="text-xs text-[#64748B]">{step.labelEn}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="text-center mt-6 text-[#00B4D8] text-sm font-medium group-hover:underline"
            >
              전체 데모 체험하기 →
            </motion.div>
          </Link>
        </div>
      </section>

      {/* Persona Cards */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-[#E2E8F0] mb-4">모든 여객을 위한 맞춤 대응</h2>
            <p className="text-[#64748B]">AI가 여객 유형을 파악하고 최적의 솔루션을 제공합니다</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PERSONAS.map((persona, i) => {
              const Icon = persona.icon;
              return (
                <GlowCard key={persona.title} delay={i * 0.12} glowColor={persona.glow}>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${persona.color}20` }}
                  >
                    <Icon size={24} style={{ color: persona.color }} />
                  </div>
                  <h3 className="font-bold text-[#E2E8F0] mb-3">{persona.title}</h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">{persona.desc}</p>
                </GlowCard>
              );
            })}
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
