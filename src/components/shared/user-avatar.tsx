import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/lib/utils';
import { cn } from '@/lib/utils';
import type { UserSummary } from '@/types';

interface UserAvatarProps {
  user: UserSummary;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
}

const sizeClasses = {
  sm: 'h-7 w-7 text-xs',
  md: 'h-9 w-9 text-sm',
  lg: 'h-12 w-12 text-base',
};

export function UserAvatar({ user, size = 'md', showName = false }: UserAvatarProps) {
  const initials = getInitials(user.firstName, user.lastName);
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <div className="flex items-center gap-2">
      <Avatar className={cn(sizeClasses[size])}>
        {user.avatar && <AvatarImage src={user.avatar} alt={fullName} />}
        <AvatarFallback className={cn(sizeClasses[size], 'bg-primary/10 text-primary font-medium')}>
          {initials}
        </AvatarFallback>
      </Avatar>
      {showName && (
        <span className="text-sm font-medium">{fullName}</span>
      )}
    </div>
  );
}
