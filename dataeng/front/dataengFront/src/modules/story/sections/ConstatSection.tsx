import { RevealText, StaggerChildren } from '../revealText';

interface ConstatItem {
  icon: string;
  label: string;
  text: string;
}

/* ---- Chapter 2: Le Constat ---- */
export function ConstatSection() {
  const constats: ConstatItem[] = [
    {
      icon: 'fragmentation',
      label: 'Fragmentation',
      text: 'Les professionnels de la data travaillent en silos, sans connexion entre eux.'
    },
    {
      icon: 'isolement',
      label: 'Isolement',
      text: 'Manque de lieux physiques et virtuels pour échanger et collaborer.'
    },
    {
      icon: 'perte',
      label: 'Perte de potentiel',
      text: 'Talents exceptionnels sous-exploités faute de réseau structuré.'
    },
    {
      icon: 'absence',
      label: 'Absence de visibilité',
      text: 'Projets innovants méconnus faute de plateforme de partage.'
    }
  ];

  return (
    <section className="story-section" id="constat" aria-labelledby="constat-title">
      <div className="section-inner">
        <RevealText className="chapter-label">
          <span className="mono-tag">// chapitre_02</span>
        </RevealText>

        <RevealText as="h2" className="chapter-title" delay={100}>
          Le Constat
        </RevealText>

        <div className="narrative-block">
          <RevealText className="narrative-body" delay={200} as="p">
            L'écosystème data congolais souffre d'un paradoxe : une richesse de talents
            coexiste avec une pauvreté de connexions. Les ingénieurs, analystes et scientifiques
            travaillent isolément, ignorant souvent l'existence de leurs pairs.
          </RevealText>

          <RevealText className="narrative-body" delay={350} as="p">
            Cette fragmentation génère des <strong>coûts cachés</strong> : duplication d'efforts,
            perte d'opportunités, et surtout, un frein collectif à l'innovation.
          </RevealText>
        </div>

        <StaggerChildren className="constat-grid" staggerMs={150} baseDelay={500}>
          {constats.map((constat, index) => (
            <ConstatCard
              key={constat.label}
              constat={constat}
              index={index}
            />
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

interface ConstatCardProps {
  constat: ConstatItem;
  index: number;
}

function ConstatCard({ constat, index }: ConstatCardProps) {
  return (
    <div 
      className="constat-card"
      role="article"
      aria-labelledby={`constat-${index}-label`}
    >
      <div className="constat-icon" aria-hidden="true">
        {constat.icon === 'fragmentation' && ' fragmented '}
        {constat.icon === 'isolement' && ' isolated '}
        {constat.icon === 'perte' && ' loss '}
        {constat.icon === 'absence' && ' invisible '}
      </div>
      <h3 className="constat-label" id={`constat-${index}-label`}>
        {constat.label}
      </h3>
      <p className="constat-text">{constat.text}</p>
    </div>
  );
}
