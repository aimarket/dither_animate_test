import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface EmptyProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function Empty({ icon: Icon, title, description, action, className }: EmptyProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 text-center ${className || ''}`}>
      {Icon && (
        <div className="mb-4 p-3 rounded-full bg-white/5">
          <Icon className="w-8 h-8 text-gray-400" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      {description && <p className="text-gray-400 mb-6 max-w-md">{description}</p>}
      {action}
    </div>
  );
}
