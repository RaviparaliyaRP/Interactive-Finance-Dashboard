
export const calculateEMI = (P: number, annualRate: number, years: number) => {
  const r = annualRate / 12 / 100;
  const n = years * 12;
  
  if (r === 0) {
    const emi = P / n;
    return {
      monthlyValue: emi,
      principal: P,
      secondary: 0,
      total: P,
      breakdown: Array.from({ length: years }, (_, i) => ({
        year: i + 1,
        principalPaid: P / years,
        interestPaid: 0,
        balance: P - (P / years) * (i + 1)
      }))
    };
  }
  
  const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayable = emi * n;
  const totalInterest = totalPayable - P;

  // Generate yearly breakdown
  const breakdown = [];
  let remainingBalance = P;
  for (let y = 1; y <= years; y++) {
    let yearlyInterest = 0;
    let yearlyPrincipal = 0;
    for (let m = 1; m <= 12; m++) {
      const interestForMonth = remainingBalance * r;
      const principalForMonth = emi - interestForMonth;
      yearlyInterest += interestForMonth;
      yearlyPrincipal += principalForMonth;
      remainingBalance -= principalForMonth;
    }
    breakdown.push({
      year: y,
      principalPaid: yearlyPrincipal,
      interestPaid: yearlyInterest,
      balance: Math.max(0, remainingBalance)
    });
  }

  return {
    monthlyValue: emi,
    principal: P,
    secondary: totalInterest,
    total: totalPayable,
    breakdown
  };
};

export const calculateSIP = (P: number, annualReturn: number, years: number) => {
  const r = annualReturn / 12 / 100;
  const n = years * 12;
  
  const breakdown = [];
  let totalInvested = 0;
  let currentBalance = 0;

  for (let y = 1; y <= years; y++) {
    for (let m = 1; m <= 12; m++) {
      totalInvested += P;
      // SIP investment usually happens at the start of the month
      currentBalance = (currentBalance + P) * (1 + r);
    }
    breakdown.push({
      year: y,
      invested: totalInvested,
      returns: currentBalance - totalInvested,
      total: currentBalance
    });
  }

  const maturityAmount = currentBalance;
  const totalInvestment = totalInvested;
  const estimatedReturns = maturityAmount - totalInvestment;

  return {
    monthlyValue: maturityAmount,
    principal: totalInvestment,
    secondary: estimatedReturns,
    total: maturityAmount,
    breakdown
  };
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatPercent = (value: number): string => {
  return value.toFixed(1) + '%';
};
