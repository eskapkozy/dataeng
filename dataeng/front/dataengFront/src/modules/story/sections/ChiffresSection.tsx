import { RevealText, StaggerChildren } from '../revealText';

interface ChiffreItem {
  value: string;
  label: string;
  suffix?: string;
}

/* ---- Chapter 5: Les Chiffres ---- */
export function ChiffresSection() {
  const chiffres: ChiffreItem[] = [
    { value: '120+', label: 'Membres actifs' },
    { value: '8', label: 'Meetups organisés' },
    { value: '15+', label: 'Projets collaboratifs' },
    { value: '3', label: 'Piliers stratégiques' },
    { value: '2023', label: 'Année de fondation' },
    { value: '100%', label: 'Bénévole' }
  ];

  return (
    <section className="story-section story-section--dark" id="chiffres" aria-labelledby="chiffres-title">
      <div className="section-inner">
        <RevealText className="chapter-label">
          <span className="mono-tag">// chapitre_05</span>
        </RevealText>

        <RevealText as="h2" className="chapter-title" delay={100}>
          Les Chiffres
        </RevealText>

        <div className="narrative-block">
          <RevealText className="narrative-body" delay={200} as="p">
            En moins d'un an, Data Eng Congo est devenu un acteur incontournable
            de l'écosystème technologique congolais. Nos chiffres témoignent d'une
            croissance remarquable et d'un engagement collectif.
          </RevealText>
        </div>

        <StaggerChildren className="chiffres-grid" staggerMs={120} baseDelay={400}>
          {chiffres.map((chiffre, index) => (
            <ChiffreItem
              key={`${chiffre.value}-${index}`}
              chiffre={chiffre}
              index={index}
            />
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

interface ChiffreItemProps {
  chiffre: ChiffreItem;
  index: number;
}

function ChiffreItem({ chiffre, index }: ChiffreItemProps) {
  return (
    <div 
      className="chiffre-item"
      role="article"
      aria-labelledby={`chiffre-${index}-label`}
    >
      <div className="chiffre-value" aria-label={`Valeur: ${chiffre.value}`}>
        {chiffre.value}
      </div>
      <div className="chiffre-label" id={`chiffre-${index}-label`}>
        {chiffre.label}
      </div>
    </div>
  );
}
