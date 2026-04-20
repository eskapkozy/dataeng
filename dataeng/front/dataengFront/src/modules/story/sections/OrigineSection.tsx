import { RevealText } from '../revealText';
import { useScrollReveal } from '../../../hooks/useScrollreveal';

/* ---- Chapter 1: L'Origine ---- */
export function OrigineSection() {
  return (
    <section className="story-section story-section--dark" id="origine" aria-labelledby="origine-title">
      <div className="section-inner">
        <RevealText className="chapter-label" delay={0}>
          <span className="mono-tag">// chapitre_01</span>
        </RevealText>

        <RevealText as="h2" className="chapter-title" delay={100}>
          L'Origine
        </RevealText>

        <div className="narrative-block">
          <RevealText className="narrative-pull" delay={200}>
            "Il y avait quelque chose qui manquait."
          </RevealText>

          <RevealText className="narrative-body" delay={350} as="p">
            En 2023, quelques passionnés de data au Congo Brazzaville se posaient la même question,
            séparément. Pourquoi, dans un pays riche en ressources et en cerveaux, les professionnels
            de la data travaillaient-ils en silo ? Pourquoi n'existait-il aucun espace pour se
            rencontrer, apprendre, construire ensemble ?
          </RevealText>

          <RevealText className="narrative-body" delay={450} as="p">
            Ce n'était pas un manque de talent. Le Congo a des ingénieurs, des analystes, des
            scientifiques de la donnée brillants. C'était un manque de <strong>connexion</strong>.
          </RevealText>
        </div>

        <RevealText delay={550} className="origin-visual">
          <OriginVisual />
        </RevealText>
      </div>
    </section>
  );
}

function OriginVisual() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
  
  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>} 
      className="origin-dots"
      role="img"
      aria-label="Représentation visuelle des individus isolés avant la création de Data Eng Congo"
    >
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          className="origin-dot"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'none' : 'scale(0)',
            transition: `opacity 0.5s ease ${i * 30 + 600}ms, transform 0.5s ease ${i * 30 + 600}ms`,
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
