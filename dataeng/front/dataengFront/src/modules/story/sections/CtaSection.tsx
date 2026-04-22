import { RevealText } from '../revealText';

/* ---- Final CTA Section ---- */
export function CtaSection() {
  return (
    <section className="story-section story-section--accent" aria-labelledby="cta-title">
      <div className="section-inner section-inner--centered">
        <RevealText className="chapter-label">
          <span className="mono-tag" style={{ color: 'var(--accent-cyan)' }}>// rejoindre</span>
        </RevealText>

        <RevealText as="h2" className="chapter-title chapter-title--light" delay={100}>
          Rejoignez l'Aventure
        </RevealText>

        <RevealText className="cta-statement" delay={250} as="p">
          Que vous soyez data scientist, analyste, ingénieur ou simplement passionné par la donnée,
          il y a une place pour vous dans notre communauté.
        </RevealText>

        <RevealText delay={400}>
          <div className="cta-buttons" role="group" aria-label="Actions pour rejoindre la communauté">
            <button 
              className="cta-button cta-button--primary"
              onClick={() => {
                // TODO: Implémenter la logique d'adhésion
                console.log('Rejoindre la communauté');
              }}
              aria-label="Rejoindre la communauté Data Eng Congo"
            >
              Rejoindre la communauté
            </button>
            <button 
              className="open-btn"
              onClick={() => {
                // TODO: Implémenter la logique de contact
                console.log('Nous contacter');
              }}
              aria-label="Contacter l'équipe Data Eng Congo"
            >
              Nous contacter
            </button>
          </div>
        </RevealText>

        <RevealText delay={600}>
          <div className="cta-footer">
            <p className="cta-subtitle">
              Data Eng Congo -- Connecter. Construire. Grandir.
            </p>
          </div>
        </RevealText>
      </div>
    </section>
  );
}
