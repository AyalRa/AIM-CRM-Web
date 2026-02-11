import { Badge } from '@/components/ui/badge';
import { PRIORITY_COLORS } from '@/lib/constants';

interface PriorityBadgeProps {
  priority: string;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const colorClass = PRIORITY_COLORS[priority] || 'bg-gray-100 text-gray-700';

  return (
    <Badge variant="outline" className={`${colorClass} border-0 capitalize`}>
      {priority}
    </Badge>
  );
}
