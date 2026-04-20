import { RevealText, StaggerChildren } from '../revealText';

interface Profile {
  role: string;
  years: string;
  tag: string;
}

/* ---- Chapter 6: L'Écosystème / La Communauté ---- */
export function CommunauteSection() {
  const profiles: Profile[] = [
    { role: 'Data Engineer', years: '3 ans exp.', tag: 'Pipeline & ETL' },
    { role: 'ML Engineer', years: '2 ans exp.', tag: 'Modélisation' },
    { role: 'Data Analyst', years: '4 ans exp.', tag: 'Insights & BI' },
    { role: 'Data Scientist', years: '5 ans exp.', tag: 'Stats & ML' },
    { role: 'Analytics Eng.', years: '2 ans exp.', tag: 'dbt & SQL' },
    { role: 'Data Architect', years: '7 ans exp.', tag: 'Infrastructure' },
  ];

  return (
    <section className="story-section" id="communaute" aria-labelledby="communaute-title">
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
          {profiles.map((profile, index) => (
            <ProfileCard 
              key={profile.role} 
              role={profile.role} 
              years={profile.years} 
              tag={profile.tag}
              index={index}
            />
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

interface ProfileCardProps {
  role: string;
  years: string;
  tag: string;
  index: number;
}

function ProfileCard({ role, years, tag, index }: ProfileCardProps) {
  return (
    <div 
      className="profile-card"
      role="article"
      aria-labelledby={`profile-${index}-role`}
    >
      <div className="profile-avatar">
        <div className="avatar-placeholder" aria-hidden="true">?</div>
      </div>
      <div className="profile-info">
        <h4 className="profile-role" id={`profile-${index}-role`}>{role}</h4>
        <p className="profile-years">{years}</p>
        <span className="profile-tag">{tag}</span>
      </div>
    </div>
  );
}
