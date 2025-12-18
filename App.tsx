
import React, { useState, useMemo } from 'react';
import { CalculatorMode, CalculationResults, DonutSegment } from './types';
import { calculateEMI, calculateSIP, formatCurrency, formatPercent } from './utils/math';
import { DonutChart } from './components/DonutChart';
import { InputGroup } from './components/InputGroup';
import { AnimatedNumber } from './components/AnimatedNumber';
import { BreakdownTable } from './components/BreakdownTable';
import { Wallet, PieChart, TrendingUp, Landmark, ArrowRight, Share2, Info, ChevronDown } from 'lucide-react';

const App: React.FC = () => {
  const [mode, setMode] = useState<CalculatorMode>('EMI');
  const [showBreakdown, setShowBreakdown] = useState(false);
  
  // EMI State
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  // SIP State
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [period, setPeriod] = useState(10);

  // Real-time calculation
  const calculation = useMemo(() => {
    if (mode === 'EMI') {
      return calculateEMI(loanAmount, interestRate, tenure);
    } else {
      return calculateSIP(monthlyInvestment, expectedReturn, period);
    }
  }, [mode, loanAmount, interestRate, tenure, monthlyInvestment, expectedReturn, period]);

  const results: CalculationResults = calculation;

  const segments: DonutSegment[] = useMemo(() => {
    const pPercent = (results.principal / results.total) * 100;
    const sPercent = (results.secondary / results.total) * 100;
    
    return [
      { label: 'Principal', value: results.principal, color: '#3B82F6', percent: pPercent },
      { label: mode === 'EMI' ? 'Interest' : 'Returns', value: results.secondary, color: '#10B981', percent: sPercent }
    ];
  }, [results, mode]);

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 lg:p-12 transition-all duration-500 bg-[#0F172A]">
      {/* Background Decor */}
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="max-w-7xl mx-auto w-full mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div className="animate-in fade-in slide-in-from-left duration-700">
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <span className="p-2 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl shadow-lg shadow-blue-500/20">
              <Landmark size={28} />
            </span>
            FinCalc <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Premium</span>
          </h1>
          <p className="text-slate-400 mt-1 text-sm font-medium">Smart financial engineering for your future.</p>
        </div>

        <div className="flex bg-slate-900/80 backdrop-blur-xl p-1.5 rounded-2xl border border-slate-800 shadow-2xl animate-in fade-in slide-in-from-right duration-700">
          <button
            onClick={() => { setMode('EMI'); setShowBreakdown(false); }}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all duration-300 ${
              mode === 'EMI' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 scale-105' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Wallet size={16} />
            EMI Calculator
          </button>
          <button
            onClick={() => { setMode('SIP'); setShowBreakdown(false); }}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all duration-300 ${
              mode === 'SIP' 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 scale-105' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <TrendingUp size={16} />
            SIP Planner
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* Left Panel: Inputs */}
        <div className="lg:col-span-5 bg-slate-900/40 backdrop-blur-3xl rounded-[2.5rem] border border-slate-800/50 p-8 shadow-2xl relative overflow-hidden group animate-in zoom-in-95 duration-700">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
            {mode === 'EMI' ? <Landmark size={120} /> : <TrendingUp size={120} />}
          </div>
          
          <div className="relative z-10">
            <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              Parameters
              <div className="h-1 w-12 bg-blue-500/30 rounded-full" />
            </h2>

            {mode === 'EMI' ? (
              <>
                <InputGroup
                  label="Loan Amount"
                  value={loanAmount}
                  min={100000}
                  max={10000000}
                  step={50000}
                  unit=""
                  prefix="₹"
                  onChange={setLoanAmount}
                />
                <InputGroup
                  label="Interest Rate"
                  value={interestRate}
                  min={1}
                  max={30}
                  step={0.1}
                  unit="p.a."
                  onChange={setInterestRate}
                />
                <InputGroup
                  label="Loan Tenure"
                  value={tenure}
                  min={1}
                  max={30}
                  step={1}
                  unit="Yrs"
                  onChange={setTenure}
                />
              </>
            ) : (
              <>
                <InputGroup
                  label="Monthly Investment"
                  value={monthlyInvestment}
                  min={500}
                  max={1000000}
                  step={500}
                  unit=""
                  prefix="₹"
                  onChange={setMonthlyInvestment}
                />
                <InputGroup
                  label="Expected Return Rate"
                  value={expectedReturn}
                  min={1}
                  max={30}
                  step={0.5}
                  unit="p.a."
                  onChange={setExpectedReturn}
                />
                <InputGroup
                  label="Investment Period"
                  value={period}
                  min={1}
                  max={40}
                  step={1}
                  unit="Yrs"
                  onChange={setPeriod}
                />
              </>
            )}

            <div className="mt-12 pt-8 border-t border-slate-800/50">
              <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">
                <span>Asset Summary</span>
                <Info size={14} className="cursor-pointer hover:text-white transition-colors" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/30 rounded-2xl p-4 border border-slate-700/30 group/item hover:bg-slate-800/50 transition-all">
                  <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">Total Principal</p>
                  <p className="text-white font-bold text-sm">
                    {formatCurrency(results.principal)}
                  </p>
                </div>
                <div className="bg-slate-800/30 rounded-2xl p-4 border border-slate-700/30 group/item hover:bg-slate-800/50 transition-all">
                  <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">
                    {mode === 'EMI' ? 'Total Interest' : 'Estimated Returns'}
                  </p>
                  <p className={`${mode === 'EMI' ? 'text-blue-400' : 'text-emerald-400'} font-bold text-sm`}>
                    {formatCurrency(results.secondary)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Visualization & Results */}
        <div className="lg:col-span-7 space-y-8 animate-in zoom-in-95 duration-700 delay-100">
          
          {/* Main Display Card */}
          <div className="bg-slate-900/60 backdrop-blur-3xl rounded-[2.5rem] border border-slate-800 p-6 md:p-8 lg:p-10 shadow-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent pointer-events-none" />
            
            <div className="flex flex-col gap-6 relative z-10">
              {/* Top Section - Values */}
              <div className="w-full text-center md:text-left">
                <p className="text-slate-400 text-xs md:text-sm font-bold uppercase tracking-widest mb-2">
                  {mode === 'EMI' ? 'Estimated Monthly EMI' : 'Estimated Maturity Value'}
                </p>
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter mb-6 leading-none">
                  <AnimatedNumber value={results.monthlyValue || 0} formatter={formatCurrency} />
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto md:mx-0">
                  <div className="flex items-center justify-between sm:justify-start sm:gap-4 text-sm py-3 border-b border-slate-800/50">
                    <span className="text-slate-400 font-medium">Total Balance</span>
                    <span className="text-white font-bold">{formatCurrency(results.total)}</span>
                  </div>
                  <div className="flex items-center justify-between sm:justify-start sm:gap-4 text-sm py-3 border-b border-slate-800/50">
                    <span className="text-slate-400 font-medium">Wealth Growth Rate</span>
                    <div className="flex items-center gap-2">
                      <TrendingUp size={14} className="text-emerald-400" />
                      <span className="text-emerald-400 font-bold">
                        {((results.secondary / results.total) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Section - Chart */}
              <div className="w-full flex items-center justify-center md:justify-end mt-4">
                <DonutChart 
                  segments={segments} 
                  centerLabel="Gross Total" 
                  centerValue={formatCurrency(results.total)} 
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 md:gap-4 justify-center md:justify-start">
            <button className="bg-white text-slate-900 px-6 md:px-8 py-3 md:py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 md:gap-3 hover:bg-blue-50 transition-all shadow-xl shadow-white/5 active:scale-95 text-sm md:text-base">
              Start Investing Now
              <ArrowRight size={18} className="md:w-5 md:h-5" />
            </button>
            <button 
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="bg-slate-800/80 text-white px-6 md:px-8 py-3 md:py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 md:gap-3 hover:bg-slate-700 transition-all border border-slate-700 active:scale-95 text-sm md:text-base">
              View Schedule
              <ChevronDown size={18} className={`md:w-5 md:h-5 transition-transform duration-300 ${showBreakdown ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Table Breakdown (Collapsible) */}
          <div className={`transition-all duration-500 overflow-hidden ${showBreakdown ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <BreakdownTable mode={mode} data={calculation.breakdown} />
          </div>

          {/* Breakdown Section Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl group hover:border-blue-500/30 transition-all shadow-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-600/10 text-blue-500 rounded-2xl">
                  <PieChart size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold">Composition</h4>
                  <p className="text-slate-500 text-xs">Asset breakdown</p>
                </div>
              </div>
              <div className="space-y-3">
                {segments.map((seg, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: seg.color }} />
                      <span className="text-slate-400 text-sm font-medium">{seg.label}</span>
                    </div>
                    <span className="text-white text-sm font-bold">{seg.percent.toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl group hover:border-emerald-500/30 transition-all shadow-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-emerald-600/10 text-emerald-500 rounded-2xl">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold">Annual Yield</h4>
                  <p className="text-slate-500 text-xs">Expected performance</p>
                </div>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-black text-white">
                  {mode === 'EMI' ? formatPercent(interestRate) : formatPercent(expectedReturn)}
                </span>
                <span className="text-slate-500 text-xs font-bold mb-1 uppercase tracking-widest">Fixed APY</span>
              </div>
              <p className="text-slate-400 text-xs mt-3 leading-relaxed">
                Calculated based on standard compound interest models using monthly compounding frequency.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto w-full mt-20 pt-10 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between text-slate-500 text-[10px] gap-6 uppercase tracking-[0.2em] font-bold relative z-10">
        <p className="flex items-center gap-2">
          <Share2 size={12} className="text-blue-500" />
          FinCalc Premium Engineering v1.2
        </p>
        <div className="flex gap-10">
          <a href="#" className="hover:text-blue-400 transition-colors">Risk Disclosure</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Financial Policy</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Support</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
