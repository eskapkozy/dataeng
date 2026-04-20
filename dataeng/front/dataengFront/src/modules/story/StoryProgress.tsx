import { useState, useEffect } from 'react';
import { useScrollProgress } from '../../hooks/useScrollreveal';

const SECTIONS = [
  { id: 'origine', label: '01' },
  { id: 'constat', label: '02' },
  { id: 'vision', label: '03' },
  { id: 'piliers', label: '04' },
  { id: 'chiffres', label: '05' },
  { id: 'communaute', label: '06' },
  { id: 'futur', label: '07' },
];

export function StoryProgress() {
  const scrollYProgress = useScrollProgress();
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const element = section as HTMLElement;
        const { offsetTop, offsetHeight } = element;
        
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="story-progress">
      <div className="progress-dots">
        {SECTIONS.map((section, index) => (
          <button
            key={section.id}
            className={`progress-dot ${index === activeSection ? 'progress-dot--active' : ''}`}
            onClick={() => scrollToSection(section.id)}
            title={section.id}
            aria-label={`Aller à la section ${section.label}`}
          >
            <span className="progress-dot-label">{section.label}</span>
          </button>
        ))}
      </div>
      
      <div className="progress-bar">
        <div 
          className="progress-bar-fill" 
          style={{ transform: `scaleY(${scrollYProgress})` }}
        />
      </div>
    </div>
  );
}
