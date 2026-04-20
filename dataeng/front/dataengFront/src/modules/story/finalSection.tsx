import { RevealText, StaggerChildren } from './revealText';
import { useScrollReveal } from '../../hooks/useScrollreveal';

/* ---- Chapter 6: L'Écosystème / La Communauté ---- */
export function CommunauteSection() {
  const profiles = [
    { role: 'Data Engineer', years: '3 ans exp.', tag: 'Pipeline & ETL' },
    { role: 'ML Engineer', years: '2 ans exp.', tag: 'Modélisation' },
    { role: 'Data Analyst', years: '4 ans exp.', tag: 'Insights & BI' },
    { role: 'Data Scientist', years: '5 ans exp.', tag: 'Stats & ML' },
    { role: 'Analytics Eng.', years: '2 ans exp.', tag: 'dbt & SQL' },
    { role: 'Data Architect', years: '7 ans exp.', tag: 'Infrastructure' },
  ];

  return (
    <section className="story-section" id="communaute">
      <div className="section-inner">
        <RevealText className="chapter-label">
          <span className="mono-tag">// chapitre_06</span>
        </RevealText>

        <RevealText as="h2" className="chapter-title" delay={100}>
          Les Visages de la Communauté
        </RevealText>

        <RevealText className="narrative-body" delay={200} as="p">
          Chaque membre apporte une expertise unique. Ensemble, nous couvrons toute la chaîne de la donnée --
          de la collecte à la visualisation, de l'ingénierie au machine learning.
        </RevealText>

        <StaggerChildren className="profiles-grid" staggerMs={100} baseDelay={300}>
          {profiles.map(p => (
            <ProfileCard key={p.role} role={p.role} years={p.years} tag={p.tag} />
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

function ProfileCard({ role, years, tag }: { role: string; years: string; tag: string }) {
  return (
    <div className="profile-card">
      <div className="profile-avatar">
        <div className="avatar-placeholder">?</div>
      </div>
      <div className="profile-info">
        <h4 className="profile-role">{role}</h4>
        <p className="profile-years">{years}</p>
        <span className="profile-tag">{tag}</span>
      </div>
    </div>
  );
}

/* ---- Chapter 7: La Feuille de Route / Futur ---- */
export function FuturSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
  
  const milestones = [
    { year: 'Q2 2025', label: 'Première conférence Data Eng Congo', done: false },
    { year: 'Q3 2025', label: 'Lancement programme mentoring', done: false },
    { year: 'Q4 2025', label: 'Partenariat universités locales', done: false },
    { year: 'Q1 2026', label: 'Expansion à Kinshasa', done: false },
    { year: 'Q2 2026', label: 'Premier hackathon data national', done: false },
  ];

  return (
    <section className="story-section story-section--dark" id="futur">
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

        <div ref={ref as any} className="timeline">
          {milestones.map((m, i) => (
            <div
              key={i}
              className={`timeline-item ${m.done ? 'timeline-item--done' : ''}`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'none' : 'translateX(-20px)',
                transition: `opacity 0.6s ease ${i * 100 + 300}ms, transform 0.6s ease ${i * 100 + 300}ms`,
              }}
            >
              <div className="timeline-dot" />
              <div className="timeline-content">
                <span className="timeline-year">{m.year}</span>
                <span className="timeline-label">{m.label}</span>
                {m.done && <span className="timeline-badge">Accompli</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Final CTA Section ---- */
export function CtaSection() {
  return (
    <section className="story-section story-section--accent">
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
          <div className="cta-buttons">
            <button className="cta-button cta-button--primary">
              Rejoindre la communauté
            </button>
            <button className="cta-button cta-button--secondary">
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
