"use client";

interface DitherToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export default function DitherToggle({ enabled, onToggle }: DitherToggleProps) {
  return (
    <div className="flex items-center gap-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <span className="text-sm font-medium">Dither Effect:</span>
      <button
        onClick={() => onToggle(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      <span className="text-sm text-gray-600 dark:text-gray-400">
        {enabled ? 'ON' : 'OFF'}
      </span>
    </div>
  );
}