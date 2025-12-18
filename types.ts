
export type CalculatorMode = 'EMI' | 'SIP';

export interface EMIData {
  principal: number;
  interestRate: number;
  tenure: number;
}

export interface SIPData {
  monthlyInvestment: number;
  expectedReturn: number;
  period: number;
}

export interface CalculationResults {
  principal: number;
  secondary: number; // Interest for EMI, Returns for SIP
  total: number;
  monthlyValue?: number; // EMI value or monthly growth marker
}

export interface DonutSegment {
  label: string;
  value: number;
  color: string;
  percent: number;
}
