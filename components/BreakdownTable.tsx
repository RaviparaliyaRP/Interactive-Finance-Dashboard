
import React from 'react';
import { formatCurrency } from '../utils/math';

interface BreakdownTableProps {
  mode: 'EMI' | 'SIP';
  data: any[];
}

export const BreakdownTable: React.FC<BreakdownTableProps> = ({ mode, data }) => {
  return (
    <div className="w-full overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/40 backdrop-blur-xl shadow-2xl">
      <div className="p-6 border-b border-slate-800 flex justify-between items-center">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          {mode === 'EMI' ? 'Amortization Schedule' : 'Growth Projection'}
          <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded-full uppercase tracking-tighter">Yearly</span>
        </h3>
      </div>
      <div className="overflow-x-auto max-h-[400px] overflow-y-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-slate-900/90 backdrop-blur-md z-10">
            <tr>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800">Year</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800">
                {mode === 'EMI' ? 'Principal Paid' : 'Invested'}
              </th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800">
                {mode === 'EMI' ? 'Interest Paid' : 'Returns'}
              </th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800">
                {mode === 'EMI' ? 'Outstanding' : 'Total Value'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-800/30 transition-colors group">
                <td className="p-4 text-sm font-bold text-white">Year {row.year}</td>
                <td className="p-4 text-sm text-slate-300">
                  {formatCurrency(mode === 'EMI' ? row.principalPaid : row.invested)}
                </td>
                <td className={`p-4 text-sm font-medium ${mode === 'EMI' ? 'text-blue-400' : 'text-emerald-400'}`}>
                  {formatCurrency(mode === 'EMI' ? row.interestPaid : row.returns)}
                </td>
                <td className="p-4 text-sm font-bold text-white">
                  {formatCurrency(mode === 'EMI' ? row.balance : row.total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
