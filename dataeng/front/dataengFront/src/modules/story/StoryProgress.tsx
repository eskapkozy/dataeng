import { useScrollProgress } from '../../hooks/useScrollreveal';
import { useChapterNavigation } from '../../hooks/useChapterNavigation';

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
  const { showNavigation, activeSection, scrollToSection } = useChapterNavigation();

  return (
    <div className={`story-progress ${showNavigation ? 'story-progress--visible' : 'story-progress--hidden'}`}>
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
