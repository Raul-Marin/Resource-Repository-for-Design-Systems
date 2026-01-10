import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
}

export function AnimatedCounter({ value, duration = 2000 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const prevValueRef = useRef(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    // Start from previous value or 0
    const startValue = prevValueRef.current;
    prevValueRef.current = value;
    
    // If value hasn't changed, don't animate
    if (startValue === value) {
      setCount(value);
      return;
    }

    const startTime = Date.now();
    
    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function: ease-out cubic (rápido al inicio, lento al final)
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      
      const currentCount = Math.floor(startValue + (value - startValue) * easeOutCubic);
      setCount(currentCount);
      
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };
    
    frameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [value, duration]);

  return <>{count}</>;
}