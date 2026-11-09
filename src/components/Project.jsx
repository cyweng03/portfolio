import projects from '../projects.json';
import { IconFileText, IconGitBranch } from '@tabler/icons-react';
import AwsPipeline from './AwsPipeline';
import QuickFiDemo from './QuickFiDemo';

const featuredNames = ['Kikoff', 'Data Validation System', 'QuickFi'];
const projectIds = { Kikoff: 'kikoff', 'Data Validation System': 'aws', QuickFi: 'quickfi' };

function ProjectName({ project }) {
  return project.link ? <a href={project.link} target="_blank" rel="noopener noreferrer">{project.name}<span aria-hidden="true"> ↗</span></a> : project.name;
}

function CaseStudy({ project }) {
  const story = project.caseStudy;
  return <article id={projectIds[project.name]} className="case-study" aria-label={`${project.name} case study`}>
    <div className="case-file-header"><span><IconFileText size={16} aria-hidden="true" />{projectIds[project.name]} / case-study.md</span><span><IconGitBranch size={14} aria-hidden="true" />Engineering notes</span></div>
    <div className="case-body">
    <header className="case-header">
      <div><p className="case-focus">{story.focus}</p><h3>{project.name === 'Data Validation System' ? 'Amazon Web Services' : project.name}</h3><p className="case-role">{project.type}</p></div>
      <p className="case-date">{project.time}</p>
    </header>
    <h4 className="case-title">{story.title}</h4>
    <dl className="case-story">{[['Problem', story.problem], ['My contribution', story.contribution], ['Key decision', story.decision], ['Result', story.result]].map(([label, value]) => <div key={label} className={label === 'Result' ? 'case-result' : ''}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    <ul className="technology-list" aria-label={`${project.name} technologies`}>{project.tools.map(tool => <li key={tool}>{tool}</li>)}</ul>
    {project.name === 'Data Validation System' && <AwsPipeline />}
    {project.name === 'QuickFi' && <QuickFiDemo />}
    </div>
  </article>;
}

export default function Projects() {
  const featured = featuredNames.map(name => projects.Projects.find(project => project.name === name));
  const other = projects.Projects.filter(project => !featuredNames.includes(project.name));
  return <>
    <div className="featured-projects">{featured.map(project => <CaseStudy key={project.name} project={project} />)}</div>
    <section id="Projects" className="other-work" aria-labelledby="other-work-title">
      <h3 id="other-work-title">More things I’ve built</h3>
      <p className="section-intro">Client work, research, and experiments along the way.</p>
      <div className="compact-projects">{other.map(project => <details key={project.name} className="compact-project"><summary><span><strong>{project.name}</strong><span className="compact-summary">{project.summary}</span></span><span className="compact-date">{project.time}</span></summary><div className="compact-detail"><p>{project.desription}</p><ul className="technology-list" aria-label={`${project.name} technologies`}>{project.tools.map(tool => <li key={tool}>{tool}</li>)}</ul>{project.link && <p className="project-link"><ProjectName project={project} /></p>}</div></details>)}</div>
    </section>
  </>;
}
