import { useScrollReveal } from '../../hooks/useScrollreveal';

interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'fade';
  as?: React.ElementType;
}

export function RevealText({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  as: Tag = 'div',
}: RevealTextProps) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  const baseStyle: React.CSSProperties = {
    transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    opacity: isVisible ? 1 : 0,
    transform: isVisible
      ? 'none'
      : direction === 'up'
      ? 'translateY(32px)'
      : direction === 'left'
      ? 'translateX(-32px)'
      : direction === 'right'
      ? 'translateX(32px)'
      : 'none',
  };

  return (
    <Tag ref={ref as any} className={className} style={baseStyle}>
      {children}
    </Tag>
  );
}

interface StaggerChildrenProps {
  children: React.ReactNode[];
  className?: string;
  staggerMs?: number;
  baseDelay?: number;
}

export function StaggerChildren({
  children,
  className = '',
  staggerMs = 120,
  baseDelay = 0,
}: StaggerChildrenProps) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <div ref={ref as any} className={className}>
      {children.map((child, i) => (
        <div
          key={i}
          style={{
            transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${baseDelay + i * staggerMs}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${baseDelay + i * staggerMs}ms`,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'none' : 'translateY(24px)',
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
