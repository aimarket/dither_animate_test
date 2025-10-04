'use client';

import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface Column<T> {
  key: string;
  label: string;
  width?: string;
  align?: 'left' | 'right' | 'center';
  sortable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
}

interface MonospaceTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  className?: string;
}

export function MonospaceTable<T>({
  columns,
  data,
  onRowClick,
  className = '',
}: MonospaceTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = (a as Record<string, unknown>)[sortConfig.key];
      const bValue = (b as Record<string, unknown>)[sortConfig.key];

      if (aValue === bValue) return 0;
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      const aString = String(aValue).toLowerCase();
      const bString = String(bValue).toLowerCase();
      const comparison = aString.localeCompare(bString);
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [data, sortConfig]);

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full">
        <thead>
          <tr
            style={{
              borderBottom: '1px solid rgba(0, 255, 255, 0.3)',
            }}
          >
            {columns.map((column) => (
              <th
                key={column.key}
                className={`py-2 px-3 text-xs font-medium uppercase ${
                  column.sortable ? 'cursor-pointer select-none' : ''
                }`}
                style={{
                  textAlign: column.align || 'left',
                  width: column.width,
                  color: 'var(--text-secondary)',
                  letterSpacing: '0.1em',
                }}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="flex items-center gap-1 justify-start">
                  <span>{column.label}</span>
                  {column.sortable && (
                    <span className="flex flex-col">
                      <ChevronUp
                        className="w-3 h-3 -mb-1"
                        style={{
                          color:
                            sortConfig?.key === column.key && sortConfig.direction === 'asc'
                              ? 'var(--accent-cyan)'
                              : 'var(--text-tertiary)',
                        }}
                      />
                      <ChevronDown
                        className="w-3 h-3"
                        style={{
                          color:
                            sortConfig?.key === column.key && sortConfig.direction === 'desc'
                              ? 'var(--accent-cyan)'
                              : 'var(--text-tertiary)',
                        }}
                      />
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, idx) => (
            <tr
              key={idx}
              className={`${onRowClick ? 'cursor-pointer' : ''}`}
              style={{
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                transition: 'background-color 0.15s',
              }}
              onClick={() => onRowClick?.(row)}
              onMouseEnter={(e) => {
                if (onRowClick) {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 255, 255, 0.05)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="py-2 px-3 text-sm"
                  style={{
                    textAlign: column.align || 'left',
                    color: 'var(--text-primary)',
                  }}
                >
                  {column.render
                    ? column.render((row as Record<string, unknown>)[column.key], row)
                    : String((row as Record<string, unknown>)[column.key] ?? '-')}
                </td>
              ))}
            </tr>
          ))}
          {sortedData.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="py-8 text-center text-sm"
                style={{ color: 'var(--text-tertiary)' }}
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
