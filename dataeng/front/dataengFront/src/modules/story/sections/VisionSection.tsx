import { RevealText } from '../revealText';
import { CodeBlock } from '../../../components/ui/CodeBlock';
import { useScrollReveal } from '../../../hooks/useScrollreveal';

/* ---- Chapter 3: La Vision ---- */
export function VisionSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
  
  return (
    <section className="story-section story-section--dark" id="vision" aria-labelledby="vision-title">
      <div className="section-inner">
        <RevealText className="chapter-label">
          <span className="mono-tag">// chapitre_03</span>
        </RevealText>

        <RevealText as="h2" className="chapter-title" delay={100}>
          La Vision
        </RevealText>

        <RevealText className="vision-statement" delay={250} as="p">
          Créer un écosystème data unifié où chaque talent peut s'épanouir,
          collaborer et contribuer à transformer le Congo Brazzaville en pôle
          d'excellence technologique.
        </RevealText>

        <div 
          ref={ref as React.RefObject<HTMLDivElement>} 
          className="vision-code-block"
          role="img"
          aria-label="Code représentant la mission Data Eng Congo"
        >
          <CodeBlock title="dataEngCongo.ts">
            <pre style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease 400ms' }}>
              <code>{`const dataEngCongo = {
  mission: "Connecter. Construire. Élever.",
  pillars: [
    "Connecter les talents",
    "Construire ensemble", 
    "Élever l'écosystème"
  ],
  location: "Brazzaville, Congo",
  founded: 2023,
  community: "120+ membres",
  status: "actif"
};`}</code>
            </pre>
          </CodeBlock>
        </div>
      </div>
    </section>
  );
}
