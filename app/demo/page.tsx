'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Radar,
  Search,
  Zap,
  LayoutGrid,
  Bell,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  CheckCircle2,
  Star,
  Shield,
  Plane,
  Clock,
  MapPin,
  Users,
  Ticket,
  Smartphone,
  Globe,
  AlertTriangle,
  Timer,
  Activity,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { scenarios } from '@/lib/mock-data/scenarios';
import { passengers } from '@/lib/mock-data/passengers';
import { notifications } from '@/lib/mock-data/notifications';
import { voucherTemplates } from '@/lib/mock-data/vouchers';
import { STEP_LABELS } from '@/lib/constants';

// ─── Types ───────────────────────────────────────────────────────────────────

type StepStatus = 'idle' | 'active' | 'complete';
type NotificationLanguage = 'ko' | 'en' | 'zh' | 'ja';

// ─── Constants ────────────────────────────────────────────────────────────────

const STEP_ICONS = [Radar, Search, Zap, LayoutGrid, Bell];

const STEP_TIMESTAMPS = [
  ['14:20', '15:30', '13:00'],
  ['14:21', '15:31', '13:01'],
  ['14:22', '15:32', '13:02'],
  ['14:23', '15:33', '13:03'],
  ['14:24', '15:34', '13:04'],
];

const NATIONALITY_FLAGS: Record<string, string> = {
  KR: '🇰🇷',
  US: '🇺🇸',
  JP: '🇯🇵',
  CN: '🇨🇳',
  GB: '🇬🇧',
};

const SEAT_CLASS_CONFIG = {
  economy: { label: '이코노미', labelEn: 'Economy', color: '#64748B', bg: 'rgba(100,116,139,0.15)' },
  business: { label: '비즈니스', labelEn: 'Business', color: '#0047AB', bg: 'rgba(0,71,171,0.15)' },
  first: { label: '퍼스트', labelEn: 'First', color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
};

const LANG_FLAGS: Record<NotificationLanguage, string> = {
  ko: '🇰🇷',
  en: '🇺🇸',
  zh: '🇨🇳',
  ja: '🇯🇵',
};

const SCENARIO_VOUCHER_MAP: Record<string, string[]> = {
  scenario1: ['v1', 'v2', 'v3'],
  scenario2: ['v4', 'v2', 'v1'],
  scenario3: ['v1', 'v2', 'v3'],
};

// ─── Log line colorizer ───────────────────────────────────────────────────────

function getLogLineClass(line: string): string {
  if (line.includes('⚠️')) return 'text-[#F59E0B]';
  if (line.includes('✅')) return 'text-[#10B981]';
  if (line.includes('🚨')) return 'text-[#EF4444]';
  if (line.includes('⚡')) return 'text-[#00B4D8]';
  if (line.includes('📊')) return 'text-[#8B5CF6]';
  if (line.startsWith('  →') || line.startsWith('   →')) return 'text-[#94A3B8] pl-4';
  if (/^\[[\d:]+\]/.test(line)) return 'text-[#E2E8F0]';
  return 'text-[#E2E8F0]';
}

function renderLogLine(line: string) {
  const tsMatch = line.match(/^(\[[\d:]+\])(.*)/);
  if (tsMatch) {
    return (
      <>
        <span className="text-[#64748B]">{tsMatch[1]}</span>
        <span>{tsMatch[2]}</span>
      </>
    );
  }
  return <span>{line}</span>;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ScenarioCard({
  scenario,
  isSelected,
  onClick,
}: {
  scenario: (typeof scenarios)[0];
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={cn(
        'w-full text-left rounded-xl border p-4 transition-all duration-300 cursor-pointer',
        isSelected
          ? 'border-[#00B4D8] bg-[#00B4D8]/5'
          : 'border-[#1E293B] bg-[#111827] hover:border-[#1E293B]/80 hover:bg-[#1E293B]/30'
      )}
      style={isSelected ? { boxShadow: '0 0 20px rgba(0,180,216,0.15), inset 0 0 20px rgba(0,180,216,0.03)' } : {}}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0 mt-0.5">{scenario.icon}</span>
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={cn(
                'text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded',
                isSelected ? 'bg-[#00B4D8]/20 text-[#00B4D8]' : 'bg-[#1E293B] text-[#64748B]'
              )}
            >
              {scenario.flightNo}
            </span>
            {isSelected && (
              <span className="text-[10px] font-semibold text-[#00B4D8] uppercase tracking-wider">선택됨</span>
            )}
          </div>
          <p className="text-sm font-semibold text-[#E2E8F0] leading-tight mb-1">{scenario.name}</p>
          <p className="text-xs text-[#64748B] leading-relaxed">{scenario.description}</p>
        </div>
      </div>
    </motion.button>
  );
}

function PassengerCard({ passengerId }: { passengerId: string }) {
  const passenger = passengers.find((p) => p.id === passengerId);
  if (!passenger) return null;

  const initials = passenger.nameEn
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const seatConfig = SEAT_CLASS_CONFIG[passenger.seatClass];
  const flag = NATIONALITY_FLAGS[passenger.nationality] ?? '🌐';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="rounded-xl border border-[#1E293B] bg-[#111827] p-4 space-y-3"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #0047AB, #00B4D8)', color: '#fff' }}
        >
          {initials}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[#E2E8F0]">{passenger.name}</span>
            <span className="text-xs text-[#94A3B8]">{passenger.nameEn}</span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs">{flag}</span>
            <span className="text-xs text-[#64748B]">{passenger.age}세</span>
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: seatConfig.bg, color: seatConfig.color }}
            >
              {seatConfig.label}
            </span>
          </div>
        </div>
      </div>

      {/* Flight info */}
      <div className="space-y-1.5 text-xs">
        <div className="flex items-center gap-2 text-[#94A3B8]">
          <Plane className="w-3.5 h-3.5 text-[#0047AB] flex-shrink-0" />
          <span className="font-mono font-semibold text-[#E2E8F0]">{passenger.flightNo}</span>
          {passenger.isTransfer && (
            <>
              <ChevronRight className="w-3 h-3 text-[#64748B]" />
              <span className="font-mono text-[#00B4D8]">{passenger.transferFlight}</span>
              <span className="text-[#64748B]">→ {passenger.transferDestination}</span>
            </>
          )}
        </div>

        {passenger.companions > 0 && (
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <Users className="w-3.5 h-3.5 text-[#8B5CF6] flex-shrink-0" />
            <span>{passenger.companionType ?? `동반 ${passenger.companions}명`}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-[#94A3B8]">
          <MapPin className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />
          <span>{passenger.purpose}</span>
        </div>
      </div>

      {/* Urgency + FF */}
      <div className="flex items-center justify-between pt-1 border-t border-[#1E293B]">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn('w-3 h-3', i < passenger.urgencyScore ? 'text-[#F59E0B]' : 'text-[#1E293B]')}
              fill={i < passenger.urgencyScore ? '#F59E0B' : 'none'}
            />
          ))}
          <span className="text-[10px] text-[#64748B] ml-1">긴급도</span>
        </div>
        {passenger.frequentFlyer && (
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3 text-[#F59E0B]" />
            <span className="text-[10px] text-[#F59E0B] font-semibold">{passenger.frequentFlyer.split(' ').slice(-1)[0]}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function PipelineCard({
  stepIndex,
  status,
  isCurrent,
}: {
  stepIndex: number;
  status: StepStatus;
  isCurrent: boolean;
}) {
  const step = STEP_LABELS[stepIndex];
  const Icon = STEP_ICONS[stepIndex];
  const color = step.color;

  return (
    <div className="flex items-center flex-1 min-w-0">
      <motion.div
        className={cn(
          'relative flex-1 min-w-0 rounded-xl border p-3 flex flex-col items-center gap-2 transition-all duration-500',
          status === 'idle' && 'border-[#1E293B] bg-[#0B1120]',
          status === 'active' && 'border-current bg-current/5',
          status === 'complete' && 'border-current/40 bg-current/5'
        )}
        style={{
          borderColor: status !== 'idle' ? color : undefined,
          backgroundColor: status !== 'idle' ? `${color}0D` : undefined,
          boxShadow: status === 'active' ? `0 0 20px ${color}33, 0 0 40px ${color}11` : undefined,
        }}
        animate={status === 'active' ? { scale: [1, 1.02, 1] } : { scale: 1 }}
        transition={{ duration: 1.5, repeat: status === 'active' ? Infinity : 0 }}
      >
        {/* Active pulse ring */}
        {status === 'active' && (
          <motion.div
            className="absolute inset-0 rounded-xl border-2"
            style={{ borderColor: color }}
            animate={{ opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}

        {/* Icon */}
        <div
          className={cn(
            'w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300',
            status === 'idle' && 'bg-[#1E293B]'
          )}
          style={status !== 'idle' ? { backgroundColor: `${color}22` } : {}}
        >
          {status === 'complete' ? (
            <CheckCircle2 className="w-4 h-4" style={{ color: color }} />
          ) : (
            <Icon
              className="w-4 h-4 transition-colors duration-300"
              style={{ color: status === 'idle' ? '#64748B' : color }}
            />
          )}
        </div>

        {/* Labels */}
        <div className="text-center">
          <p
            className="text-[10px] font-bold transition-colors duration-300 leading-tight"
            style={{ color: status === 'idle' ? '#64748B' : color }}
          >
            {step.label}
          </p>
          <p className="text-[9px] text-[#64748B] mt-0.5">{step.labelEn}</p>
        </div>

        {/* Active indicator dot */}
        {status === 'active' && (
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: color }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* Connector arrow */}
      {stepIndex < 4 && (
        <div className="flex-shrink-0 px-1">
          <ChevronRight
            className={cn(
              'w-4 h-4 transition-colors duration-500',
              status === 'complete' ? 'text-[#10B981]' : 'text-[#1E293B]'
            )}
          />
        </div>
      )}
    </div>
  );
}

function VoucherCard({ voucherId }: { voucherId: string }) {
  const voucher = voucherTemplates.find((v) => v.id === voucherId);
  if (!voucher) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative rounded-lg overflow-hidden border border-[#1E293B] bg-[#0B1120] flex"
    >
      {/* Colored left strip */}
      <div className="w-1.5 flex-shrink-0" style={{ backgroundColor: voucher.color }} />

      <div className="flex-1 px-3 py-2.5 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-base">{voucher.icon}</span>
              <span className="text-xs font-bold text-[#E2E8F0]">{voucher.title}</span>
            </div>
            <p className="text-[10px] text-[#64748B] leading-relaxed">{voucher.description}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[9px] text-[#64748B] flex items-center gap-0.5">
                <Clock className="w-2.5 h-2.5" />
                {voucher.validHours}시간
              </span>
              <span className="text-[9px] text-[#64748B] flex items-center gap-0.5">
                <MapPin className="w-2.5 h-2.5" />
                {voucher.location}
              </span>
            </div>
          </div>
          {voucher.value && (
            <span className="text-sm font-bold flex-shrink-0" style={{ color: voucher.color }}>
              {voucher.value}
            </span>
          )}
        </div>
        {/* Barcode-like */}
        <div className="mt-2 pt-2 border-t border-[#1E293B]">
          <p className="text-[8px] font-mono text-[#64748B] tracking-widest truncate">{voucher.barcode}</p>
        </div>
      </div>
    </motion.div>
  );
}

function PhoneNotification({
  scenarioId,
  language,
  onLanguageChange,
}: {
  scenarioId: string;
  language: NotificationLanguage;
  onLanguageChange: (lang: NotificationLanguage) => void;
}) {
  const scenarioNotifs = notifications[scenarioId] ?? [];
  const notif = scenarioNotifs.find((n) => n.language === language) ?? scenarioNotifs[0];
  if (!notif) return null;

  const availableLangs = scenarioNotifs.map((n) => n.language) as NotificationLanguage[];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="flex flex-col items-center gap-3"
    >
      {/* Language toggles */}
      <div className="flex items-center gap-1.5">
        <Globe className="w-3.5 h-3.5 text-[#64748B]" />
        {(['ko', 'en', 'zh', 'ja'] as NotificationLanguage[]).map((lang) => (
          <button
            key={lang}
            onClick={() => onLanguageChange(lang)}
            disabled={!availableLangs.includes(lang)}
            className={cn(
              'text-base transition-all duration-200 rounded px-1',
              language === lang && 'scale-125',
              !availableLangs.includes(lang) && 'opacity-30 cursor-not-allowed'
            )}
            title={lang.toUpperCase()}
          >
            {LANG_FLAGS[lang]}
          </button>
        ))}
        <span className="text-[10px] text-[#64748B] ml-1">언어 선택</span>
      </div>

      {/* Phone frame */}
      <div
        className="relative w-[260px] rounded-[2.5rem] border-2 border-[#1E293B] bg-[#0B1120] overflow-hidden"
        style={{ boxShadow: '0 0 40px rgba(0,180,216,0.12), 0 20px 60px rgba(0,0,0,0.5)' }}
      >
        {/* Notch */}
        <div className="flex justify-center pt-2 pb-1">
          <div className="w-20 h-5 rounded-full bg-[#1E293B]" />
        </div>

        {/* Lock screen area */}
        <div className="px-4 pb-6 pt-2">
          {/* Time */}
          <div className="text-center mb-4">
            <p className="text-3xl font-bold text-[#E2E8F0] font-mono">{notif.time}</p>
            <p className="text-xs text-[#64748B] mt-0.5">2026년 4월 1일</p>
          </div>

          {/* Notification card */}
          <motion.div
            key={language}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl border border-[#1E293B] overflow-hidden"
            style={{
              background: 'rgba(17,24,39,0.85)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* App header */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-[#1E293B]">
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #0047AB, #00B4D8)' }}
              >
                ✈️
              </div>
              <span className="text-[11px] font-semibold text-[#E2E8F0]">{notif.appName}</span>
              <span className="ml-auto text-[10px] text-[#64748B]">{notif.time}</span>
            </div>

            {/* Notification content */}
            <div className="px-3 py-2.5 space-y-2">
              <p className="text-[11px] font-bold text-[#E2E8F0] leading-tight">{notif.title}</p>
              <p className="text-[10px] text-[#94A3B8] leading-relaxed">{notif.body}</p>

              {/* Details */}
              <div className="space-y-1 pt-1 border-t border-[#1E293B]">
                <div className="flex items-start gap-1.5">
                  <span className="text-[9px] text-[#64748B] flex-shrink-0 mt-0.5">기존</span>
                  <span className="text-[9px] text-[#EF4444] leading-tight line-through">
                    {notif.details.originalFlight}
                  </span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-[9px] text-[#64748B] flex-shrink-0 mt-0.5">신규</span>
                  <span className="text-[9px] text-[#10B981] leading-tight">{notif.details.newFlight}</span>
                </div>
                <div className="pt-1 space-y-0.5">
                  {notif.details.vouchers.map((v, i) => (
                    <p key={i} className="text-[9px] text-[#94A3B8]">
                      {v}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Home indicator */}
          <div className="flex justify-center mt-4">
            <div className="w-24 h-1 rounded-full bg-[#1E293B]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DemoPage() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  const [stepStatuses, setStepStatuses] = useState<StepStatus[]>(['idle', 'idle', 'idle', 'idle', 'idle']);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const [currentTypingLog, setCurrentTypingLog] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<1 | 2>(1);
  const [showResults, setShowResults] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationLanguage, setNotificationLanguage] = useState<NotificationLanguage>('ko');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const logContainerRef = useRef<HTMLDivElement>(null);
  const isPlayingRef = useRef(isPlaying);
  const speedRef = useRef(speed);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);
  useEffect(() => { speedRef.current = speed; }, [speed]);

  // Elapsed timer
  useEffect(() => {
    if (!isPlaying || isComplete) return;
    const id = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [isPlaying, isComplete]);

  // Auto-scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [visibleLogs, currentTypingLog]);

  const resetDemo = useCallback(() => {
    abortRef.current?.abort();
    setStepStatuses(['idle', 'idle', 'idle', 'idle', 'idle']);
    setCurrentStep(-1);
    setVisibleLogs([]);
    setCurrentTypingLog('');
    setIsPlaying(false);
    setShowResults(false);
    setShowNotification(false);
    setElapsedSeconds(0);
    setIsComplete(false);
  }, []);

  const selectScenario = useCallback(
    (id: string) => {
      if (id === selectedScenarioId) {
        resetDemo();
        return;
      }
      resetDemo();
      setSelectedScenarioId(id);
      // Auto-start after selecting
      setTimeout(() => {
        setIsPlaying(true);
      }, 400);
    },
    [selectedScenarioId, resetDemo]
  );

  // Typewriter helper: returns a promise that resolves when done (or abort)
  const typewriteLine = useCallback(
    (line: string, signal: AbortSignal): Promise<void> => {
      return new Promise((resolve) => {
        let i = 0;
        setCurrentTypingLog('');
        const charDelay = () => Math.round(25 / speedRef.current);
        const tick = () => {
          if (signal.aborted) { resolve(); return; }
          if (!isPlayingRef.current) {
            // Pause: poll until resumed or aborted
            const poll = setInterval(() => {
              if (signal.aborted) { clearInterval(poll); resolve(); return; }
              if (isPlayingRef.current) { clearInterval(poll); tick(); }
            }, 100);
            return;
          }
          if (i < line.length) {
            i++;
            setCurrentTypingLog(line.slice(0, i));
            setTimeout(tick, charDelay());
          } else {
            // Line complete
            setVisibleLogs((prev) => [...prev, line]);
            setCurrentTypingLog('');
            resolve();
          }
        };
        tick();
      });
    },
    []
  );

  const delay = useCallback((ms: number, signal: AbortSignal): Promise<void> => {
    return new Promise((resolve) => {
      if (signal.aborted) { resolve(); return; }
      const id = setTimeout(() => resolve(), Math.round(ms / speedRef.current));
      signal.addEventListener('abort', () => { clearTimeout(id); resolve(); });
    });
  }, []);

  // Main orchestration
  useEffect(() => {
    if (!isPlaying || !selectedScenarioId || currentStep >= 0) return;

    const scenario = scenarios.find((s) => s.id === selectedScenarioId);
    if (!scenario) return;

    const ctrl = new AbortController();
    abortRef.current = ctrl;
    const { signal } = ctrl;

    (async () => {
      for (let stepIdx = 0; stepIdx < scenario.steps.length; stepIdx++) {
        if (signal.aborted) return;

        setCurrentStep(stepIdx);
        setVisibleLogs([]);
        setCurrentTypingLog('');
        setStepStatuses((prev) => {
          const next = [...prev] as StepStatus[];
          next[stepIdx] = 'active';
          return next;
        });

        const step = scenario.steps[stepIdx];

        for (const log of step.logs) {
          if (signal.aborted) return;
          await typewriteLine(log, signal);
          await delay(180 / speedRef.current, signal);
        }

        await delay(500, signal);

        if (signal.aborted) return;

        // Step 2 (Act): show results
        if (stepIdx === 2) setShowResults(true);
        // Step 4 (Notify): show phone
        if (stepIdx === 4) setShowNotification(true);

        setStepStatuses((prev) => {
          const next = [...prev] as StepStatus[];
          next[stepIdx] = 'complete';
          return next;
        });

        if (stepIdx < scenario.steps.length - 1) {
          await delay(600, signal);
        }
      }

      if (!signal.aborted) {
        setCurrentStep(5); // done
        setIsPlaying(false);
        setIsComplete(true);
      }
    })();

    return () => ctrl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, selectedScenarioId]);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    if (isComplete) {
      resetDemo();
      setTimeout(() => setIsPlaying(true), 100);
      return;
    }
    if (!selectedScenarioId) return;
    if (!isPlaying && currentStep === -1) {
      setIsPlaying(true);
    } else {
      setIsPlaying((p) => !p);
    }
  }, [isComplete, isPlaying, currentStep, selectedScenarioId, resetDemo]);

  const scenario = scenarios.find((s) => s.id === selectedScenarioId);
  const passenger = scenario ? passengers.find((p) => p.id === scenario.passengerId) : null;
  const voucherIds = selectedScenarioId ? SCENARIO_VOUCHER_MAP[selectedScenarioId] ?? [] : [];

  const completedSteps = stepStatuses.filter((s) => s === 'complete').length;
  const progressPct = (completedSteps / 5) * 100;

  const scenarioIndex = scenario ? scenarios.indexOf(scenario) : 0;

  return (
    <div className="min-h-screen bg-[#0B1120] bg-grid">
      {/* Page Header */}
      <div className="border-b border-[#1E293B] bg-[#0B1120]/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #0047AB, #00B4D8)' }}
            >
              <Activity className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-[#E2E8F0]">
                <span className="gradient-text">AI-PORT</span> 에이전틱 AI 라이브 데모
              </h1>
              <p className="text-[10px] text-[#64748B]">Agentic AI Live Simulation — 실제 처리 흐름 시각화</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#64748B] font-mono">
              항공편 이상 감지 → 자율 복구 완료 평균
            </span>
            <span className="text-sm font-bold font-mono text-[#10B981]">4분 03초</span>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-[1400px] mx-auto flex h-[calc(100vh-57px)]">
        {/* ── LEFT PANEL ── */}
        <div className="w-[380px] flex-shrink-0 border-r border-[#1E293B] overflow-y-auto flex flex-col">
          <div className="p-4 space-y-4 flex-1">
            {/* Scenario selector */}
            <div>
              <h2 className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00B4D8] inline-block" />
                시나리오 선택
              </h2>
              <div className="space-y-2">
                {scenarios.map((sc) => (
                  <ScenarioCard
                    key={sc.id}
                    scenario={sc}
                    isSelected={selectedScenarioId === sc.id}
                    onClick={() => selectScenario(sc.id)}
                  />
                ))}
              </div>
            </div>

            {/* Passenger profile */}
            <AnimatePresence mode="wait">
              {passenger && (
                <div key={passenger.id}>
                  <h2 className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] inline-block" />
                    우선 처리 여객
                  </h2>
                  <PassengerCard passengerId={passenger.id} />
                </div>
              )}
            </AnimatePresence>

            {/* Timeline */}
            <AnimatePresence>
              {selectedScenarioId && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <h2 className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] inline-block" />
                    처리 타임라인
                  </h2>
                  <div className="relative pl-6">
                    {/* Vertical line */}
                    <div className="absolute left-2.5 top-2 bottom-2 w-px bg-[#1E293B]" />
                    <div
                      className="absolute left-2.5 top-2 w-px bg-[#10B981] transition-all duration-500"
                      style={{ height: `${Math.max(0, completedSteps / 5) * 100}%` }}
                    />

                    <div className="space-y-5">
                      {STEP_LABELS.map((step, idx) => {
                        const st = stepStatuses[idx];
                        const ts = STEP_TIMESTAMPS[idx][scenarioIndex] ?? '--:--';
                        return (
                          <div key={step.id} className="relative flex items-start gap-3">
                            {/* Dot */}
                            <div
                              className={cn(
                                'absolute -left-[1.35rem] w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300',
                                st === 'idle' && 'border-[#1E293B] bg-[#0B1120]',
                                st === 'active' && 'border-current bg-current/20',
                                st === 'complete' && 'border-[#10B981] bg-[#10B981]'
                              )}
                              style={{
                                borderColor: st === 'active' ? step.color : undefined,
                                backgroundColor: st === 'active' ? `${step.color}22` : undefined,
                              }}
                            >
                              {st === 'active' && (
                                <motion.div
                                  className="w-1.5 h-1.5 rounded-full"
                                  style={{ backgroundColor: step.color }}
                                  animate={{ scale: [1, 1.5, 1] }}
                                  transition={{ duration: 0.8, repeat: Infinity }}
                                />
                              )}
                              {st === 'complete' && (
                                <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                              )}
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span
                                  className="text-[10px] font-mono font-semibold transition-colors duration-300"
                                  style={{ color: st === 'idle' ? '#64748B' : step.color }}
                                >
                                  {ts}
                                </span>
                                <span
                                  className={cn(
                                    'text-xs font-semibold transition-colors duration-300',
                                    st === 'idle' && 'text-[#64748B]',
                                    st === 'active' && 'text-[#E2E8F0]',
                                    st === 'complete' && 'text-[#10B981]'
                                  )}
                                >
                                  {step.label}
                                </span>
                              </div>
                              <p className="text-[10px] text-[#64748B]">{step.labelEn}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Elapsed counter */}
                  <div className="mt-4 pt-3 border-t border-[#1E293B] flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Timer className="w-3.5 h-3.5 text-[#64748B]" />
                      <span className="text-xs text-[#64748B]">경과 시간</span>
                    </div>
                    <span className="text-sm font-bold font-mono text-[#E2E8F0]">
                      {String(Math.floor(elapsedSeconds / 60)).padStart(2, '0')}:
                      {String(elapsedSeconds % 60).padStart(2, '0')}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
          {/* Controls bar */}
          <div className="flex-shrink-0 border-b border-[#1E293B] bg-[#111827] px-5 py-3 flex items-center gap-4">
            {/* Play / Pause / Reset */}
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                disabled={!selectedScenarioId}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200',
                  'disabled:opacity-40 disabled:cursor-not-allowed',
                  isPlaying
                    ? 'bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/30 hover:bg-[#F59E0B]/20'
                    : 'bg-[#0047AB]/20 text-[#00B4D8] border border-[#0047AB]/40 hover:bg-[#0047AB]/30'
                )}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isComplete ? '다시 실행' : isPlaying ? '일시 정지' : '자동 재생'}
              </button>
              <button
                onClick={resetDemo}
                disabled={!selectedScenarioId}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-[#64748B] border border-[#1E293B] hover:border-[#94A3B8] hover:text-[#94A3B8] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                리셋
              </button>
            </div>

            {/* Step indicator */}
            <div className="flex items-center gap-2">
              {currentStep >= 0 && currentStep < 5 && (
                <span className="text-xs font-mono text-[#E2E8F0]">
                  <span className="text-[#64748B]">STEP </span>
                  <span style={{ color: STEP_LABELS[currentStep]?.color }}>
                    {currentStep + 1}/5
                  </span>
                  <span className="text-[#64748B]"> — </span>
                  {STEP_LABELS[currentStep]?.label}
                </span>
              )}
              {isComplete && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs font-semibold text-[#10B981] flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  전체 처리 완료
                </motion.span>
              )}
              {!selectedScenarioId && (
                <span className="text-xs text-[#64748B]">← 시나리오를 선택하세요</span>
              )}
            </div>

            {/* Speed toggle */}
            <div className="ml-auto flex items-center gap-1.5">
              <span className="text-[10px] text-[#64748B]">속도</span>
              {([1, 2] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={cn(
                    'px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all',
                    speed === s
                      ? 'bg-[#0047AB]/30 text-[#00B4D8] border border-[#0047AB]/50'
                      : 'text-[#64748B] border border-[#1E293B] hover:border-[#94A3B8]'
                  )}
                >
                  {s}×
                </button>
              ))}
            </div>

            {/* Progress bar */}
            <div className="w-32 h-1.5 rounded-full bg-[#1E293B] overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #0047AB, #00B4D8)' }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Pipeline */}
          <div className="flex-shrink-0 border-b border-[#1E293B] bg-[#0B1120] px-5 py-4">
            <div className="flex items-stretch gap-0">
              {STEP_LABELS.map((_, idx) => (
                <PipelineCard
                  key={idx}
                  stepIndex={idx}
                  status={stepStatuses[idx]}
                  isCurrent={currentStep === idx}
                />
              ))}
            </div>
          </div>

          {/* Main content area */}
          <div className="flex-1 min-h-0 flex overflow-hidden">
            {/* AI Thinking Log */}
            <div className="flex-1 min-w-0 flex flex-col p-4">
              {/* Log terminal */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                  <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                  <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                </div>
                <span className="text-[10px] font-mono text-[#64748B] ml-1">
                  AI-PORT Agent Terminal — {scenario?.nameEn ?? 'No scenario selected'}
                </span>
              </div>

              <div
                ref={logContainerRef}
                className="flex-1 rounded-xl overflow-y-auto p-4 font-mono text-xs leading-relaxed"
                style={{ background: '#060A12', border: '1px solid #1E293B' }}
              >
                {!selectedScenarioId && (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-[#111827] flex items-center justify-center border border-[#1E293B]">
                      <Radar className="w-6 h-6 text-[#1E293B]" />
                    </div>
                    <p className="text-[#64748B] text-sm">시나리오를 선택하면</p>
                    <p className="text-[#64748B] text-sm">AI 에이전트 처리 로그가 여기에 표시됩니다.</p>
                  </div>
                )}

                {selectedScenarioId && visibleLogs.length === 0 && !currentTypingLog && !isPlaying && (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-[#0047AB]/10 flex items-center justify-center border border-[#0047AB]/20">
                      <Play className="w-6 h-6 text-[#0047AB]" />
                    </div>
                    <p className="text-[#64748B] text-sm">재생 버튼을 눌러 데모를 시작하세요.</p>
                  </div>
                )}

                <div className="space-y-0.5">
                  {visibleLogs.map((log, i) => (
                    <div key={i} className={cn('py-0.5', getLogLineClass(log))}>
                      {renderLogLine(log)}
                    </div>
                  ))}
                  {currentTypingLog && (
                    <div className={cn('py-0.5 cursor-blink', getLogLineClass(currentTypingLog))}>
                      {renderLogLine(currentTypingLog)}
                    </div>
                  )}
                </div>

                {/* Complete banner */}
                <AnimatePresence>
                  {isComplete && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 rounded-lg border border-[#10B981]/30 bg-[#10B981]/5 px-4 py-3 flex items-center gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-[#10B981]">전체 처리 완료</p>
                        <p className="text-xs text-[#64748B] mt-0.5">
                          소요 시간: {String(Math.floor(elapsedSeconds / 60)).padStart(2, '0')}:{String(elapsedSeconds % 60).padStart(2, '0')} — 안내 데스크 방문 없이 자율 처리 완료
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right side panel: Results + Phone */}
            <div className="w-[300px] flex-shrink-0 border-l border-[#1E293B] overflow-y-auto p-4 space-y-4">
              {/* Action Results */}
              <AnimatePresence>
                {showResults && selectedScenarioId && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  >
                    <h3 className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Ticket className="w-3.5 h-3.5 text-[#0047AB]" />
                      발급 바우처
                    </h3>

                    {/* New flight card */}
                    {scenario?.steps[2]?.results?.newFlight && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="mb-3 rounded-xl border border-[#0047AB]/30 bg-[#0047AB]/5 p-3"
                        style={{ boxShadow: '0 0 20px rgba(0,71,171,0.15)' }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Plane className="w-3.5 h-3.5 text-[#00B4D8]" />
                          <span className="text-[10px] font-bold text-[#00B4D8] uppercase tracking-wider">대체 항공편 확보</span>
                        </div>
                        <p className="text-sm font-bold text-[#E2E8F0] font-mono">
                          {String(scenario.steps[2].results.newFlight)}
                        </p>
                        {scenario.steps[2].results.seat && (
                          <p className="text-xs text-[#94A3B8] mt-0.5">
                            좌석: {String(scenario.steps[2].results.seat)}
                          </p>
                        )}
                        {scenario.steps[2].results.decision && (
                          <p className="text-xs text-[#94A3B8] mt-0.5 leading-relaxed">
                            {String(scenario.steps[2].results.decision)}
                          </p>
                        )}
                      </motion.div>
                    )}

                    <div className="space-y-2">
                      {voucherIds.map((vid, i) => (
                        <motion.div
                          key={vid}
                          initial={{ opacity: 0, x: 15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 + i * 0.1, type: 'spring', stiffness: 300 }}
                        >
                          <VoucherCard voucherId={vid} />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Phone notification */}
              <AnimatePresence>
                {showNotification && selectedScenarioId && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3 className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Smartphone className="w-3.5 h-3.5 text-[#00B4D8]" />
                      앱 푸시 알림
                    </h3>
                    <PhoneNotification
                      scenarioId={selectedScenarioId}
                      language={notificationLanguage}
                      onLanguageChange={setNotificationLanguage}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Placeholder */}
              {!showResults && !showNotification && (
                <div className="flex flex-col items-center justify-center h-64 text-center space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#111827] flex items-center justify-center border border-[#1E293B]">
                    <Zap className="w-5 h-5 text-[#1E293B]" />
                  </div>
                  <p className="text-[11px] text-[#64748B] leading-relaxed">
                    Step 3 실행 시<br />바우처 및 알림이<br />여기에 표시됩니다.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
