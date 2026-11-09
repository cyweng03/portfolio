import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeTransactions, quantile, stages, transactions } from '../src/components/quickfi-data.js';

test('financing-stage and lender metrics agree with the fictional records', () => {
  const result = analyzeTransactions(transactions);
  assert.equal(stages.length, 6);
  assert.deepEqual(result.averages, [11.25, 2.875, 27.5, 4.875, 2.5, 7.5]);
  assert.equal(stages[result.slowest], 'Contract signing');
  for (const [lender, expected] of [['Lender A', 46.25], ['Lender B', 66.75]]) {
    const rows = result.totals.filter(row => row.lender === lender);
    assert.equal(rows.reduce((sum, row) => sum + row.total, 0) / rows.length, expected);
  }
});

test('outliers use stage/lender groups rather than global transaction totals', () => {
  assert.equal(quantile([1, 2, 3, 4], 0.25), 1.75);
  const result = analyzeTransactions(transactions);
  // Lender B signing: 20,24,28,72. Q1=23, Q3=39, upper fence=63.
  assert.deepEqual(result.outliers, [{ id: 'DEMO-08', lender: 'Lender B', stage: 'Contract signing', hours: 72, threshold: 63 }]);
  assert.equal(result.thresholds.find(row => row.lender === 'Lender A' && row.stage === 'Contract signing').threshold, 25);
  // The same transaction is not an end-to-end outlier in its lender group.
  assert.equal(result.outliers.some(row => row.stage === 'End-to-end'), false);
});

test('small and zero-IQR groups are skipped, matching the backend rules', () => {
  assert.deepEqual(analyzeTransactions(transactions.slice(0, 3)).thresholds, []);
  const identical = Array.from({ length: 4 }, (_, i) => ({ id: `same-${i}`, lender: 'A', hours: [1, 1, 1, 1, 1, 1] }));
  assert.deepEqual(analyzeTransactions(identical).thresholds, []);
  assert.deepEqual(analyzeTransactions([]).outliers, []);
});

test('missing and negative durations do not enter stage statistics', () => {
  const rows = [{ id: 'bad', lender: 'A', hours: [null, -1, 2, 2, 2, 2] }, { id: 'valid', lender: 'A', hours: [4, 6, 2, 2, 2, 2] }];
  const result = analyzeTransactions(rows);
  assert.deepEqual(result.averages.slice(0, 2), [4, 6]);
  assert.equal(result.totals[0].total, null);
});
