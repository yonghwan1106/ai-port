import { cn } from '@/lib/utils';
import { type FlightStatus, STATUS_CONFIG } from '@/lib/constants';

interface StatusBadgeProps {
  status: FlightStatus;
  delayMinutes?: number;
  className?: string;
}

export default function StatusBadge({ status, delayMinutes, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold',
        className
      )}
      style={{ backgroundColor: config.bg, color: config.color }}
    >
      <span
        className={cn('h-1.5 w-1.5 rounded-full', status === 'boarding' && 'status-dot')}
        style={{ backgroundColor: config.color }}
      />
      {config.label}
      {status === 'delayed' && delayMinutes && (
        <span className="font-mono">+{delayMinutes}분</span>
      )}
    </span>
  );
}
