export const SITE_NAME = 'AI-PORT';
export const SITE_DESCRIPTION = '에이전틱 AI 기반 항공편 이상 상황 자율 복구 및 터미널 혼잡 실시간 분산 시스템';

export const NAV_ITEMS = [
  { label: '홈', href: '/' },
  { label: '운항 현황', href: '/dashboard' },
  { label: 'AI 데모', href: '/demo' },
  { label: '혼잡도', href: '/congestion' },
  { label: '기대효과', href: '/impact' },
  { label: '아키텍처', href: '/architecture' },
] as const;

export const AIRLINES: Record<string, { name: string; nameEn: string; color: string }> = {
  KE: { name: '대한항공', nameEn: 'Korean Air', color: '#00256C' },
  OZ: { name: '아시아나항공', nameEn: 'Asiana Airlines', color: '#C6002B' },
  AA: { name: '아메리칸항공', nameEn: 'American Airlines', color: '#0078D2' },
  UA: { name: '유나이티드항공', nameEn: 'United Airlines', color: '#002244' },
  JL: { name: '일본항공', nameEn: 'Japan Airlines', color: '#C8102E' },
  NH: { name: '전일본공수', nameEn: 'All Nippon Airways', color: '#003A70' },
  CX: { name: '캐세이퍼시픽', nameEn: 'Cathay Pacific', color: '#005D30' },
  SQ: { name: '싱가포르항공', nameEn: 'Singapore Airlines', color: '#F0AB00' },
  LH: { name: '루프트한자', nameEn: 'Lufthansa', color: '#05164D' },
  AF: { name: '에어프랑스', nameEn: 'Air France', color: '#002157' },
  BA: { name: '브리티시항공', nameEn: 'British Airways', color: '#2E5C99' },
  TG: { name: '타이항공', nameEn: 'Thai Airways', color: '#4B0082' },
  VN: { name: '베트남항공', nameEn: 'Vietnam Airlines', color: '#E31937' },
  MU: { name: '중국동방항공', nameEn: 'China Eastern', color: '#003DA5' },
  CA: { name: '중국국제항공', nameEn: 'Air China', color: '#E60012' },
};

export const CITIES: Record<string, { nameKo: string; nameEn: string; country: string }> = {
  NRT: { nameKo: '도쿄/나리타', nameEn: 'Tokyo/Narita', country: 'JP' },
  HND: { nameKo: '도쿄/하네다', nameEn: 'Tokyo/Haneda', country: 'JP' },
  KIX: { nameKo: '오사카', nameEn: 'Osaka/Kansai', country: 'JP' },
  PVG: { nameKo: '상하이/푸동', nameEn: 'Shanghai/Pudong', country: 'CN' },
  PEK: { nameKo: '베이징', nameEn: 'Beijing', country: 'CN' },
  HKG: { nameKo: '홍콩', nameEn: 'Hong Kong', country: 'HK' },
  BKK: { nameKo: '방콕', nameEn: 'Bangkok', country: 'TH' },
  SIN: { nameKo: '싱가포르', nameEn: 'Singapore', country: 'SG' },
  CDG: { nameKo: '파리', nameEn: 'Paris/CDG', country: 'FR' },
  LHR: { nameKo: '런던', nameEn: 'London/Heathrow', country: 'GB' },
  FRA: { nameKo: '프랑크푸르트', nameEn: 'Frankfurt', country: 'DE' },
  JFK: { nameKo: '뉴욕', nameEn: 'New York/JFK', country: 'US' },
  LAX: { nameKo: '로스앤젤레스', nameEn: 'Los Angeles', country: 'US' },
  SFO: { nameKo: '샌프란시스코', nameEn: 'San Francisco', country: 'US' },
  SGN: { nameKo: '호치민', nameEn: 'Ho Chi Minh', country: 'VN' },
  MNL: { nameKo: '마닐라', nameEn: 'Manila', country: 'PH' },
  TPE: { nameKo: '타이베이', nameEn: 'Taipei', country: 'TW' },
  KUL: { nameKo: '쿠알라룸푸르', nameEn: 'Kuala Lumpur', country: 'MY' },
  SYD: { nameKo: '시드니', nameEn: 'Sydney', country: 'AU' },
};

export type FlightStatus = 'normal' | 'delayed' | 'cancelled' | 'boarding';

export const STATUS_CONFIG: Record<FlightStatus, { label: string; labelEn: string; color: string; bg: string }> = {
  normal: { label: '정상', labelEn: 'On Time', color: '#10B981', bg: 'rgba(16,185,129,0.15)' },
  delayed: { label: '지연', labelEn: 'Delayed', color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
  cancelled: { label: '결항', labelEn: 'Cancelled', color: '#EF4444', bg: 'rgba(239,68,68,0.15)' },
  boarding: { label: '탑승중', labelEn: 'Boarding', color: '#0047AB', bg: 'rgba(0,71,171,0.15)' },
};

export const STEP_LABELS = [
  { id: 'trigger', label: '이상 감지', labelEn: 'Trigger', icon: 'Radar', color: '#F59E0B' },
  { id: 'analyze', label: '여객 분석', labelEn: 'Analyze', icon: 'Search', color: '#8B5CF6' },
  { id: 'act', label: '자율 실행', labelEn: 'Act', icon: 'Zap', color: '#0047AB' },
  { id: 'disperse', label: '혼잡 분산', labelEn: 'Disperse', icon: 'LayoutGrid', color: '#10B981' },
  { id: 'notify', label: '알림 전송', labelEn: 'Notify', icon: 'Bell', color: '#00B4D8' },
] as const;
