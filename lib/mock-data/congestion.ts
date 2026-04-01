export interface Zone {
  id: string;
  name: string;
  terminal: 'T1' | 'T2';
  floor: number;
  type: 'departure' | 'dutyfree' | 'lounge' | 'restaurant' | 'gate' | 'checkin';
  capacity: number;
  currentCount: number;
  density: number; // 0-100
  trend: 'up' | 'down' | 'stable';
  gridPos: { row: number; col: number; rowSpan?: number; colSpan?: number };
}

export const zones: Zone[] = [
  // T1 Zones
  { id: 't1-p01', name: '출국장 P01', terminal: 'T1', floor: 3, type: 'departure', capacity: 600, currentCount: 390, density: 65, trend: 'up', gridPos: { row: 0, col: 0 } },
  { id: 't1-p02', name: '출국장 P02', terminal: 'T1', floor: 3, type: 'departure', capacity: 600, currentCount: 480, density: 80, trend: 'up', gridPos: { row: 0, col: 1 } },
  { id: 't1-p03', name: '출국장 P03', terminal: 'T1', floor: 3, type: 'departure', capacity: 600, currentCount: 300, density: 50, trend: 'stable', gridPos: { row: 0, col: 2 } },
  { id: 't1-df1', name: '면세구역 A', terminal: 'T1', floor: 3, type: 'dutyfree', capacity: 1200, currentCount: 780, density: 65, trend: 'up', gridPos: { row: 1, col: 0, colSpan: 2 } },
  { id: 't1-df2', name: '면세구역 B', terminal: 'T1', floor: 3, type: 'dutyfree', capacity: 800, currentCount: 360, density: 45, trend: 'down', gridPos: { row: 1, col: 2 } },
  { id: 't1-lg1', name: '프레스티지 라운지', terminal: 'T1', floor: 4, type: 'lounge', capacity: 200, currentCount: 120, density: 60, trend: 'stable', gridPos: { row: 2, col: 0 } },
  { id: 't1-lg2', name: '마티나 라운지', terminal: 'T1', floor: 4, type: 'lounge', capacity: 150, currentCount: 48, density: 32, trend: 'down', gridPos: { row: 2, col: 1 } },
  { id: 't1-rst', name: '식당가 (4F)', terminal: 'T1', floor: 4, type: 'restaurant', capacity: 500, currentCount: 275, density: 55, trend: 'up', gridPos: { row: 2, col: 2 } },
  { id: 't1-g1', name: '게이트 101-115', terminal: 'T1', floor: 3, type: 'gate', capacity: 900, currentCount: 540, density: 60, trend: 'stable', gridPos: { row: 3, col: 0 } },
  { id: 't1-g2', name: '게이트 116-130', terminal: 'T1', floor: 3, type: 'gate', capacity: 900, currentCount: 630, density: 70, trend: 'up', gridPos: { row: 3, col: 1 } },
  { id: 't1-g3', name: '게이트 131-140', terminal: 'T1', floor: 3, type: 'gate', capacity: 600, currentCount: 240, density: 40, trend: 'down', gridPos: { row: 3, col: 2 } },
  { id: 't1-ck', name: '체크인 카운터', terminal: 'T1', floor: 1, type: 'checkin', capacity: 800, currentCount: 440, density: 55, trend: 'stable', gridPos: { row: 4, col: 0, colSpan: 3 } },

  // T2 Zones
  { id: 't2-p01', name: '출국장 P01', terminal: 'T2', floor: 3, type: 'departure', capacity: 500, currentCount: 350, density: 70, trend: 'up', gridPos: { row: 0, col: 0 } },
  { id: 't2-p02', name: '출국장 P02', terminal: 'T2', floor: 3, type: 'departure', capacity: 500, currentCount: 200, density: 40, trend: 'down', gridPos: { row: 0, col: 1 } },
  { id: 't2-p03', name: '출국장 P03', terminal: 'T2', floor: 3, type: 'departure', capacity: 500, currentCount: 435, density: 87, trend: 'up', gridPos: { row: 0, col: 2 } },
  { id: 't2-df1', name: '면세구역', terminal: 'T2', floor: 3, type: 'dutyfree', capacity: 1000, currentCount: 620, density: 62, trend: 'stable', gridPos: { row: 1, col: 0, colSpan: 2 } },
  { id: 't2-df2', name: '브랜드관', terminal: 'T2', floor: 3, type: 'dutyfree', capacity: 400, currentCount: 180, density: 45, trend: 'down', gridPos: { row: 1, col: 2 } },
  { id: 't2-lg1', name: '프레스티지 라운지', terminal: 'T2', floor: 4, type: 'lounge', capacity: 180, currentCount: 108, density: 60, trend: 'stable', gridPos: { row: 2, col: 0 } },
  { id: 't2-lg2', name: '동편 라운지', terminal: 'T2', floor: 3, type: 'lounge', capacity: 120, currentCount: 38, density: 32, trend: 'down', gridPos: { row: 2, col: 1 } },
  { id: 't2-rst', name: '식당가 (4F)', terminal: 'T2', floor: 4, type: 'restaurant', capacity: 400, currentCount: 260, density: 65, trend: 'up', gridPos: { row: 2, col: 2 } },
  { id: 't2-g1', name: '게이트 230-245', terminal: 'T2', floor: 3, type: 'gate', capacity: 800, currentCount: 520, density: 65, trend: 'up', gridPos: { row: 3, col: 0 } },
  { id: 't2-g2', name: '게이트 246-260', terminal: 'T2', floor: 3, type: 'gate', capacity: 800, currentCount: 480, density: 60, trend: 'stable', gridPos: { row: 3, col: 1 } },
  { id: 't2-g3', name: '게이트 261-275', terminal: 'T2', floor: 3, type: 'gate', capacity: 600, currentCount: 210, density: 35, trend: 'down', gridPos: { row: 3, col: 2 } },
  { id: 't2-ck', name: '체크인 카운터', terminal: 'T2', floor: 1, type: 'checkin', capacity: 600, currentCount: 360, density: 60, trend: 'up', gridPos: { row: 4, col: 0, colSpan: 3 } },
];

export const hourlyData = Array.from({ length: 24 }, (_, hour) => {
  const base = hour >= 6 && hour <= 10 ? 70 : hour >= 14 && hour <= 18 ? 75 : hour >= 20 && hour <= 23 ? 50 : 25;
  return {
    hour: `${String(hour).padStart(2, '0')}:00`,
    t1: Math.min(100, base + Math.floor(Math.random() * 15)),
    t2: Math.min(100, base - 5 + Math.floor(Math.random() * 15)),
    t1After: Math.min(100, Math.max(10, base - 15 + Math.floor(Math.random() * 10))),
    t2After: Math.min(100, Math.max(10, base - 20 + Math.floor(Math.random() * 10))),
  };
});

export function getDensityColor(density: number): string {
  if (density >= 80) return '#EF4444';
  if (density >= 60) return '#F59E0B';
  if (density >= 40) return '#00B4D8';
  return '#10B981';
}

export function getDensityLabel(density: number): string {
  if (density >= 80) return '혼잡';
  if (density >= 60) return '보통';
  if (density >= 40) return '여유';
  return '쾌적';
}
