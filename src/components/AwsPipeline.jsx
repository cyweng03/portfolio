const steps = [
  { title: 'EventBridge', subtitle: 'Start validation', purpose: 'Coordinate the automated post-processing validation workflow.', contribution: 'Integrated EventBridge with the validation system and provisioned infrastructure using AWS CDK.', failure: 'Operational consideration: a missing or repeated trigger should be detectable. This simplified view does not assert the production retry or deduplication policy.' },
  { title: 'Glue + Spark', subtitle: 'Check the records', purpose: 'Apply schema enforcement, null detection, and field-specific validation rules to the processed data.', contribution: 'Built custom validation logic for 15K+ daily records.', failure: 'Invalid schemas, nulls, and rule violations are the errors these checks are designed to identify early.' },
  { title: 'Validation findings', subtitle: 'Support investigation', purpose: 'Make data-quality problems easier to identify before they create more downstream debugging work.', contribution: 'Delivered a system that reduced debugging time by 20%+ and data-quality on-call tickets by 25%.', failure: 'Operational consideration: findings should contain enough context to investigate. Alert routing and record disposition are intentionally omitted from this public overview.' },
];

export default function AwsPipeline() {
  return <section className="technical-demo pipeline-demo" aria-labelledby="pipeline-title">
    <div className="demo-heading"><h4 id="pipeline-title">Inside the validation workflow</h4><span className="demo-label">Simplified technical overview</span></div>
    <p className="demo-intro">Expand a step to explore its purpose, my contribution, and failure considerations. This is a conceptual view, not the production architecture.</p>
    <ol className="pipeline-steps">{steps.map(step => <li key={step.title}><details><summary><span className="pipeline-title">{step.title}</span><span className="pipeline-subtitle">{step.subtitle}</span><span className="pipeline-expand">Explore step</span></summary><div className="pipeline-detail"><h5>Purpose</h5><p>{step.purpose}</p><h5>My contribution</h5><p>{step.contribution}</p><h5>Failure considerations</h5><p>{step.failure}</p></div></details></li>)}</ol>
  </section>;
}
