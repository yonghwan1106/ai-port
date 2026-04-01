export interface Passenger {
  id: string;
  name: string;
  nameEn: string;
  age: number;
  nationality: string;
  flightNo: string;
  seatClass: 'economy' | 'business' | 'first';
  isTransfer: boolean;
  transferFlight?: string;
  transferDestination?: string;
  companions: number;
  companionType?: string;
  purpose: string;
  urgencyScore: number; // 1-5
  frequentFlyer?: string;
  phone: string;
  language: 'ko' | 'en' | 'zh' | 'ja';
}

export const passengers: Passenger[] = [
  // Demo scenario 1: Business traveler with transfer
  {
    id: 'p1',
    name: '김영수',
    nameEn: 'Kim Youngsoo',
    age: 38,
    nationality: 'KR',
    flightNo: 'KE703',
    seatClass: 'business',
    isTransfer: true,
    transferFlight: 'NH204',
    transferDestination: 'JFK',
    companions: 0,
    purpose: '해외 출장 (IT 컨퍼런스)',
    urgencyScore: 5,
    frequentFlyer: 'KE Skypass Platinum',
    phone: '010-****-3847',
    language: 'ko',
  },
  // Demo scenario 2: Family with infant
  {
    id: 'p2',
    name: '이지현',
    nameEn: 'Lee Jihyun',
    age: 35,
    nationality: 'KR',
    flightNo: 'OZ741',
    seatClass: 'economy',
    isTransfer: false,
    companions: 3,
    companionType: '배우자 + 자녀 2명 (5세, 2세)',
    purpose: '가족 여행',
    urgencyScore: 4,
    phone: '010-****-9201',
    language: 'ko',
  },
  // Demo scenario 3: Foreign tourist
  {
    id: 'p3',
    name: 'Sarah Johnson',
    nameEn: 'Sarah Johnson',
    age: 29,
    nationality: 'US',
    flightNo: 'AA280',
    seatClass: 'economy',
    isTransfer: false,
    companions: 1,
    companionType: 'Friend',
    purpose: 'Tourism (first visit to Korea)',
    urgencyScore: 3,
    phone: '+1-***-***-4521',
    language: 'en',
  },
  // Background passengers
  {
    id: 'p4',
    name: '다나카 히로시',
    nameEn: 'Tanaka Hiroshi',
    age: 52,
    nationality: 'JP',
    flightNo: 'KE703',
    seatClass: 'first',
    isTransfer: false,
    companions: 0,
    purpose: '비즈니스 미팅',
    urgencyScore: 3,
    frequentFlyer: 'KE Skypass Diamond',
    phone: '+81-***-****-7890',
    language: 'ja',
  },
  {
    id: 'p5',
    name: '왕 웨이',
    nameEn: 'Wang Wei',
    age: 45,
    nationality: 'CN',
    flightNo: 'KE651',
    seatClass: 'business',
    isTransfer: true,
    transferFlight: 'KE861',
    transferDestination: 'SIN',
    companions: 1,
    companionType: '배우자',
    purpose: '관광',
    urgencyScore: 4,
    phone: '+86-***-****-3456',
    language: 'zh',
  },
  {
    id: 'p6',
    name: '박서연',
    nameEn: 'Park Seoyeon',
    age: 27,
    nationality: 'KR',
    flightNo: 'KE703',
    seatClass: 'economy',
    isTransfer: false,
    companions: 0,
    purpose: '워킹홀리데이',
    urgencyScore: 2,
    phone: '010-****-5678',
    language: 'ko',
  },
  {
    id: 'p7',
    name: 'Michael Chen',
    nameEn: 'Michael Chen',
    age: 61,
    nationality: 'US',
    flightNo: 'AA280',
    seatClass: 'business',
    isTransfer: false,
    companions: 1,
    companionType: 'Spouse',
    purpose: 'Cultural tour',
    urgencyScore: 2,
    frequentFlyer: 'AA Executive Platinum',
    phone: '+1-***-***-8901',
    language: 'en',
  },
  {
    id: 'p8',
    name: '최민호',
    nameEn: 'Choi Minho',
    age: 43,
    nationality: 'KR',
    flightNo: 'JL954',
    seatClass: 'business',
    isTransfer: true,
    transferFlight: 'JL006',
    transferDestination: 'JFK',
    companions: 0,
    purpose: '해외 출장',
    urgencyScore: 5,
    frequentFlyer: 'JMB Diamond',
    phone: '010-****-1234',
    language: 'ko',
  },
];
