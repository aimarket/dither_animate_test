import {
  Rocket,
  Activity,
  Database,
  BarChart3,
  Upload,
  Settings,
  User,
  LogOut,
} from 'lucide-react';

export interface NavItem {
  name: string;
  href: string;
  icon: typeof Rocket;
  description?: string;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export const mainNavigation: NavSection[] = [
  {
    title: 'Main',
    items: [
      {
        name: 'Flights',
        href: '/flights',
        icon: Activity,
        description: 'View and manage your flight logs',
      },
      {
        name: 'Rockets',
        href: '/rockets',
        icon: Rocket,
        description: 'Manage your rocket fleet',
      },
      {
        name: 'Motors',
        href: '/motors',
        icon: Database,
        description: 'Browse motor database',
      },
    ],
  },
  {
    title: 'Tools',
    items: [
      {
        name: 'Upload Flight',
        href: '/flights/upload',
        icon: Upload,
        description: 'Upload new telemetry data',
      },
      {
        name: 'Analytics',
        href: '/analytics',
        icon: BarChart3,
        description: 'Compare flights and analyze trends',
      },
    ],
  },
];

export const userNavigation: NavItem[] = [
  {
    name: 'Profile',
    href: '/profile',
    icon: User,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
  },
  {
    name: 'Logout',
    href: '/logout',
    icon: LogOut,
  },
];

export const quickActions = [
  {
    name: 'New Flight',
    href: '/flights/upload',
    description: 'Upload telemetry data',
  },
  {
    name: 'New Rocket',
    href: '/rockets/new',
    description: 'Add a rocket to your fleet',
  },
  {
    name: 'View Analytics',
    href: '/analytics',
    description: 'Compare and analyze flights',
  },
];
