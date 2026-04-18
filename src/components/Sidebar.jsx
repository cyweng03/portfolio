import React, { useEffect, useState } from 'react';

const Sidebar = ({ sections }) => {
  const [activeSection, setActiveSection] = useState('');

  const handleScroll = () => {
    const currentSection = sections.find((section) => {
      const element = document.getElementById(section.id);
      const rect = element.getBoundingClientRect();
      return rect.top <= 50 && rect.bottom >= 50;
    });
    setActiveSection(currentSection ? currentSection.id : '');
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed left-0 top-0 h-full w-[10%] flex flex-col justify-center space-y-5 sm:hidden">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className={`p-2 text-xl bg-transparent text-left ml-5 ${activeSection === section.id ? 'font-bold' : ''}`}
        >
          {section.title}
        </button>
      ))}
      <a
        href="https://drive.google.com/file/d/1eJ9LAC1utC95uls7Eo2URVREpn7aBJ6m/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 text-xl bg-transparent text-left ml-5 mt-auto"
      >
        Resume
      </a>
    </div>

  );
};

export default Sidebar;
