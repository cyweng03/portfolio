"use client";
import React from "react";
import me from "./img/me.jpg";
import Project from "./components/Project";
import { useRef } from "react";
import { IconBook, IconBrandGithub, IconBrandLinkedin, IconCode, IconFileText, IconMail, IconSchool, IconBriefcase } from '@tabler/icons-react';
import ThemeToggle from './components/ThemeToggle';
import { BackgroundGradientAnimation } from './ui/background-gradient-animation';
import Sidebar from './components/Sidebar';

const Landing = () => {

  const secondPortionRef = useRef(null);

  const scrollToSecondPortion = () => {
    secondPortionRef.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  const sections = [
    { id: 'Home', title: 'Overview' },
    { id: 'Experiences', title: 'Experience' },
    { id: 'Projects', title: 'Projects' },
    { id: 'About', title: 'About' },
  ];

  return (
    <div className="relative isolate">
      <BackgroundGradientAnimation
        containerClassName="fixed inset-0 -z-10 pointer-events-none portfolio-gradient"
        interactive={false}
      />
      <header className="workspace-header">
        <a href="https://github.com/dorawengg" target="_blank" rel="noopener noreferrer" className="workspace-brand" aria-label="Dora’s GitHub profile"><IconBrandGithub size={28} aria-hidden="true" /></a>
        <div className="workspace-path"><span>dorawengg</span><span className="path-slash">/</span><strong>portfolio</strong><span className="repo-label">Personal site</span></div>
        <ThemeToggle />
      </header>
      <Sidebar sections={sections} />
      {/* <div>
        <Top />
      </div> */}
      <div className="site-content">
        <section id="Home" className="overview-section">
          <aside className="profile-panel" aria-label="About Dora">
            <img src={me} alt="Chu-Yin (Dora) Weng" className="profile-avatar" />
            <h1>Chu-Yin Weng</h1><p className="profile-handle">Dora · dorawengg</p>
            <p className="profile-bio">Full-stack engineer. I make complicated information feel intuitive.</p>
            <a className="profile-contact" href="mailto:cw749@cornell.edu">Let’s connect</a>
            <ul className="profile-facts">
              <li><IconBriefcase size={16} aria-hidden="true" /><span>Engineering at Kikoff</span></li>
              <li><IconSchool size={16} aria-hidden="true" /><span>Cornell Computer Science</span></li>
              <li><IconMail size={16} aria-hidden="true" /><a href="mailto:cw749@cornell.edu">Email me</a></li>
              <li><IconBrandGithub size={16} aria-hidden="true" /><a href="https://github.com/dorawengg" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><IconBrandLinkedin size={16} aria-hidden="true" /><a href="https://www.linkedin.com/in/chuyinweng/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            </ul>
          </aside>
          <div className="overview-main">
            <div className="readme-panel">
              <div className="file-header"><IconFileText size={16} aria-hidden="true" /><span>dorawengg / README.md</span></div>
              <div className="readme-content">
                <p className="readme-greeting">Hi, I’m Dora.</p>
                <h2>A developer passionate about building user-centered solutions.</h2>
                <p>I’m a full-stack engineer who connects careful engineering with the way people actually work. I build onboarding systems, data pipelines, and tools that turn information into answers.</p>
                <div className="hero-actions">
                  <button type="button" className="action-primary" onClick={scrollToSecondPortion}><IconBook size={16} aria-hidden="true" />Explore my work</button>
                  <a className="action-secondary" href={`${import.meta.env.BASE_URL}Chu-Yin_Resume.pdf`} target="_blank" rel="noopener noreferrer"><IconFileText size={16} aria-hidden="true" />Resume</a>
                </div>
                <p className="readme-note">Clean code. Thoughtful decisions. Clear communication.</p>
              </div>
            </div>
            <div className="pinned-heading"><h2>Pinned work</h2><span>Three different engineering challenges</span></div>
            <div className="pinned-projects">
              {[
                { id: 'kikoff', name: 'Kikoff', description: 'Building a vendor integration to reduce operating costs, alongside fixes and improvements owned across the codebase.', area: 'Backend & collaboration', result: '$5M expected ARR from integration', language: 'Ruby', color: 'ruby' },
                { id: 'aws', name: 'AWS', description: 'Automated data-quality validation for production workflows serving 1M+ customers.', area: 'Infrastructure & reliability', result: '25% fewer on-call tickets', language: 'Python', color: 'python' },
                { id: 'quickfi', name: 'QuickFi', description: 'Financing analytics with a React dashboard, Python ETL, and an AI agent that queries computed metrics.', area: 'Data & product thinking', result: '80% faster bottleneck detection', language: 'Python', color: 'python' },
              ].map(item => <a href={`#${item.id}`} key={item.id} className="pinned-project" onClick={event => { event.preventDefault(); document.getElementById(item.id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); }}>
                <div className="pinned-title"><IconCode size={16} aria-hidden="true" /><h3>{item.name}</h3><span className="repo-label">Case study</span></div>
                <p>{item.description}</p><span className="pinned-result">{item.result}</span>
                <div className="pinned-meta"><span><i className={`language-dot ${item.color}`} aria-hidden="true" />{item.language}</span><span>{item.area}</span></div>
              </a>)}
            </div>
          </div>
        </section>
        {/* <Navbar /> */}
        <section id="Experiences" ref={secondPortionRef} className="portfolio-section">
          <div>
            <div className="space-y-10">
              <div><h2 className="section-heading">Experience, documented</h2><p className="section-intro">The problem, the decisions, and what changed.</p></div>
              <div className="space-y-10">
                {/* <Projects /> */}
                <Project />
              </div>
            </div>
            <div className=" mt-5 mb-2">
              {" "}
              {/* GitHub Link Section */}
              Want to see more? Check out my (actual) {" "}
              <a
                href="https://github.com/dorawengg"
                className="font-bold underline"
              >

                GitHub!
              </a>
            </div>
          </div>

        </section>

        <section id="About" className="portfolio-section about-section">
          <div className="items-center">
            <div>
              <div className="about-layout">
                <div className="about-copy">
                  <h2 className="section-heading">A little more about me</h2>
                  <p className="mt-5 mb-2 leading-relaxed">
                    I’m a full-stack engineer who enjoys helping people understand complicated concepts and data by making information more intuitive through technology. I graduated from Cornell University with a B.S. in Computer Science and a minor in Information Science.
                  </p>
                  <p className="mt-5 mb-2 leading-relaxed">
                    At Kikoff, I build onboarding systems and internal tools, collaborate with external vendors on integrations, and work closely with Product Ops to improve the customer experience. My experience also spans data pipelines at AWS, healthcare-focused AI research, and freelance applications for education and financial analytics.
                  </p>
                  <p className="mt-5 mb-2 leading-relaxed">
                    I take pride in writing clean code, understanding the underlying problem, and choosing solutions that address it effectively. I value clear communication, thoughtful collaboration, and delivering results efficiently while staying open to new perspectives.
                  </p>
                  <p className="mt-5 mb-2 leading-relaxed">
                    Outside of work, I explore creative websites, experiment with coffee recipes, and put together monthly <a href="https://open.spotify.com/user/bz8bpaku8nlwtlnl2n4v3djh9?si=c8a0d409b5704a3b" className="inline-link">Spotify</a> playlists. Have something in mind? <a href="https://www.linkedin.com/in/chuyinweng/" className="inline-link">Let’s connect!</a>
                  </p>
                  <div className="flex flex-row items-center space-x-8 ">
                    <a
                      href="https://github.com/dorawengg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconBrandGithub size={24} aria-label="GitHub" className="social-icon" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/chuyinweng/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconBrandLinkedin size={24} aria-label="LinkedIn" className="social-icon" />
                    </a>
                  </div>
                </div>
                <img
                  src={me}
                  alt="Chu-Yin (Dora) Weng"
                  className="about-photo"
                />
              </div>
            </div>
          </div>
        </section>
        <footer className="portfolio-footer"><span>Built by Dora, with care.</span><a href="https://github.com/dorawengg" target="_blank" rel="noopener noreferrer">Find me on GitHub</a><a href="mailto:cw749@cornell.edu">Get in touch</a></footer>
      </div>
    </div>
  );
};

export default Landing;
