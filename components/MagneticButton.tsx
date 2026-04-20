import React, { useRef, useEffect } from 'react';
import { addMagneticEffect } from '../utils/animations';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  strength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 0.35,
  style,
  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    return addMagneticEffect(ref.current, strength);
  }, [strength]);

  return (
    <button
      ref={ref}
      className={className}
      style={{ willChange: 'transform', ...style }}
      {...props}
    >
      {children}
    </button>
  );
};
