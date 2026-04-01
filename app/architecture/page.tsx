'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Shield, Eye, CheckSquare, FileText, Database, Cpu, Play, Smartphone } from 'lucide-react';
import GlowCard from '@/components/shared/GlowCard';

// ── Architecture layers ────────────────────────────────────────────────────────
const LAYERS = [
  {
    id: 'collect',
    label: '데이터 수집',
    labelEn: 'Data Collection',
    color: '#00B4D8',
    bg: 'rgba(0,180,216,0.08)',
    border: 'rgba(0,180,216,0.25)',
    icon: Database,
    items: [
      '운항현황 API',
      '출국장 혼잡도 API',
      '입국장 현황 API',
      '여객 예약 데이터',
      '기상 데이터',
    ],
  },
  {
    id: 'ai',
    label: 'AI 추론',
    labelEn: 'AI Inference',
    color: '#8B5CF6',
    bg: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.25)',
    icon: Cpu,
    items: [
      '에이전틱 AI 오케스트레이터',
      '지연 예측 모델',
      '영향도 분석 엔진',
      '혼잡 분산 최적화',
    ],
  },
  {
    id: 'execute',
    label: '자율 실행',
    labelEn: 'Autonomous Action',
    color: '#0047AB',
    bg: 'rgba(0,71,171,0.08)',
    border: 'rgba(0,71,171,0.25)',
    icon: Play,
    items: [
      '대체편 예약',
      '바우처 발급',
      '혼잡 분산',
      '다국어 알림',
    ],
  },
  {
    id: 'ux',
    label: '사용자 접점',
    labelEn: 'User Touchpoints',
    color: '#10B981',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.25)',
    icon: Smartphone,
    items: [
      '인천공항 앱',
      'SMS/카카오톡',
      '터미널 DID',
      '직원 태블릿',
    ],
  },
];

// ── Public API cards ───────────────────────────────────────────────────────────
const PUBLIC_APIS = [
  {
    name: '여객편 주간 운항 현황',
    type: 'REST API',
    color: '#00B4D8',
    fields: ['항공편명', '출발/도착시간', '지연·결항여부', '터미널 구분'],
  },
  {
    name: '출국장 혼잡도 조회',
    type: 'REST API',
    color: '#F59E0B',
    fields: ['터미널 구분(P01~P03)', '발생 일시', '대기 인원수'],
  },
  {
    name: '입국장 현황 정보',
    type: 'REST API',
    color: '#10B981',
    fields: ['입국장별 대기 현황', '게이트 정보'],
  },
  {
    name: '여객기 운항 현황 상세',
    type: 'REST API',
    color: '#8B5CF6',
    fields: ['항공사', '기종', '게이트', '탑승구', '상세 스케줄'],
  },
];

// ── Security cards ─────────────────────────────────────────────────────────────
const SECURITY = [
  {
    icon: Shield,
    title: '데이터 암호화',
    color: '#0047AB',
    items: ['AES-256 암호화', 'API 호출 시 인증키 기반 접근 통제'],
  },
  {
    icon: Eye,
    title: '개인정보 최소 수집',
    color: '#10B981',
    items: ['최소 정보만 처리', '분석 후 비식별화', '30일 이내 삭제'],
  },
  {
    icon: CheckSquare,
    title: 'Human-in-the-Loop',
    color: '#F59E0B',
    items: ['고위험 행동(재예약)은 AI 제안 → 직원 승인 후 실행'],
  },
  {
    icon: FileText,
    title: '감사 로그 전수 기록',
    color: '#00B4D8',
    items: ['AI 모든 판단·행동 로그 실시간 기록', '책임 추적 가능'],
  },
];

// ── Budget data ────────────────────────────────────────────────────────────────
const BUDGET = [
  { item: 'AI 플랫폼 구축', cost: '3~5억원', note: '모델 학습·서빙 인프라 포함' },
  { item: '시스템 연동', cost: '1~2억원', note: '공항 레거시 시스템 API 연결' },
  { item: '운영 인프라 (연간)', cost: '0.5~1억원', note: '클라우드 유지·보수' },
  { item: '1단계 PoC MVP', cost: '약 1억원', note: '제1터미널 파일럿' },
];

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-[#0B1120]">
      {/* Page Header */}
      <section className="relative pt-20 pb-12 px-6 bg-grid overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(139,92,246,0.08) 0%, transparent 70%)',
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 text-[#A78BFA] text-sm font-medium mb-6"
          >
            시스템 아키텍처
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-[#E2E8F0] mb-4"
          >
            <span className="gradient-text">AI-PORT</span> 기술 구조
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#94A3B8]"
          >
            공공 데이터 기반 에이전틱 AI 시스템의 4계층 아키텍처
          </motion.p>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#E2E8F0] mb-3">시스템 아키텍처 다이어그램</h2>
            <p className="text-[#64748B]">데이터 수집부터 여객 접점까지 4계층 파이프라인</p>
          </motion.div>

          <div className="flex flex-col gap-0">
            {LAYERS.map((layer, i) => {
              const Icon = layer.icon;
              return (
                <div key={layer.id}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="rounded-xl border p-5"
                    style={{
                      backgroundColor: layer.bg,
                      borderColor: layer.border,
                    }}
                  >
                    {/* Layer header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${layer.color}20`, border: `1px solid ${layer.color}40` }}
                      >
                        <Icon size={18} style={{ color: layer.color }} />
                      </div>
                      <div>
                        <div className="font-bold text-[#E2E8F0]">{layer.label}</div>
                        <div className="text-xs text-[#64748B]">{layer.labelEn}</div>
                      </div>
                    </div>

                    {/* Items row */}
                    <div className="flex flex-wrap gap-2">
                      {layer.items.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1.5 rounded-lg text-sm font-medium"
                          style={{
                            backgroundColor: `${layer.color}15`,
                            color: layer.color,
                            border: `1px solid ${layer.color}30`,
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Arrow between layers */}
                  {i < LAYERS.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 + 0.3 }}
                      className="flex justify-center py-2"
                    >
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="w-px h-4 bg-gradient-to-b from-[#1E293B] to-[#334155]" />
                        <ArrowDown size={14} className="text-[#64748B]" />
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Public API Cards */}
      <section className="py-16 px-6 bg-[#111827]/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#E2E8F0] mb-3">활용 공공 데이터 API</h2>
            <p className="text-[#64748B]">인천국제공항공사 공개 API 기반 — 추가 인프라 없이 즉시 연동 가능</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PUBLIC_APIS.map((api, i) => (
              <GlowCard
                key={api.name}
                delay={i * 0.08}
                glowColor={`${api.color}25`}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-bold text-[#E2E8F0] leading-snug flex-1 pr-4">{api.name}</h3>
                  <span
                    className="shrink-0 text-xs font-mono px-2 py-1 rounded"
                    style={{ backgroundColor: `${api.color}20`, color: api.color }}
                  >
                    {api.type}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {api.fields.map((field) => (
                    <span
                      key={field}
                      className="text-xs px-2 py-1 rounded border border-[#1E293B] text-[#94A3B8] bg-[#0B1120]"
                    >
                      {field}
                    </span>
                  ))}
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#E2E8F0] mb-3">보안 및 윤리 설계</h2>
            <p className="text-[#64748B]">신뢰할 수 있는 AI를 위한 4가지 안전 장치</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SECURITY.map((item, i) => {
              const Icon = item.icon;
              return (
                <GlowCard
                  key={item.title}
                  delay={i * 0.08}
                  glowColor={`${item.color}18`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      <Icon size={20} style={{ color: item.color }} />
                    </div>
                    <h3 className="font-bold text-[#E2E8F0]">{item.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {item.items.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-[#94A3B8]">
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </GlowCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Budget Table */}
      <section className="py-16 px-6 bg-[#111827]/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#E2E8F0] mb-3">예상 예산</h2>
            <p className="text-[#64748B]">단계별 투자 계획 및 비용 산정</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl border border-[#1E293B] bg-[#111827] overflow-hidden"
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1E293B] bg-[#0B1120]/60">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-[#64748B] uppercase tracking-wide">항목</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-[#64748B] uppercase tracking-wide">예산</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-[#64748B] uppercase tracking-wide hidden md:table-cell">비고</th>
                </tr>
              </thead>
              <tbody>
                {BUDGET.map((row, i) => (
                  <motion.tr
                    key={row.item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="border-b border-[#1E293B]/50 hover:bg-[#1E293B]/20 transition-colors"
                  >
                    <td className="px-6 py-4 text-[#E2E8F0] font-medium">{row.item}</td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-[#00B4D8]">{row.cost}</td>
                    <td className="px-6 py-4 text-[#64748B] text-sm hidden md:table-cell">{row.note}</td>
                  </motion.tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-[#0047AB]/10 border-t border-[#0047AB]/30">
                  <td className="px-6 py-4 font-bold text-[#E2E8F0]">합계</td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-xl text-[#00B4D8]">총 5~8억원</td>
                  <td className="px-6 py-4 text-[#64748B] text-sm hidden md:table-cell">단계별 투자, PoC 선행 가능</td>
                </tr>
              </tfoot>
            </table>
          </motion.div>
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
