export interface Notification {
  language: 'ko' | 'en' | 'zh' | 'ja';
  title: string;
  body: string;
  details: {
    originalFlight: string;
    newFlight: string;
    vouchers: string[];
  };
  time: string;
  appName: string;
}

export const notifications: Record<string, Notification[]> = {
  scenario1: [
    {
      language: 'ko',
      title: '✈️ 대체 항공편이 확보되었습니다',
      body: '김영수님, KE703편(도쿄/나리타행)이 2시간 지연되어 환승편 연결이 어렵습니다. AI가 최적 대체 경로를 확보했습니다.',
      details: {
        originalFlight: 'KE703 14:50 → NRT (2시간 지연)',
        newFlight: 'NH204 17:30 → NRT → JFK 연결 확보',
        vouchers: ['🛋️ 3층 동편 라운지 바우처 (6시간)', '🍽️ 식사 쿠폰 ₩30,000', '🛍️ 면세점 10% 할인쿠폰'],
      },
      time: '14:24',
      appName: '인천공항',
    },
    {
      language: 'en',
      title: '✈️ Alternative Flight Secured',
      body: 'Dear Mr. Kim, your flight KE703 to Narita is delayed by 2 hours, affecting your connection. AI has secured an optimal alternative route.',
      details: {
        originalFlight: 'KE703 14:50 → NRT (2hr delay)',
        newFlight: 'NH204 17:30 → NRT → JFK connection secured',
        vouchers: ['🛋️ 3F East Lounge Voucher (6hrs)', '🍽️ Meal Coupon ₩30,000', '🛍️ Duty-Free 10% Discount'],
      },
      time: '14:24',
      appName: 'Incheon Airport',
    },
    {
      language: 'zh',
      title: '✈️ 已确保替代航班',
      body: '金先生，您的KE703航班（飞往成田）延误2小时，影响转机。AI已确保最佳替代路线。',
      details: {
        originalFlight: 'KE703 14:50 → NRT（延误2小时）',
        newFlight: 'NH204 17:30 → NRT → JFK 转机已确保',
        vouchers: ['🛋️ 3楼东翼贵宾室券（6小时）', '🍽️ 餐饮券 ₩30,000', '🛍️ 免税店9折优惠券'],
      },
      time: '14:24',
      appName: '仁川机场',
    },
    {
      language: 'ja',
      title: '✈️ 代替便が確保されました',
      body: '金様、KE703便（成田行き）が2時間遅延し、乗り継ぎに影響があります。AIが最適な代替ルートを確保しました。',
      details: {
        originalFlight: 'KE703 14:50 → NRT（2時間遅延）',
        newFlight: 'NH204 17:30 → NRT → JFK 接続確保済み',
        vouchers: ['🛋️ 3階東ウィングラウンジ券（6時間）', '🍽️ お食事クーポン ₩30,000', '🛍️ 免税店10%割引クーポン'],
      },
      time: '14:24',
      appName: '仁川空港',
    },
  ],
  scenario2: [
    {
      language: 'ko',
      title: '✈️ 결항 안내 및 대체편 확보',
      body: '이지현님, OZ741편(방콕행)이 항공기 정비로 결항되었습니다. AI가 같은 날 대체편을 확보했습니다.',
      details: {
        originalFlight: 'OZ741 15:30 → BKK (결항)',
        newFlight: 'TG659 18:45 → BKK 좌석 4석 확보',
        vouchers: ['👶 키즈존 이용권 (3층 서편)', '🍽️ 가족 식사 쿠폰 ₩80,000', '🛋️ 패밀리 라운지 바우처'],
      },
      time: '15:34',
      appName: '인천공항',
    },
  ],
  scenario3: [
    {
      language: 'en',
      title: '✈️ Flight Delay — Alternative Arranged',
      body: 'Dear Sarah, your flight AA280 to Paris is delayed by 3 hours. AI has arranged an alternative with priority re-routing.',
      details: {
        originalFlight: 'AA280 13:00 → CDG (3hr delay)',
        newFlight: 'AF264 20:00 → CDG direct (confirmed)',
        vouchers: ['🛋️ Premium Lounge Access (8hrs)', '🍽️ Restaurant Voucher ₩40,000', '🛍️ Duty-Free 15% Coupon'],
      },
      time: '13:05',
      appName: 'Incheon Airport',
    },
  ],
};
