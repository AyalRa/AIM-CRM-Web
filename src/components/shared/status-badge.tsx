import { Badge } from '@/components/ui/badge';
import type { Status } from '@/types';

interface StatusBadgeProps {
  status: Status;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const style = status.color
    ? {
        backgroundColor: `${status.color}20`,
        color: status.color,
        borderColor: `${status.color}40`,
      }
    : undefined;

  return (
    <Badge variant="outline" style={style} className="font-medium">
      {status.name}
    </Badge>
  );
}
