
import React from 'react';

interface InputGroupProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  prefix?: string;
  onChange: (val: number) => void;
}

export const InputGroup: React.FC<InputGroupProps> = ({
  label, value, min, max, step, unit, prefix = '', onChange
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseFloat(e.target.value.replace(/[^0-9.]/g, ''));
    if (isNaN(val)) val = min;
    onChange(Math.min(max, Math.max(min, val)));
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(e.target.value));
  };

  return (
    <div className="mb-8 last:mb-0">
      <div className="flex justify-between items-center mb-4">
        <label className="text-slate-400 text-xs font-bold uppercase tracking-widest">{label}</label>
        <div className="relative group">
          <input
            type="text"
            value={`${prefix}${value.toLocaleString('en-IN')}`}
            onChange={handleInputChange}
            className="bg-slate-800/50 border border-slate-700 text-white text-right px-3 py-1.5 rounded-lg w-32 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          />
          <span className="absolute -right-2 top-1/2 -translate-y-1/2 text-slate-500 text-[10px] font-bold">
            {unit}
          </span>
        </div>
      </div>
      
      <div className="relative pt-2 pb-1">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleSliderChange}
          className="w-full"
        />
        <div className="flex justify-between mt-2 text-[10px] font-medium text-slate-500 px-1">
          <span>{prefix}{min.toLocaleString('en-IN')}</span>
          <span>{prefix}{max.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
};
