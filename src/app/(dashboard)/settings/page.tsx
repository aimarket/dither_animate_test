'use client';

import { useState } from 'react';
import { MissionControlCard } from '@/components/ui/MissionControlCard';
import { TechnicalBorder } from '@/components/ui/TechnicalBorder';
import { Lock, Save, AlertTriangle } from 'lucide-react';

export default function SettingsPage() {
  const [email, setEmail] = useState('test@example.com');
  const [username, setUsername] = useState('testuser');
  const [flightAlerts, setFlightAlerts] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold uppercase" style={{ color: 'var(--text-neon)', letterSpacing: '0.1em' }}>
        SYSTEM CONFIGURATION
      </h1>

      {/* Profile Settings */}
      <MissionControlCard title="USER PROFILE" color="cyan">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs uppercase" style={{ color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-black border outline-none text-sm"
              style={{
                color: 'var(--text-primary)',
                borderColor: 'var(--accent-cyan)',
                letterSpacing: '0.02em',
              }}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase" style={{ color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>
              USERNAME
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-black border outline-none text-sm"
              style={{
                color: 'var(--text-primary)',
                borderColor: 'var(--accent-cyan)',
                letterSpacing: '0.02em',
              }}
            />
          </div>
          <button
            className="px-6 py-3 rounded text-sm font-medium uppercase transition-all"
            style={{
              backgroundColor: 'rgba(0, 255, 136, 0.1)',
              color: 'var(--accent-green)',
              border: '1px solid var(--accent-green)',
              letterSpacing: '0.05em',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 255, 136, 0.2)';
              e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 255, 136, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 255, 136, 0.1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Save className="w-4 h-4 inline mr-2" />
            SAVE CHANGES
          </button>
        </div>
      </MissionControlCard>

      {/* Security Settings */}
      <MissionControlCard title="SECURITY PROTOCOLS" color="orange">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs uppercase" style={{ color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>
              CURRENT PASSWORD
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-black border outline-none text-sm"
              style={{
                color: 'var(--text-primary)',
                borderColor: 'var(--accent-orange)',
                letterSpacing: '0.02em',
              }}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase" style={{ color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>
              NEW PASSWORD
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-black border outline-none text-sm"
              style={{
                color: 'var(--text-primary)',
                borderColor: 'var(--accent-orange)',
                letterSpacing: '0.02em',
              }}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase" style={{ color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>
              CONFIRM NEW PASSWORD
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-black border outline-none text-sm"
              style={{
                color: 'var(--text-primary)',
                borderColor: 'var(--accent-orange)',
                letterSpacing: '0.02em',
              }}
            />
          </div>
          <button
            className="px-6 py-3 rounded text-sm font-medium uppercase transition-all"
            style={{
              backgroundColor: 'rgba(255, 107, 0, 0.1)',
              color: 'var(--accent-orange)',
              border: '1px solid var(--accent-orange)',
              letterSpacing: '0.05em',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 107, 0, 0.2)';
              e.currentTarget.style.boxShadow = '0 0 10px rgba(255, 107, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 107, 0, 0.1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Lock className="w-4 h-4 inline mr-2" />
            UPDATE PASSWORD
          </button>
        </div>
      </MissionControlCard>

      {/* Notifications */}
      <MissionControlCard title="NOTIFICATION SETTINGS" color="blue">
        <div className="space-y-4">
          <TechnicalBorder color="cyan">
            <div className="flex items-center justify-between p-4" style={{ backgroundColor: 'var(--bg-card)' }}>
              <div>
                <p className="font-medium uppercase text-sm" style={{ color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
                  FLIGHT ALERTS
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                  Receive notifications when flights are processed
                </p>
              </div>
              <button
                onClick={() => setFlightAlerts(!flightAlerts)}
                className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                style={{
                  backgroundColor: flightAlerts ? 'var(--accent-green)' : 'var(--border-primary)',
                }}
              >
                <span
                  className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                  style={{
                    transform: flightAlerts ? 'translateX(1.5rem)' : 'translateX(0.25rem)',
                  }}
                />
              </button>
            </div>
          </TechnicalBorder>
          <TechnicalBorder color="cyan">
            <div className="flex items-center justify-between p-4" style={{ backgroundColor: 'var(--bg-card)' }}>
              <div>
                <p className="font-medium uppercase text-sm" style={{ color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
                  EMAIL NOTIFICATIONS
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                  Receive mission updates via email
                </p>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                style={{
                  backgroundColor: emailNotifications ? 'var(--accent-green)' : 'var(--border-primary)',
                }}
              >
                <span
                  className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                  style={{
                    transform: emailNotifications ? 'translateX(1.5rem)' : 'translateX(0.25rem)',
                  }}
                />
              </button>
            </div>
          </TechnicalBorder>
        </div>
      </MissionControlCard>

      {/* Data Management */}
      <MissionControlCard title="DATA MANAGEMENT" color="green">
        <div className="space-y-4">
          <TechnicalBorder color="green">
            <div className="flex items-center justify-between p-4" style={{ backgroundColor: 'var(--bg-card)' }}>
              <div>
                <p className="font-medium uppercase text-sm" style={{ color: 'var(--accent-green)', letterSpacing: '0.05em' }}>
                  EXPORT ALL DATA
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                  Download complete mission archive and telemetry logs
                </p>
              </div>
              <button
                className="px-4 py-2 rounded text-sm font-medium uppercase transition-all"
                style={{
                  backgroundColor: 'rgba(0, 255, 136, 0.1)',
                  color: 'var(--accent-green)',
                  border: '1px solid var(--accent-green)',
                  letterSpacing: '0.05em',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 255, 136, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 255, 136, 0.1)';
                }}
              >
                EXPORT
              </button>
            </div>
          </TechnicalBorder>
          <TechnicalBorder color="red">
            <div className="flex items-center justify-between p-4" style={{ backgroundColor: 'rgba(255, 0, 68, 0.05)' }}>
              <div>
                <p className="font-medium uppercase text-sm flex items-center gap-2" style={{ color: 'var(--accent-red)', letterSpacing: '0.05em' }}>
                  <AlertTriangle className="w-4 h-4" />
                  DELETE ACCOUNT
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                  Permanently remove account and all associated mission data
                </p>
              </div>
              <button
                className="px-4 py-2 rounded text-sm font-medium uppercase transition-all"
                style={{
                  backgroundColor: 'rgba(255, 0, 68, 0.1)',
                  color: 'var(--accent-red)',
                  border: '1px solid var(--accent-red)',
                  letterSpacing: '0.05em',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 0, 68, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 0, 68, 0.1)';
                }}
              >
                DELETE
              </button>
            </div>
          </TechnicalBorder>
        </div>
      </MissionControlCard>
    </div>
  );
}
