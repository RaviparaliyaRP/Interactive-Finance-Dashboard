
import React from 'react';
import { DonutSegment } from '../types';

interface DonutChartProps {
  segments: DonutSegment[];
  centerLabel: string;
  centerValue: string;
}

export const DonutChart: React.FC<DonutChartProps> = ({ segments, centerLabel, centerValue }) => {
  const size = 300;
  const strokeWidth = 32;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  let currentOffset = 0;

  return (
    <div className="relative flex items-center justify-center w-full aspect-square max-w-[180px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[240px] mx-auto group p-2">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90 transition-transform duration-500"
        preserveAspectRatio="xMidYMid meet"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="gradPrincipal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>
          <linearGradient id="gradSecondary" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
        </defs>
        
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#1E293B"
          strokeWidth={strokeWidth}
        />

        {segments.map((segment, index) => {
          const dashArray = `${(segment.percent * circumference) / 100} ${circumference}`;
          const strokeOffset = -currentOffset;
          currentOffset += (segment.percent * circumference) / 100;

          return (
            <circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke={index === 0 ? "url(#gradPrincipal)" : "url(#gradSecondary)"}
              strokeWidth={strokeWidth}
              strokeDasharray={dashArray}
              strokeDashoffset={strokeOffset}
              className="transition-all duration-700 ease-out"
            />
          );
        })}
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-3 py-2">
        <span className="text-slate-400 text-[8px] sm:text-[9px] md:text-[10px] font-semibold uppercase tracking-wider mb-0.5">
          {centerLabel}
        </span>
        <span className="text-white text-xs sm:text-sm md:text-base font-bold leading-tight break-words max-w-[85%]">
          {centerValue}
        </span>
      </div>
    </div>
  );
};
