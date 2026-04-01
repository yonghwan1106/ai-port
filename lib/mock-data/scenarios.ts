export interface ScenarioStep {
  id: string;
  stepIndex: number;
  title: string;
  duration: number; // ms
  logs: string[];
  results?: Record<string, string | number | string[]>;
}

export interface Scenario {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  passengerId: string;
  flightNo: string;
  icon: string;
  steps: ScenarioStep[];
}

export const scenarios: Scenario[] = [
  {
    id: 'scenario1',
    name: '김영수 과장 — 도쿄 경유 뉴욕행 환승',
    nameEn: 'Mr. Kim — ICN→NRT→JFK Transit',
    description: 'KE703 2시간 지연으로 환승편 탑승 불가 위기. AI가 4분 만에 대체 경로 확보.',
    passengerId: 'p1',
    flightNo: 'KE703',
    icon: '💼',
    steps: [
      {
        id: 's1-trigger',
        stepIndex: 0,
        title: '실시간 이상 감지 (Trigger)',
        duration: 2500,
        logs: [
          '[14:20:00] 운항현황 API 폴링 수행 중...',
          '[14:20:01] ⚠️ 상태 변경 감지: KE703 (ICN→NRT)',
          '[14:20:01] 이전 상태: ON_TIME → 현재 상태: DELAYED',
          '[14:20:02] 지연 시간: +120분 (14:50 → 16:50)',
          '[14:20:02] 지연 사유: 기상 악화 (도쿄 나리타 지역 강풍 주의보)',
          '[14:20:02] 🔔 에이전틱 AI 트리거 발동 → 영향 분석 개시',
        ],
      },
      {
        id: 's1-analyze',
        stepIndex: 1,
        title: '영향 여객 자율 분석 (Analyze)',
        duration: 3500,
        logs: [
          '[14:21:00] KE703 탑승 예정 여객 382명 프로필 스캔 중...',
          '[14:21:01] 환승 여객 식별: 23명 / 382명',
          '[14:21:02] ⚡ 최우선 대상: 김영수 (38세, 비즈니스석)',
          '[14:21:02]   → 환승편: NRT 18:30 NH204 (NRT→JFK)',
          '[14:21:03]   → KE703 도착 예정: 19:10 (현지시간)',
          '[14:21:03]   → 환승편 탑승 불가 확률: 92%',
          '[14:21:04]   → 긴급도: ★★★★★ (환승 불가 + 비즈니스석 + Skypass Platinum)',
          '[14:21:05] 추가 고위험 여객: 4명 (환승 불가 확률 70%+)',
          '[14:21:05] 일반 영향 여객: 355명 (지연 안내 필요)',
        ],
        results: {
          totalAffected: 382,
          transferPassengers: 23,
          highRisk: 5,
          topPriority: '김영수 (환승 불가 92%)',
        },
      },
      {
        id: 's1-act',
        stepIndex: 2,
        title: '대체 방안 자율 실행 (Act)',
        duration: 4500,
        logs: [
          '[14:22:00] 대체 항공편 검색 시작...',
          '[14:22:01] 후보 1: NH862 15:00 ICN→NRT (좌석 여유: 12석) → JFK 연결 ✓',
          '[14:22:01] 후보 2: JL952 09:30 ICN→NRT (출발 완료) → ✗ 제외',
          '[14:22:02] 후보 3: NH204 17:30 ICN→NRT (좌석 여유: 8석) → JFK 20:15 연결 ✓',
          '[14:22:03] 최적 경로 선택: NH204 17:30 → NRT → JFK 20:15',
          '[14:22:03]   → 사유: 환승 시간 충분 (2시간 45분), 비즈니스석 잔여 확인',
          '[14:22:04] NH 예약 시스템 연동 → 좌석 확보 요청 전송...',
          '[14:22:05] ✅ NH204 비즈니스석 3A 확보 완료',
          '[14:22:06] 🛋️ 바우처 발급: 3층 동편 라운지 (6시간, 잔여 수용: 68%)',
          '[14:22:07] 🍽️ 식사 쿠폰 발급: ₩30,000 (4층 식당가)',
          '[14:22:08] 🛍️ 면세점 할인쿠폰 발급: 10% (2층 면세구역 B)',
        ],
        results: {
          newFlight: 'NH204 17:30 → NRT',
          seat: 'Business 3A',
          vouchers: ['라운지 바우처 (6시간)', '식사 쿠폰 ₩30,000', '면세점 10% 할인'],
        },
      },
      {
        id: 's1-disperse',
        stepIndex: 3,
        title: '터미널 혼잡 분산 (Disperse)',
        duration: 3000,
        logs: [
          '[14:23:00] 출국장 혼잡도 API 조회 중...',
          '[14:23:01] T2 출국장 P03: 밀집도 87% ⚠️ (KE703 탑승구 230번 인근)',
          '[14:23:01] T2 동편 라운지: 밀집도 32% ✅ (여유)',
          '[14:23:02] T2 면세구역 B: 밀집도 45% ✅ (여유)',
          '[14:23:02] 혼잡 분산 전략: P03 → 3층 동편 라운지로 유도',
          '[14:23:03] 맞춤형 쿠폰으로 여유 구역 유도 중...',
          '[14:23:03] 📊 예상 효과: P03 밀집도 87% → 62% (25%p 감소)',
        ],
        results: {
          hotZone: 'T2 출국장 P03 (87%)',
          targetZone: 'T2 동편 라운지 (32%)',
          expectedReduction: '25%p',
        },
      },
      {
        id: 's1-notify',
        stepIndex: 4,
        title: '선제적 알림 전송 (Notify)',
        duration: 2500,
        logs: [
          '[14:24:00] 알림 메시지 생성 중 (한국어)...',
          '[14:24:01] 여객 프로필 기반 언어 설정: 한국어 (KR)',
          '[14:24:01] 인천공항 앱 푸시 알림 전송 준비...',
          '[14:24:02] ✅ 푸시 알림 전송 완료 → 김영수 (010-****-3847)',
          '[14:24:02] 알림 내용: 대체편 확보 + 라운지 바우처 + 면세점 쿠폰',
          '[14:24:03] ✅ 전체 처리 완료 — 소요 시간: 4분 3초',
          '[14:24:03] → 안내데스크 방문 없이, 라운지에서 편안히 대기 후 대체편 탑승 완료.',
        ],
      },
    ],
  },
  {
    id: 'scenario2',
    name: '이지현 가족 — 방콕 가족여행 결항',
    nameEn: 'Lee Family — BKK Family Trip Cancelled',
    description: 'OZ741 결항으로 유아 동반 가족 4인 긴급 대응. 키즈존 + 가족 라운지 유도.',
    passengerId: 'p2',
    flightNo: 'OZ741',
    icon: '👨‍👩‍👧‍👦',
    steps: [
      {
        id: 's2-trigger',
        stepIndex: 0,
        title: '실시간 이상 감지 (Trigger)',
        duration: 2500,
        logs: [
          '[15:30:00] 운항현황 API 폴링 수행 중...',
          '[15:30:01] 🚨 상태 변경 감지: OZ741 (ICN→BKK)',
          '[15:30:01] 이전 상태: ON_TIME → 현재 상태: CANCELLED',
          '[15:30:02] 결항 사유: 항공기 정비 (엔진 점검 필요)',
          '[15:30:02] 🔔 에이전틱 AI 트리거 발동 → 영향 분석 개시',
        ],
      },
      {
        id: 's2-analyze',
        stepIndex: 1,
        title: '영향 여객 자율 분석 (Analyze)',
        duration: 3500,
        logs: [
          '[15:31:00] OZ741 탑승 예정 여객 311명 프로필 스캔 중...',
          '[15:31:01] 유아 동반 가족 식별: 8가족 / 311명',
          '[15:31:02] ⚡ 우선 대상: 이지현 가족 (4인, 유아 2세 포함)',
          '[15:31:03]   → 동반자: 배우자 + 자녀 5세 + 자녀 2세',
          '[15:31:03]   → 결항 → 당일 대체편 필요 (가족 4석)',
          '[15:31:04]   → 긴급도: ★★★★☆ (유아 동반 + 좌석 4석 확보 필요)',
        ],
        results: {
          totalAffected: 311,
          familiesWithInfants: 8,
          topPriority: '이지현 가족 (유아 2세 포함 4인)',
        },
      },
      {
        id: 's2-act',
        stepIndex: 2,
        title: '대체 방안 자율 실행 (Act)',
        duration: 4500,
        logs: [
          '[15:32:00] 당일 BKK행 대체편 검색 시작...',
          '[15:32:01] 후보 1: KE781 22:10 ICN→BKK (좌석 여유: 23석) ✓',
          '[15:32:02] 후보 2: TG659 18:45 ICN→BKK (좌석 여유: 15석) ✓',
          '[15:32:03] 최적 선택: TG659 18:45 (대기 시간 최소화, 유아 배려)',
          '[15:32:04] TG 예약 시스템 → 좌석 4석 확보 요청...',
          '[15:32:05] ✅ TG659 이코노미 4석 (22A-D, 앞좌석 유아 바시넷) 확보',
          '[15:32:06] 👶 키즈존 이용권 발급: 3층 서편 (놀이시설, 수유실)',
          '[15:32:07] 🍽️ 가족 식사 쿠폰: ₩80,000 (4층 식당가)',
          '[15:32:08] 🛋️ 패밀리 라운지 바우처 발급',
        ],
        results: {
          newFlight: 'TG659 18:45 → BKK',
          seat: 'Economy 22A-D (유아 바시넷석)',
          vouchers: ['키즈존 이용권', '가족 식사 ₩80,000', '패밀리 라운지'],
        },
      },
      {
        id: 's2-disperse',
        stepIndex: 3,
        title: '터미널 혼잡 분산 (Disperse)',
        duration: 3000,
        logs: [
          '[15:33:00] T1 혼잡도 분석 중...',
          '[15:33:01] T1 출국장 P02: 밀집도 80% ⚠️',
          '[15:33:02] T1 키즈존 (3층 서편): 밀집도 35% ✅',
          '[15:33:02] 유아 동반 가족 → 키즈존 유도 (놀이+수유 시설)',
          '[15:33:03] 📊 예상 효과: P02 밀집도 80% → 65%',
        ],
      },
      {
        id: 's2-notify',
        stepIndex: 4,
        title: '선제적 알림 전송 (Notify)',
        duration: 2500,
        logs: [
          '[15:34:00] 알림 메시지 생성 (한국어)...',
          '[15:34:01] ✅ 푸시 알림 전송 완료 → 이지현 (010-****-9201)',
          '[15:34:02] 알림: 대체편 TG659 확보 + 키즈존 + 가족 식사 쿠폰',
          '[15:34:02] ✅ 전체 처리 완료 — 소요 시간: 4분 2초',
        ],
      },
    ],
  },
  {
    id: 'scenario3',
    name: 'Sarah Johnson — 파리행 3시간 지연',
    nameEn: 'Sarah Johnson — CDG 3hr Delay',
    description: 'AA280 3시간 지연. 외국인 관광객에게 영어 알림 + 프리미엄 라운지 유도.',
    passengerId: 'p3',
    flightNo: 'AA280',
    icon: '🌏',
    steps: [
      {
        id: 's3-trigger',
        stepIndex: 0,
        title: 'Real-time Anomaly Detection (Trigger)',
        duration: 2500,
        logs: [
          '[13:00:00] Flight status API polling...',
          '[13:00:01] ⚠️ Status change detected: AA280 (ICN→CDG)',
          '[13:00:01] Previous: ON_TIME → Current: DELAYED',
          '[13:00:02] Delay: +180min (13:00 → 16:00)',
          '[13:00:02] Reason: European ATFM restriction (route congestion)',
          '[13:00:02] 🔔 Agentic AI triggered → Impact analysis initiated',
        ],
      },
      {
        id: 's3-analyze',
        stepIndex: 1,
        title: 'Passenger Impact Analysis (Analyze)',
        duration: 3500,
        logs: [
          '[13:01:00] Scanning 396 passengers on AA280...',
          '[13:01:01] Foreign nationals identified: 187 / 396',
          '[13:01:02] ⚡ Priority: Sarah Johnson (29, US citizen)',
          '[13:01:02]   → Language preference: English',
          '[13:01:03]   → First visit to Korea, tourism purpose',
          '[13:01:03]   → 3-hour delay = premium experience opportunity',
          '[13:01:04]   → Urgency: ★★★☆☆ (no transfer, but long wait)',
        ],
        results: {
          totalAffected: 396,
          foreignNationals: 187,
          topPriority: 'Sarah Johnson (first-time Korea visitor)',
        },
      },
      {
        id: 's3-act',
        stepIndex: 2,
        title: 'Autonomous Action Execution (Act)',
        duration: 4500,
        logs: [
          '[13:02:00] Searching alternative CDG flights...',
          '[13:02:01] Option 1: AF264 20:00 ICN→CDG (seats: 28) ✓',
          '[13:02:02] Option 2: KE061 11:50 ICN→CDG (departed) ✗',
          '[13:02:03] Recommendation: Keep AA280 (16:00) + premium wait experience',
          '[13:02:03]   → Reason: 3hr delay manageable, AF264 would extend total by 4hrs',
          '[13:02:04] 🛋️ Premium Lounge voucher issued (T1 4F, 8 hours)',
          '[13:02:05] 🍽️ Restaurant voucher: ₩40,000 (Korean cuisine recommended)',
          '[13:02:06] 🛍️ Duty-Free 15% coupon (Korean cosmetics section)',
        ],
        results: {
          decision: 'Keep original AA280 (16:00) + premium experience',
          vouchers: ['Premium Lounge (8hrs)', 'Restaurant ₩40,000', 'Duty-Free 15%'],
        },
      },
      {
        id: 's3-disperse',
        stepIndex: 3,
        title: 'Terminal Congestion Dispersal (Disperse)',
        duration: 3000,
        logs: [
          '[13:03:00] T1 congestion analysis...',
          '[13:03:01] T1 Gate 115 area: 72% density ⚠️',
          '[13:03:02] T1 Premium Lounge (4F): 45% density ✅',
          '[13:03:02] T1 Duty-Free Zone B: 38% density ✅',
          '[13:03:03] Strategy: Guide to lounge + Korean cosmetics zone',
          '[13:03:03] 📊 Expected: Gate area 72% → 58%',
        ],
      },
      {
        id: 's3-notify',
        stepIndex: 4,
        title: 'Proactive Notification (Notify)',
        duration: 2500,
        logs: [
          '[13:04:00] Generating notification (English)...',
          '[13:04:01] Language auto-detected: English (US passport)',
          '[13:04:02] ✅ Push notification sent → Sarah Johnson',
          '[13:04:02] Content: Delay info + Lounge + Restaurant + Duty-Free',
          '[13:04:03] ✅ Complete — Total processing time: 4min 3sec',
        ],
      },
    ],
  },
];
