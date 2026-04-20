import { RevealText } from '../revealText';
import { useScrollReveal } from '../../../hooks/useScrollreveal';

interface Milestone {
  year: string;
  label: string;
  done: boolean;
}

/* ---- Chapter 7: La Feuille de Route / Futur ---- */
export function FuturSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
  
  const milestones: Milestone[] = [
    { year: '2023', label: 'Fondation', done: true },
    { year: '2024', label: 'Premiers meetups', done: true },
    { year: '2024', label: 'Communauté en ligne', done: true },
    { year: '2025', label: 'Conférence Data Congo', done: false },
    { year: '2025', label: 'Programme de mentoring', done: false },
    { year: '2026', label: 'Expansion régionale', done: false },
  ];

  return (
    <section className="story-section story-section--dark" id="futur" aria-labelledby="futur-title">
      <div className="section-inner">
        <RevealText className="chapter-label">
          <span className="mono-tag">// chapitre_07</span>
        </RevealText>

        <RevealText as="h2" className="chapter-title" delay={100}>
          La Feuille de Route
        </RevealText>

        <RevealText className="narrative-body" delay={200} as="p">
          Ce n'est que le début. Notre ambition est de faire de Brazzaville un pôle data
          de référence en Afrique centrale.
        </RevealText>

        <div 
          ref={ref as React.RefObject<HTMLDivElement>} 
          className="timeline"
          role="list"
          aria-label="Timeline des réalisations et objectifs futurs de Data Eng Congo"
        >
          {milestones.map((milestone, index) => (
            <TimelineItem
              key={`${milestone.year}-${index}`}
              milestone={milestone}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface TimelineItemProps {
  milestone: Milestone;
  index: number;
  isVisible: boolean;
}

function TimelineItem({ milestone, index, isVisible }: TimelineItemProps) {
  return (
    <div
      className={`timeline-item ${milestone.done ? 'timeline-item--done' : ''}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : 'translateX(-20px)',
        transition: `opacity 0.6s ease ${index * 100 + 300}ms, transform 0.6s ease ${index * 100 + 300}ms`,
      }}
      role="listitem"
    >
      <div 
        className="timeline-dot"
        aria-hidden={milestone.done ? 'false' : 'true'}
        aria-label={milestone.done ? 'Étape accomplie' : 'Étape à venir'}
      />
      <div className="timeline-content">
        <span className="timeline-year">{milestone.year}</span>
        <span className="timeline-label">{milestone.label}</span>
        {milestone.done && (
          <span className="timeline-badge" aria-label="Accompli">
            Accompli
          </span>
        )}
      </div>
    </div>
  );
}
