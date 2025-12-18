
import React, { useState, useEffect, useRef } from 'react';

interface AnimatedNumberProps {
  value: number;
  formatter: (val: number) => string;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, formatter }) => {
  const [displayValue, setDisplayValue] = useState(value);
  // Initialized with undefined to fix "Expected 1 arguments, but got 0" error
  const requestRef = useRef<number | undefined>(undefined);
  // Initialized with undefined to fix "Expected 1 arguments, but got 0" error
  const startTimeRef = useRef<number | undefined>(undefined);
  const startValueRef = useRef<number>(value);

  useEffect(() => {
    startValueRef.current = displayValue;
    startTimeRef.current = undefined;
    
    const animate = (time: number) => {
      if (startTimeRef.current === undefined) startTimeRef.current = time;
      const progress = Math.min((time - startTimeRef.current) / 400, 1);
      
      const nextValue = startValueRef.current + (value - startValueRef.current) * progress;
      setDisplayValue(nextValue);

      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [value]);

  return <span>{formatter(displayValue)}</span>;
};
