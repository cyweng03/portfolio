import { useId, useState } from 'react';
import { analyzeTransactions, stages, transactions } from './quickfi-data';

const questions = [
  { id: 'stages', label: 'Which financing stage takes longest?' },
  { id: 'lenders', label: 'How do lenders compare?' },
  { id: 'outliers', label: 'Which signing times are outliers?' },
];
const format = value => `${Number(value.toFixed(1))}h`;

export default function QuickFiDemo() {
  const [question, setQuestion] = useState('stages');
  const panelId = useId();
  const analysis = analyzeTransactions(transactions);
  const signingIndex = stages.indexOf('Contract signing');
  const signingFlags = analysis.outliers.filter(flag => flag.stage === 'Contract signing');
  const lenders = [...new Set(transactions.map(row => row.lender))].map(lender => {
    const rows = analysis.totals.filter(row => row.lender === lender);
    return { label: lender, value: rows.reduce((sum, row) => sum + row.total, 0) / rows.length };
  });
  const bars = question === 'stages'
    ? stages.map((label, i) => ({ label, value: analysis.averages[i] }))
    : question === 'lenders' ? lenders
      : transactions.map(row => ({ label: row.id, lender: row.lender, value: row.hours[signingIndex], outlier: signingFlags.some(flag => flag.id === row.id) }));
  const maximum = Math.max(...bars.map(bar => bar.value));
  const answer = question === 'stages'
    ? `${stages[analysis.slowest]} is the slowest stage, averaging ${format(analysis.averages[analysis.slowest])} across ${transactions.length} fictional transactions.`
    : question === 'lenders'
      ? `${lenders[1].label} averages ${format(lenders[1].value)} end to end, compared with ${format(lenders[0].value)} for ${lenders[0].label}. Each group contains four sample transactions; this comparison alone doesn’t explain the cause.`
      : signingFlags.map(flag => `${flag.id} takes ${format(flag.hours)} in contract signing, exceeding ${flag.lender}’s ${format(flag.threshold)} signing threshold.`).join(' ');
  const chartTitle = question === 'stages' ? 'Average financing stage duration' : question === 'lenders' ? 'Average end-to-end duration by lender' : 'Contract-signing duration by transaction';

  return (
    <section className="technical-demo" aria-labelledby={`${panelId}-title`}>
      <div className="demo-heading"><h4 id={`${panelId}-title`}>Explore the financing data</h4><span className="demo-label">Synthetic data demo</span></div>
      <p className="demo-intro">The actual app turns CSV logs into metrics in Supabase, then uses an OpenAI agent with read-only query tools to answer questions. This browser-only illustration calculates a small subset of that analysis from eight fictional records. It uses no live AI or company data.</p>
      <div className="question-options" aria-label="Choose an analysis question">
        {questions.map(item => <button type="button" key={item.id} aria-pressed={question === item.id} aria-controls={panelId} onClick={() => setQuestion(item.id)}>{item.label}</button>)}
      </div>
      <div id={panelId} className="analysis-output">
        <p className="analysis-answer" aria-live="polite">{answer}</p>
        <figure aria-label={`${chartTitle} in hours`}>
          <figcaption>{chartTitle} <span>Hours · lower is faster</span></figcaption>
          <div className="bar-chart">{bars.map(bar => (
            <div className="bar-row" key={bar.label}>
              <span className="bar-label">{bar.label}{bar.lender && <span className="bar-lender">{bar.lender}</span>}</span>
              <div className="bar-track"><div className={`bar-fill${bar.outlier ? ' is-outlier' : ''}`} style={{ width: `${bar.value / maximum * 100}%` }} /></div>
              <span className="bar-value">{format(bar.value)}{bar.outlier && <span className="outlier-marker"> Outlier</span>}</span>
            </div>
          ))}</div>
        </figure>
        <p className="method-note">{question === 'outliers'
          ? `Method: Q3 + 1.5 × IQR within each stage/lender group, using interpolated quartiles. Groups need at least four observations and nonzero IQR. Signing thresholds: ${analysis.thresholds.filter(row => row.stage === 'Contract signing').map(row => `${row.lender}: ${format(row.threshold)}`).join('; ')}. Flags identify records to investigate.`
          : 'Method: arithmetic mean of stage or end-to-end durations. The real pipeline also computes median, p75, p90, minimum, maximum, sample counts, and monthly counts across all, lender, and dealer scopes.'}</p>
      </div>
      <details className="sample-data"><summary>Inspect the eight fictional records</summary><div className="data-table-scroll"><table><caption>Fictional financing-stage durations in hours; end-to-end is their sum.</caption><thead><tr><th scope="col">Transaction</th><th scope="col">Lender</th><th scope="col">Dealer</th>{stages.map(stage => <th key={stage} scope="col">{stage}</th>)}</tr></thead><tbody>{transactions.map(row => <tr key={row.id}><th scope="row">{row.id}</th><td>{row.lender}</td><td>{row.dealer}</td>{row.hours.map((value, i) => <td key={i}>{value}</td>)}</tr>)}</tbody></table></div></details>
    </section>
  );
}
