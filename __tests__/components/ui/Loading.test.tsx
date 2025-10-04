import { render, screen } from '@testing-library/react';
import { Loading, LoadingSkeleton, PageLoading, CardSkeleton } from '@/components/ui/Loading';

describe('Loading Components', () => {
  describe('Loading', () => {
    it('renders loading spinner', () => {
      const { container } = render(<Loading />);
      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('renders with text when provided', () => {
      render(<Loading text="Loading data..." />);
      expect(screen.getByText('Loading data...')).toBeInTheDocument();
    });

    it('applies correct size classes', () => {
      const { container, rerender } = render(<Loading size="sm" />);
      let spinner = container.querySelector('.animate-spin');
      expect(spinner).toHaveClass('w-4', 'h-4');

      rerender(<Loading size="md" />);
      spinner = container.querySelector('.animate-spin');
      expect(spinner).toHaveClass('w-8', 'h-8');

      rerender(<Loading size="lg" />);
      spinner = container.querySelector('.animate-spin');
      expect(spinner).toHaveClass('w-12', 'h-12');
    });

    it('applies custom className', () => {
      const { container } = render(<Loading className="my-custom-class" />);
      expect(container.firstChild).toHaveClass('my-custom-class');
    });
  });

  describe('LoadingSkeleton', () => {
    it('renders skeleton with animation', () => {
      const { container } = render(<LoadingSkeleton />);
      const skeleton = container.firstChild;
      expect(skeleton).toHaveClass('animate-pulse');
    });
  });

  describe('PageLoading', () => {
    it('renders full page loading state', () => {
      render(<PageLoading />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('CardSkeleton', () => {
    it('renders card skeleton with multiple elements', () => {
      const { container } = render(<CardSkeleton />);
      const skeletons = container.querySelectorAll('.animate-pulse');
      expect(skeletons.length).toBeGreaterThan(0);
    });
  });
});
