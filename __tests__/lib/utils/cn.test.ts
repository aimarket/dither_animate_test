import { cn } from '@/lib/utils/cn';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('handles conditional classes', () => {
    expect(cn('base', true && 'conditional')).toBe('base conditional');
    expect(cn('base', false && 'conditional')).toBe('base');
  });

  it('merges tailwind classes without conflicts', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('handles undefined and null values', () => {
    expect(cn('class1', undefined, 'class2', null)).toBe('class1 class2');
  });

  it('handles empty strings', () => {
    expect(cn('class1', '', 'class2')).toBe('class1 class2');
  });

  it('handles arrays of classes', () => {
    expect(cn(['class1', 'class2'], 'class3')).toBe('class1 class2 class3');
  });

  it('handles object notation', () => {
    expect(cn({
      'class1': true,
      'class2': false,
      'class3': true,
    })).toBe('class1 class3');
  });

  it('deduplicates identical classes', () => {
    expect(cn('class1', 'class1', 'class2')).toBe('class1 class2');
  });
});
