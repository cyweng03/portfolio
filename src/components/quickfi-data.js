// Fictional durations illustrating the real project's financing stages.
// No customer, lender, dealer, or company records are used here.
export const stages = ['Credit decision', 'Deal setup', 'Contract signing', 'Funding review', 'Countersignature', 'Vendor payment'];
export const transactions = [
  { id: 'DEMO-01', lender: 'Lender A', dealer: 'North', hours: [8, 2, 16, 4, 2, 6] },
  { id: 'DEMO-02', lender: 'Lender A', dealer: 'North', hours: [10, 3, 20, 5, 3, 8] },
  { id: 'DEMO-03', lender: 'Lender A', dealer: 'North', hours: [12, 2, 18, 4, 2, 7] },
  { id: 'DEMO-04', lender: 'Lender A', dealer: 'North', hours: [9, 4, 22, 6, 3, 9] },
  { id: 'DEMO-05', lender: 'Lender B', dealer: 'South', hours: [14, 3, 24, 5, 2, 8] },
  { id: 'DEMO-06', lender: 'Lender B', dealer: 'South', hours: [11, 2, 20, 4, 3, 6] },
  { id: 'DEMO-07', lender: 'Lender B', dealer: 'South', hours: [16, 4, 28, 6, 2, 9] },
  { id: 'DEMO-08', lender: 'Lender B', dealer: 'South', hours: [10, 3, 72, 5, 3, 7] },
];
export function quantile(sorted, p) {
  if (!sorted.length) return null;
  const index = (sorted.length - 1) * p;
  const lower = Math.floor(index);
  return sorted[lower] + (sorted[Math.ceil(index)] - sorted[lower]) * (index - lower);
}
export function analyzeTransactions(rows) {
  const averages = stages.map((_, i) => {
    const values = rows.map(row => row.hours[i]).filter(value => Number.isFinite(value) && value >= 0);
    return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null;
  });
  const totals = rows.map(row => ({ ...row, total: row.hours.every(value => Number.isFinite(value) && value >= 0) ? row.hours.reduce((sum, value) => sum + value, 0) : null }));
  const thresholds = [];
  const outliers = [];
  // Match the backend: group by stage and lender, require >=4 observations,
  // and skip groups with zero IQR. End-to-end is also an analyzed stage.
  for (const lender of new Set(rows.map(row => row.lender))) {
    const group = totals.filter(row => row.lender === lender);
    for (let index = 0; index <= stages.length; index++) {
      const stage = index === stages.length ? 'End-to-end' : stages[index];
      const duration = row => index === stages.length ? row.total : row.hours[index];
      const valid = group.filter(row => Number.isFinite(duration(row)) && duration(row) >= 0);
      if (valid.length < 4) continue;
      const sorted = valid.map(duration).sort((a, b) => a - b);
      const q1 = quantile(sorted, 0.25), q3 = quantile(sorted, 0.75);
      const iqr = q3 - q1;
      if (iqr === 0) continue;
      const threshold = q3 + 1.5 * iqr;
      thresholds.push({ lender, stage, threshold });
      for (const row of valid) {
        if (duration(row) > threshold) outliers.push({ id: row.id, lender, stage, hours: duration(row), threshold });
      }
    }
  }
  const finiteAverages = averages.map(value => value ?? -Infinity);
  return { averages, totals, thresholds, outliers, slowest: rows.length ? finiteAverages.indexOf(Math.max(...finiteAverages)) : -1 };
}
