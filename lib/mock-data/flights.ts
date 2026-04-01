import { type FlightStatus } from '../constants';

export interface Flight {
  id: string;
  flightNo: string;
  airline: string;
  destination: string;
  scheduledTime: string;
  estimatedTime?: string;
  gate: string;
  terminal: 'T1' | 'T2';
  status: FlightStatus;
  delayMinutes?: number;
  delayReason?: string;
  aircraft: string;
  passengers: number;
}

export const flights: Flight[] = [
  // Delayed flights (key scenarios)
  { id: 'f1', flightNo: 'KE703', airline: 'KE', destination: 'NRT', scheduledTime: '14:50', estimatedTime: '16:50', gate: '230', terminal: 'T2', status: 'delayed', delayMinutes: 120, delayReason: '기상 악화 (도쿄 지역 강풍)', aircraft: 'A380-800', passengers: 382 },
  { id: 'f2', flightNo: 'OZ741', airline: 'OZ', destination: 'BKK', scheduledTime: '15:30', gate: '122', terminal: 'T1', status: 'cancelled', delayReason: '항공기 정비 (엔진 점검)', aircraft: 'A350-900', passengers: 311 },
  { id: 'f3', flightNo: 'AA280', airline: 'AA', destination: 'CDG', scheduledTime: '13:00', estimatedTime: '16:00', gate: '115', terminal: 'T1', status: 'delayed', delayMinutes: 180, delayReason: '항로 혼잡 (유럽 ATFM 규제)', aircraft: 'B777-300ER', passengers: 396 },
  { id: 'f4', flightNo: 'KE651', airline: 'KE', destination: 'PVG', scheduledTime: '16:10', estimatedTime: '17:40', gate: '252', terminal: 'T2', status: 'delayed', delayMinutes: 90, delayReason: '기체 지연 도착', aircraft: 'B787-9', passengers: 269 },
  { id: 'f5', flightNo: 'JL954', airline: 'JL', destination: 'HND', scheduledTime: '17:20', estimatedTime: '18:50', gate: '108', terminal: 'T1', status: 'delayed', delayMinutes: 90, delayReason: '기상 악화 (도쿄 지역 강풍)', aircraft: 'B787-8', passengers: 186 },
  { id: 'f6', flightNo: 'UA892', airline: 'UA', destination: 'SFO', scheduledTime: '11:30', gate: '120', terminal: 'T1', status: 'cancelled', delayReason: '승무원 스케줄 문제', aircraft: 'B777-200', passengers: 340 },

  // Normal flights
  { id: 'f7', flightNo: 'KE001', airline: 'KE', destination: 'JFK', scheduledTime: '10:00', gate: '260', terminal: 'T2', status: 'normal', aircraft: 'A380-800', passengers: 407 },
  { id: 'f8', flightNo: 'KE017', airline: 'KE', destination: 'LAX', scheduledTime: '10:30', gate: '268', terminal: 'T2', status: 'normal', aircraft: 'A380-800', passengers: 399 },
  { id: 'f9', flightNo: 'KE061', airline: 'KE', destination: 'CDG', scheduledTime: '11:50', gate: '255', terminal: 'T2', status: 'boarding', aircraft: 'B777-300ER', passengers: 291 },
  { id: 'f10', flightNo: 'KE623', airline: 'KE', destination: 'HKG', scheduledTime: '08:25', gate: '231', terminal: 'T2', status: 'normal', aircraft: 'A330-300', passengers: 272 },
  { id: 'f11', flightNo: 'KE685', airline: 'KE', destination: 'TPE', scheduledTime: '09:10', gate: '233', terminal: 'T2', status: 'normal', aircraft: 'B737-900', passengers: 169 },
  { id: 'f12', flightNo: 'KE851', airline: 'KE', destination: 'SIN', scheduledTime: '23:50', gate: '245', terminal: 'T2', status: 'normal', aircraft: 'A330-300', passengers: 258 },
  { id: 'f13', flightNo: 'KE901', airline: 'KE', destination: 'FRA', scheduledTime: '13:35', gate: '270', terminal: 'T2', status: 'boarding', aircraft: 'B747-8', passengers: 365 },

  { id: 'f14', flightNo: 'OZ201', airline: 'OZ', destination: 'JFK', scheduledTime: '09:45', gate: '113', terminal: 'T1', status: 'normal', aircraft: 'A350-900', passengers: 311 },
  { id: 'f15', flightNo: 'OZ203', airline: 'OZ', destination: 'LAX', scheduledTime: '17:10', gate: '128', terminal: 'T1', status: 'normal', aircraft: 'A350-900', passengers: 303 },
  { id: 'f16', flightNo: 'OZ561', airline: 'OZ', destination: 'NRT', scheduledTime: '09:00', gate: '106', terminal: 'T1', status: 'normal', aircraft: 'A321-200', passengers: 177 },
  { id: 'f17', flightNo: 'OZ351', airline: 'OZ', destination: 'FRA', scheduledTime: '12:40', gate: '131', terminal: 'T1', status: 'normal', aircraft: 'A350-900', passengers: 298 },
  { id: 'f18', flightNo: 'OZ723', airline: 'OZ', destination: 'SIN', scheduledTime: '00:50', gate: '104', terminal: 'T1', status: 'normal', aircraft: 'A330-300', passengers: 244 },

  { id: 'f19', flightNo: 'NH862', airline: 'NH', destination: 'NRT', scheduledTime: '15:00', gate: '110', terminal: 'T1', status: 'normal', aircraft: 'B787-9', passengers: 215 },
  { id: 'f20', flightNo: 'NH864', airline: 'NH', destination: 'HND', scheduledTime: '19:30', gate: '112', terminal: 'T1', status: 'normal', aircraft: 'B787-8', passengers: 186 },
  { id: 'f21', flightNo: 'JL952', airline: 'JL', destination: 'NRT', scheduledTime: '09:30', gate: '107', terminal: 'T1', status: 'normal', aircraft: 'B787-9', passengers: 195 },
  { id: 'f22', flightNo: 'SQ601', airline: 'SQ', destination: 'SIN', scheduledTime: '08:00', gate: '118', terminal: 'T1', status: 'normal', aircraft: 'A350-900', passengers: 301 },
  { id: 'f23', flightNo: 'CX439', airline: 'CX', destination: 'HKG', scheduledTime: '10:15', gate: '125', terminal: 'T1', status: 'normal', aircraft: 'A350-1000', passengers: 334 },
  { id: 'f24', flightNo: 'LH713', airline: 'LH', destination: 'FRA', scheduledTime: '14:30', gate: '130', terminal: 'T1', status: 'boarding', aircraft: 'A380-800', passengers: 410 },
  { id: 'f25', flightNo: 'AF264', airline: 'AF', destination: 'CDG', scheduledTime: '20:00', gate: '132', terminal: 'T1', status: 'normal', aircraft: 'B777-300ER', passengers: 342 },
  { id: 'f26', flightNo: 'BA5512', airline: 'BA', destination: 'LHR', scheduledTime: '21:00', gate: '134', terminal: 'T1', status: 'normal', aircraft: 'B787-9', passengers: 216 },
  { id: 'f27', flightNo: 'TG659', airline: 'TG', destination: 'BKK', scheduledTime: '18:45', gate: '126', terminal: 'T1', status: 'normal', aircraft: 'A350-900', passengers: 289 },
  { id: 'f28', flightNo: 'VN417', airline: 'VN', destination: 'SGN', scheduledTime: '19:10', gate: '105', terminal: 'T1', status: 'normal', aircraft: 'A350-900', passengers: 275 },

  { id: 'f29', flightNo: 'KE711', airline: 'KE', destination: 'KIX', scheduledTime: '08:00', gate: '235', terminal: 'T2', status: 'normal', aircraft: 'A330-200', passengers: 218 },
  { id: 'f30', flightNo: 'KE629', airline: 'KE', destination: 'PEK', scheduledTime: '09:40', gate: '241', terminal: 'T2', status: 'normal', aircraft: 'B787-9', passengers: 248 },
  { id: 'f31', flightNo: 'KE671', airline: 'KE', destination: 'MNL', scheduledTime: '22:30', gate: '250', terminal: 'T2', status: 'normal', aircraft: 'A330-300', passengers: 263 },
  { id: 'f32', flightNo: 'KE637', airline: 'KE', destination: 'KUL', scheduledTime: '23:00', gate: '248', terminal: 'T2', status: 'normal', aircraft: 'A330-300', passengers: 251 },

  // Additional delayed
  { id: 'f33', flightNo: 'MU518', airline: 'MU', destination: 'PVG', scheduledTime: '16:40', estimatedTime: '18:10', gate: '109', terminal: 'T1', status: 'delayed', delayMinutes: 90, delayReason: '상하이 공항 활주로 점검', aircraft: 'A330-200', passengers: 234 },
  { id: 'f34', flightNo: 'CA130', airline: 'CA', destination: 'PEK', scheduledTime: '14:20', estimatedTime: '15:20', gate: '116', terminal: 'T1', status: 'delayed', delayMinutes: 60, delayReason: '기체 지연 도착', aircraft: 'A330-300', passengers: 278 },
  { id: 'f35', flightNo: 'KE867', airline: 'KE', destination: 'SYD', scheduledTime: '19:00', estimatedTime: '20:30', gate: '262', terminal: 'T2', status: 'delayed', delayMinutes: 90, delayReason: '기상 악화 (태풍 접근)', aircraft: 'A380-800', passengers: 392 },

  // More normals for volume
  { id: 'f36', flightNo: 'OZ111', airline: 'OZ', destination: 'PVG', scheduledTime: '07:30', gate: '102', terminal: 'T1', status: 'normal', aircraft: 'A321-200', passengers: 166 },
  { id: 'f37', flightNo: 'OZ573', airline: 'OZ', destination: 'KIX', scheduledTime: '08:45', gate: '103', terminal: 'T1', status: 'normal', aircraft: 'A321-200', passengers: 172 },
  { id: 'f38', flightNo: 'KE005', airline: 'KE', destination: 'JFK', scheduledTime: '19:40', gate: '265', terminal: 'T2', status: 'normal', aircraft: 'B777-300ER', passengers: 338 },
  { id: 'f39', flightNo: 'KE035', airline: 'KE', destination: 'SFO', scheduledTime: '17:55', gate: '258', terminal: 'T2', status: 'normal', aircraft: 'B787-9', passengers: 254 },
  { id: 'f40', flightNo: 'KE011', airline: 'KE', destination: 'LHR', scheduledTime: '12:45', gate: '272', terminal: 'T2', status: 'normal', aircraft: 'B787-9', passengers: 262 },
  { id: 'f41', flightNo: 'SQ607', airline: 'SQ', destination: 'SIN', scheduledTime: '15:30', gate: '119', terminal: 'T1', status: 'normal', aircraft: 'B787-10', passengers: 305 },
  { id: 'f42', flightNo: 'CX441', airline: 'CX', destination: 'HKG', scheduledTime: '16:00', gate: '124', terminal: 'T1', status: 'normal', aircraft: 'A350-900', passengers: 289 },
  { id: 'f43', flightNo: 'NH204', airline: 'NH', destination: 'NRT', scheduledTime: '17:30', gate: '111', terminal: 'T1', status: 'normal', aircraft: 'B787-9', passengers: 207 },
  { id: 'f44', flightNo: 'KE781', airline: 'KE', destination: 'BKK', scheduledTime: '22:10', gate: '246', terminal: 'T2', status: 'normal', aircraft: 'B787-9', passengers: 256 },
  { id: 'f45', flightNo: 'OZ761', airline: 'OZ', destination: 'BKK', scheduledTime: '23:30', gate: '101', terminal: 'T1', status: 'normal', aircraft: 'A350-900', passengers: 295 },
];

export function getFlightStats(flightList: Flight[]) {
  return {
    total: flightList.length,
    normal: flightList.filter(f => f.status === 'normal').length,
    delayed: flightList.filter(f => f.status === 'delayed').length,
    cancelled: flightList.filter(f => f.status === 'cancelled').length,
    boarding: flightList.filter(f => f.status === 'boarding').length,
    affectedPassengers: flightList
      .filter(f => f.status === 'delayed' || f.status === 'cancelled')
      .reduce((sum, f) => sum + f.passengers, 0),
  };
}
