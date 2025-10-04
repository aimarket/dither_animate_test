'use client';

import { Bell, Search, User, Activity, Menu } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="flex h-16 items-center justify-between px-4 md:px-6" style={{ borderBottom: '1px solid var(--border-neon)' }}>
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 transition-colors"
        style={{ color: 'var(--text-secondary)' }}
        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-cyan)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
      >
        <Menu className="w-6 h-6" />
      </button>
      {/* Search */}
      <div className="flex-1 max-w-xl ml-4 lg:ml-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: searchFocused ? 'var(--accent-cyan)' : 'var(--text-secondary)' }} />
          <input
            type="text"
            placeholder="SEARCH..."
            className="w-full pl-10 pr-4 py-2 bg-black border outline-none text-xs uppercase transition-colors md:placeholder:text-xs placeholder:text-[10px]"
            style={{
              color: 'var(--text-primary)',
              borderColor: searchFocused ? 'var(--accent-cyan)' : 'var(--border-primary)',
              letterSpacing: '0.05em',
            }}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>
      </div>

      {/* Status & Actions */}
      <div className="flex items-center gap-2 md:gap-4 ml-2 md:ml-0">
        {/* Live Status */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded" style={{ backgroundColor: 'rgba(0, 255, 136, 0.1)', border: '1px solid rgba(0, 255, 136, 0.3)' }}>
          <Activity className="w-4 h-4 animate-pulse" style={{ color: 'var(--accent-green)' }} />
          <span className="text-xs font-bold uppercase" style={{ color: 'var(--accent-green)', letterSpacing: '0.1em' }}>
            LIVE
          </span>
        </div>

        {/* Notifications */}
        <button
          className="relative p-2 transition-colors"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-cyan)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
        >
          <Bell className="w-5 h-5" />
          <div className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent-orange)' }} />
        </button>

        {/* User Profile */}
        <button
          className="p-2 rounded transition-all"
          style={{
            color: 'var(--text-secondary)',
            border: '1px solid transparent',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--accent-cyan)';
            e.currentTarget.style.borderColor = 'var(--accent-cyan)';
            e.currentTarget.style.backgroundColor = 'rgba(0, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-secondary)';
            e.currentTarget.style.borderColor = 'transparent';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <User className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
