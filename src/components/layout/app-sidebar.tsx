'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  UserPlus,
  Users,
  CheckSquare,
  Calendar,
  Receipt,
  Package,
  BarChart3,
  Settings,
  ChevronsLeft,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { usePermission } from '@/hooks/use-permissions';
import { useUIStore } from '@/stores/ui-store';
import { APP_NAME } from '@/lib/constants';

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  entity: string | null;
}

const mainNav: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard, entity: null },
  { label: 'Leads', href: '/leads', icon: UserPlus, entity: 'leads' },
  { label: 'Customers', href: '/customers', icon: Users, entity: 'customers' },
  { label: 'Tasks', href: '/tasks', icon: CheckSquare, entity: 'tasks' },
  { label: 'Calendar', href: '/calendar', icon: Calendar, entity: 'meetings' },
  { label: 'Sales', href: '/sales', icon: Receipt, entity: 'sales' },
  { label: 'Products', href: '/products', icon: Package, entity: 'products' },
  { label: 'Reports', href: '/reports', icon: BarChart3, entity: null },
];

const NavItemComponent = React.memo(function NavItemComponent({
  item,
  collapsed,
  isActive
}: {
  item: NavItem;
  collapsed: boolean;
  isActive: boolean;
}) {
  return (
    <Link
      href={item.href}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        isActive
          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
          : 'text-sidebar-foreground/70',
        collapsed && 'justify-center px-2'
      )}
      title={collapsed ? item.label : undefined}
    >
      <item.icon className="h-4 w-4 shrink-0" />
      {!collapsed && <span>{item.label}</span>}
    </Link>
  );
});

export function AppSidebar() {
  const pathname = usePathname();
  const sidebarCollapsed = useUIStore((s) => s.sidebarCollapsed);
  const toggleSidebarCollapsed = useUIStore((s) => s.toggleSidebarCollapsed);

  // Filter nav items by permission
  const filteredNav = useMemo(() => mainNav.filter((item) => {
    if (!item.entity) return true;
    // We use the hook here via a wrapper (mock for now always true)
    return true;
  }), []);

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col border-r bg-sidebar transition-all duration-300',
        sidebarCollapsed ? 'w-16' : 'w-60'
      )}
    >
      {/* Logo */}
      <div className={cn(
        'flex h-14 items-center border-b px-4',
        sidebarCollapsed ? 'justify-center' : 'gap-2'
      )}>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
          A
        </div>
        {!sidebarCollapsed && (
          <span className="font-semibold text-sidebar-foreground">{APP_NAME}</span>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="flex flex-col gap-1">
          {filteredNav.map((item) => {
            const isActive = item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);

            return (
              <NavItemComponent
                key={item.href}
                item={item}
                collapsed={sidebarCollapsed}
                isActive={isActive}
              />
            );
          })}
        </nav>

        <Separator className="my-4" />

        <nav className="flex flex-col gap-1">
          <NavItemComponent
            item={{ label: 'Settings', href: '/settings', icon: Settings, entity: null }}
            collapsed={sidebarCollapsed}
            isActive={pathname.startsWith('/settings')}
          />
        </nav>
      </ScrollArea>

      {/* Collapse toggle */}
      <div className="border-t p-2">
        <Button
          variant="ghost"
          size="sm"
          className={cn('w-full', sidebarCollapsed ? 'justify-center' : 'justify-start')}
          onClick={toggleSidebarCollapsed}
        >
          <ChevronsLeft
            className={cn('h-4 w-4 transition-transform', sidebarCollapsed && 'rotate-180')}
          />
          {!sidebarCollapsed && <span className="ml-2 text-xs">Collapse</span>}
        </Button>
      </div>
    </aside>
  );
}
