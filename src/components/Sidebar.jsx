import React, { useEffect, useState } from 'react';

const Sidebar = ({ sections }) => {
  const [activeSection, setActiveSection] = useState('');

  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const updateNavigation = () => {
      const hero = document.getElementById('Home');
      // Match the section scroll offset: a small remaining strip of the hero
      // must not hide navigation after jumping to Experiences.
      setHeroVisible(Boolean(hero && hero.getBoundingClientRect().bottom > 88));
      const currentSection = sections.find(({ id }) => {
        const element = document.getElementById(id);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 88 && rect.bottom > 88;
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
    element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`site-navigation${heroVisible ? " site-navigation-hidden" : ""}`} aria-label="Main navigation">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          aria-current={activeSection === section.id ? 'location' : undefined}
          className={activeSection === section.id ? 'font-bold' : ''}
        >
          {section.title}
        </button>
      ))}
      <a
        href="https://drive.google.com/file/d/1N-nLCJ2US0vGpmT-J0A6EImuss3SYZcA/view?usp=sharing"
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
