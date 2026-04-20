import { RevealText, StaggerChildren } from '../revealText';

interface Pillar {
  number: string;
  title: string;
  description: string;
  color: string;
}

/* ---- Chapter 4: Les Piliers ---- */
export function PiliersSection() {
  const pillars: Pillar[] = [
    {
      number: '01',
      title: 'Connecter',
      description: 'Créer des liens authentiques entre les professionnels de la data et favoriser les collaborations.',
      color: 'var(--accent-blue)'
    },
    {
      number: '02', 
      title: 'Construire',
      description: 'Développer des projets collectifs et partager les connaissances pour faire grandir l\'écosystème.',
      color: 'var(--accent-purple)'
    },
    {
      number: '03',
      title: 'Élever',
      description: 'Former et mentoriser les talents pour atteindre l\'excellence et l\'innovation.',
      color: 'var(--active-green)'
    }
  ];

  return (
    <section className="story-section" id="piliers" aria-labelledby="piliers-title">
      <div className="section-inner">
        <RevealText className="chapter-label">
          <span className="mono-tag">// chapitre_04</span>
        </RevealText>

        <RevealText as="h2" className="chapter-title" delay={100}>
          Les Piliers
        </RevealText>

        <div className="narrative-block">
          <RevealText className="narrative-body" delay={200} as="p">
            Notre mission repose sur trois piliers fondamentaux. Chacun représente un axe
            stratégique pour transformer l'écosystème data au Congo.
          </RevealText>
        </div>

        <StaggerChildren className="pillars-grid" staggerMs={200} baseDelay={400}>
          {pillars.map((pillar, index) => (
            <PillarCard
              key={pillar.number}
              pillar={pillar}
              index={index}
            />
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

interface PillarCardProps {
  pillar: Pillar;
  index: number;
}

function PillarCard({ pillar, index }: PillarCardProps) {
  return (
    <div 
      className="pillar-card"
      role="article"
      aria-labelledby={`pillar-${index}-title`}
    >
      <div className="pillar-number">{pillar.number}</div>
      <h3 className="pillar-title" id={`pillar-${index}-title`}>
        {pillar.title}
      </h3>
      <p className="pillar-description">{pillar.description}</p>
      <div 
        className="pillar-bar"
        style={{ backgroundColor: pillar.color }}
        aria-hidden="true"
      />
    </div>
  );
}
