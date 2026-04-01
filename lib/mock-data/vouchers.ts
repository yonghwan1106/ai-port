export interface Voucher {
  id: string;
  type: 'lounge' | 'meal' | 'dutyfree' | 'kids';
  icon: string;
  title: string;
  titleEn: string;
  description: string;
  value?: string;
  validHours: number;
  location: string;
  barcode: string;
  color: string;
}

export const voucherTemplates: Voucher[] = [
  {
    id: 'v1',
    type: 'lounge',
    icon: '🛋️',
    title: '라운지 바우처',
    titleEn: 'Lounge Voucher',
    description: '프레스티지 라운지 무료 이용',
    validHours: 6,
    location: 'T2 3층 동편 라운지',
    barcode: 'ICN-LNG-2026-04-01-001',
    color: '#0047AB',
  },
  {
    id: 'v2',
    type: 'meal',
    icon: '🍽️',
    title: '식사 쿠폰',
    titleEn: 'Meal Coupon',
    description: '공항 내 식당가 이용 가능',
    value: '₩30,000',
    validHours: 8,
    location: 'T2 4층 식당가 전 매장',
    barcode: 'ICN-MEL-2026-04-01-001',
    color: '#10B981',
  },
  {
    id: 'v3',
    type: 'dutyfree',
    icon: '🛍️',
    title: '면세점 할인쿠폰',
    titleEn: 'Duty-Free Discount',
    description: '면세구역 전 매장 10% 할인',
    value: '10% OFF',
    validHours: 12,
    location: 'T2 면세구역 B',
    barcode: 'ICN-DTF-2026-04-01-001',
    color: '#8B5CF6',
  },
  {
    id: 'v4',
    type: 'kids',
    icon: '👶',
    title: '키즈존 이용권',
    titleEn: 'Kids Zone Pass',
    description: '놀이시설 + 수유실 무료 이용',
    validHours: 4,
    location: 'T1 3층 서편 키즈존',
    barcode: 'ICN-KID-2026-04-01-001',
    color: '#F59E0B',
  },
];
