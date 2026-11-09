import React, { useEffect, useState } from 'react';
import { IconBook, IconBriefcase, IconCode, IconUser } from '@tabler/icons-react';
const sectionIcons = { Home: IconBook, Experiences: IconBriefcase, Projects: IconCode, About: IconUser };

const Sidebar = ({ sections }) => {
  const [activeSection, setActiveSection] = useState('');

  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const updateNavigation = () => {
      const hero = document.getElementById('Home');
      // Match the section scroll offset: a small remaining strip of the hero
      // must not hide navigation after jumping to Experiences.
      setHeroVisible(Boolean(hero && hero.getBoundingClientRect().bottom > 88));
      const currentSection = [...sections].reverse().find(({ id }) => {
        const element = document.getElementById(id);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom > 100;
      });
      setActiveSection(currentSection ? currentSection.id : '');
    };
    updateNavigation();
    window.addEventListener('scroll', updateNavigation, { passive: true });
    window.addEventListener('resize', updateNavigation);
    return () => {
      window.removeEventListener('scroll', updateNavigation);
      window.removeEventListener('resize', updateNavigation);
    };
  }, [sections]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  return (
    <nav className={`site-navigation${heroVisible ? " site-navigation-hidden" : ""}`} aria-label="Main navigation">
      {sections.map((section) => {
        const Icon = sectionIcons[section.id];
        return (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          aria-current={activeSection === section.id ? 'location' : undefined}
          className={activeSection === section.id ? 'font-bold' : ''}
        >
          {Icon && <Icon size={16} aria-hidden="true" />}{section.title}
        </button>
      );})}
      <a
        href={`${import.meta.env.BASE_URL}Chu-Yin_Resume.pdf`}
        target="_blank"
        rel="noopener noreferrer"
        className="resume-link"
      >
        Resume
      </a>
    </nav>

  );
};

export default Sidebar;
