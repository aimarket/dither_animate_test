'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Rocket, Upload, Settings, LogOut, Zap, X } from 'lucide-react';
import { useEffect } from 'react';

const navigation = [
  { name: 'DASHBOARD', href: '/dashboard', icon: Home },
  { name: 'FLIGHTS', href: '/flights', icon: Rocket },
  { name: 'UPLOAD', href: '/flights/upload', icon: Upload },
  { name: 'ROCKETS', href: '/rockets', icon: Rocket },
  { name: 'MOTORS', href: '/motors', icon: Zap },
  { name: 'SETTINGS', href: '/settings', icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          flex w-64 flex-col transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{ backgroundColor: 'var(--bg-secondary)', borderRight: '1px solid var(--border-neon)' }}
      >
        {/* Mobile close button */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-2 transition-colors"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-red)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
        >
          <X className="w-5 h-5" />
        </button>
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 px-6" style={{ borderBottom: '1px solid var(--border-neon)' }}>
        <div className="relative">
          <Rocket className="w-8 h-8" style={{ color: 'var(--accent-cyan)' }} />
          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-green)' }} />
        </div>
        <div>
          <span className="text-lg font-bold uppercase" style={{ color: 'var(--text-neon)', letterSpacing: '0.1em' }}>
            MISSION
          </span>
          <span className="block text-xs" style={{ color: 'var(--text-secondary)', letterSpacing: '0.15em' }}>
            CONTROL
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 text-xs font-medium uppercase transition-all"
              style={{
                backgroundColor: isActive ? 'rgba(0, 255, 255, 0.1)' : 'transparent',
                color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                border: isActive ? '1px solid var(--accent-cyan)' : '1px solid transparent',
                borderLeft: isActive ? '3px solid var(--accent-cyan)' : '3px solid transparent',
                letterSpacing: '0.05em',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* System Status */}
      <div className="px-3 pb-3">
        <div className="p-3 rounded" style={{ backgroundColor: 'rgba(0, 255, 136, 0.05)', border: '1px solid rgba(0, 255, 136, 0.3)' }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-green)' }} />
            <span className="text-xs font-bold uppercase" style={{ color: 'var(--accent-green)', letterSpacing: '0.1em' }}>
              ONLINE
            </span>
          </div>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            All systems operational
          </p>
        </div>
      </div>

      {/* Logout */}
      <div style={{ borderTop: '1px solid var(--border-primary)' }} className="p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-3 py-2 text-xs font-medium uppercase transition-all"
          style={{
            color: 'var(--text-secondary)',
            border: '1px solid transparent',
            letterSpacing: '0.05em',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 0, 68, 0.1)';
            e.currentTarget.style.color = 'var(--accent-red)';
            e.currentTarget.style.borderColor = 'var(--accent-red)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--text-secondary)';
            e.currentTarget.style.borderColor = 'transparent';
          }}
        >
          <LogOut className="w-4 h-4" />
          LOGOUT
        </button>
      </div>
      </div>
    </>
  );
}
