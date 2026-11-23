import React, { useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export const Counter: React.FC<CounterProps> = ({ 
  end, 
  duration = 2, 
  suffix = '', 
  prefix = '' 
}) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="font-extrabold tracking-tight">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};
