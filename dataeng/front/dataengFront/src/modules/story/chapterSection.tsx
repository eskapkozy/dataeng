import { useEffect, useState } from 'react';
import { RevealText, StaggerChildren } from './revealText';
import { useScrollReveal } from '../../hooks/useScrollreveal';
import { CodeBlock } from '../../components/ui/CodeBlock';

/* ---- Chapter 1: L'Origine ---- */
export function OrigineSection() {
  return (
    <section className="story-section story-section--dark" id="origine">
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
    <div ref={ref as any} className="origin-dots">
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          className="origin-dot"
          style={{
            opacity: isVisible ? (Math.random() > 0.4 ? 0.15 : 0.6) : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0)',
            transition: `opacity 0.6s ease ${i * 50}ms, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${i * 50}ms`,
            background: i % 7 === 0
              ? 'var(--accent-blue)'
              : i % 5 === 0
              ? 'var(--active-green)'
              : i % 11 === 0
              ? 'var(--accent-cyan)'
              : 'var(--text-secondary)',
          }}
        />
      ))}
    </div>
  );
}

/* ---- Chapter 2: Le Constat ---- */
export function ConstatSection() {
  return (
    <section className="story-section" id="constat">
      <div className="section-inner">
        <RevealText className="chapter-label">
          <span className="mono-tag">// chapitre_02</span>
        </RevealText>

        <RevealText as="h2" className="chapter-title" delay={100}>
          Le Constat
        </RevealText>

        <RevealText className="narrative-pull" delay={200}>
          L'écosystème data en Afrique centrale existe. Mais il est fragmenté.
        </RevealText>

        <StaggerChildren className="constat-grid" staggerMs={130} baseDelay={300}>
          {[
            {
              icon: '¡',
              label: 'Isolement',
              text: 'Des professionnels qualifiés qui travaillent seuls, sans réseau local pour partager, progresser, s\'inspirer.',
              color: 'var(--warning-orange)',
            },
            {
              icon: '¡',
              label: 'Visibilité',
              text: 'Des talents invisibles. Peu de plateformes locales pour mettre en valeur les compétences data congolaises.',
              color: 'var(--accent-blue)',
            },
            {
              icon: '¡',
              label: 'Transfert de savoir',
              text: 'Un gap entre la formation académique et les besoins réels du terrain. Peu de mentoring structuré.',
              color: 'var(--active-green)',
            },
            {
              icon: '¡',
              label: 'Opportunités',
              text: 'Des opportunités qui passent par d\'autres réseaux, d\'autres villes, d\'autres continents.',
              color: 'var(--accent-cyan)',
            },
          ].map(item => (
            <div className="constat-card" key={item.label}>
              <span className="constat-icon" style={{ color: item.color }}>{item.icon}</span>
              <h3 className="constat-label">{item.label}</h3>
              <p className="constat-text">{item.text}</p>
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

/* ---- Chapter 3: La Vision ---- */
export function VisionSection() {
  return (
    <section className="story-section story-section--accent" id="vision">
      <div className="section-inner section-inner--centered">
        <RevealText className="chapter-label">
          <span className="mono-tag" style={{ color: 'var(--accent-cyan)' }}>// chapitre_03</span>
        </RevealText>

        <RevealText as="h2" className="chapter-title chapter-title--light" delay={100}>
          La Vision
        </RevealText>

        <RevealText className="vision-statement" delay={250} as="p">
          Bâtir le premier réseau structuré de professionnels data au Congo Brazzaville --
          un espace où les talents se rencontrent, s'entraident, et font avancer ensemble l'écosystème.
        </RevealText>

        <RevealText delay={350} className="vision-code-block">
          <VisionCode />
        </RevealText>

        <RevealText delay={650} className="vision-metrics">
          <div className="metric-item">
            <span className="metric-value">2023</span>
            <span className="metric-label">Année de création</span>
          </div>
          <div className="metric-item">
            <span className="metric-value">3</span>
            <span className="metric-label">Piliers stratégiques</span>
          </div>
          <div className="metric-item">
            <span className="metric-value">{'\u221e'}</span>
            <span className="metric-label">Potentiel de croissance</span>
          </div>
        </RevealText>
      </div>
    </section>
  );
}

function VisionCode() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.3 });

  return (
    <div ref={ref as any} style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease 400ms' }}>
      <CodeBlock title="community.js">
        <div className="vision-code-content">
          <div className="code-section">
            <div className="code-comment">// Community Configuration</div>
            <div className="code-line">
              <span className="code-keyword">const</span> community = <span className="code-brace">{'{'}</span>
            </div>
            <div className="code-line">
              <span className="code-property">name</span><span className="code-punctuation">:</span>{' '}
              <span className="code-string">"Data Eng Congo"</span><span className="code-punctuation">,</span>
            </div>
            <div className="code-line">
              <span className="code-property">location</span><span className="code-punctuation">:</span>{' '}
              <span className="code-string">"Brazzaville, Congo"</span><span className="code-punctuation">,</span>
            </div>
            <div className="code-line">
              <span className="code-property">mission</span><span className="code-punctuation">:</span>{' '}
              <span className="code-string">"Connecter. Construire. Grandir."</span><span className="code-punctuation">,</span>
            </div>
            <div className="code-line">
              <span className="code-property">members</span><span className="code-punctuation">:</span>{' '}
              <span className="code-type">Array&lt;Talent&gt;</span><span className="code-punctuation">,</span>
            </div>
            <div className="code-line">
              <span className="code-property">open</span><span className="code-punctuation">:</span>{' '}
              <span className="code-boolean">true</span><span className="code-punctuation">,</span>
            </div>
            <div className="code-line"><span className="code-brace">{'}'}</span><span className="code-punctuation">;</span></div>
          </div>

          <div className="code-section">
            <div className="code-comment">// Key Features</div>
            <div className="code-line">
              <span className="code-keyword">const</span> features = <span className="code-brace">{'{'}</span>
            </div>
            <div className="code-line">
              <span className="code-property">networking</span><span className="code-punctuation">:</span>{' '}
              <span className="code-string">"Professional connections"</span><span className="code-punctuation">,</span>
            </div>
            <div className="code-line">
              <span className="code-property">knowledge</span><span className="code-punctuation">:</span>{' '}
              <span className="code-string">"Skill sharing & mentoring"</span><span className="code-punctuation">,</span>
            </div>
            <div className="code-line">
              <span className="code-property">innovation</span><span className="code-punctuation">:</span>{' '}
              <span className="code-string">"Local data projects"</span><span className="code-punctuation">,</span>
            </div>
            <div className="code-line"><span className="code-brace">{'}'}</span><span className="code-punctuation">;</span></div>
          </div>

          <div className="code-section">
            <div className="code-comment">// Documentation</div>
            <div className="code-line">
              <span className="code-keyword">export default</span> community;
            </div>
          </div>
        </div>
      </CodeBlock>
    </div>
  );
}

/* ---- Chapter 4: Les Piliers ---- */
export function PiliersSection() {
  const pillars = [
    {
      num: '01',
      title: 'Connecter',
      description:
        'Créer des ponts entre les talents data à Brazzaville et au-delà. Meetups, slack, événements, mentoring -- des espaces de rencontre réels et virtuels.',
      color: 'var(--accent-blue)',
    },
    {
      num: '02',
      title: 'Construire',
      description:
        'Encourager la création de projets data à impact local. Datasets ouverts, outils, analyses sectorielles. Transformer les idées en réalisations concrètes.',
      color: 'var(--active-green)',
    },
    {
      num: '03',
      title: 'Élever',
      description:
        'Partager les connaissances, organiser des formations, publier des ressources. Faire monter en compétences chaque membre de la communauté.',
      color: 'var(--accent-cyan)',
    },
  ];

  return (
    <section className="story-section" id="piliers">
      <div className="section-inner">
        <RevealText className="chapter-label">
          <span className="mono-tag">// chapitre_04</span>
        </RevealText>

        <RevealText as="h2" className="chapter-title" delay={100}>
          Les Trois Piliers
        </RevealText>

        <div className="pillars-grid">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.num} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarCard({
  pillar,
  index,
}: {
  pillar: { num: string; title: string; description: string; color: string };
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <div
      ref={ref as any}
      className="pillar-card"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : 'translateY(40px)',
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 150}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 150}ms`,
        '--pillar-color': pillar.color,
      } as React.CSSProperties}
    >
      <div className="pillar-number" style={{ color: pillar.color }}>
        {pillar.num}
      </div>
      <h3 className="pillar-title">{pillar.title}</h3>
      <p className="pillar-description">{pillar.description}</p>
      <div className="pillar-bar" style={{ background: pillar.color }} />
    </div>
  );
}

/* ---- Chapter 5: Les Chiffres ---- */
export function ChiffresSection() {
  return (
    <section className="story-section story-section--dark" id="chiffres">
      <div className="section-inner">
        <RevealText className="chapter-label">
          <span className="mono-tag">// chapitre_05</span>
        </RevealText>

        <RevealText as="h2" className="chapter-title" delay={100}>
          Aujourd'hui
        </RevealText>

        <StaggerChildren className="chiffres-grid" staggerMs={150} baseDelay={200}>
          {[
            { value: 120, suffix: '+', label: 'Membres actifs', color: 'var(--accent-blue)' },
            { value: 8, suffix: '', label: 'Meetups organisés', color: 'var(--active-green)' },
            { value: 15, suffix: '+', label: 'Talks & présentations', color: 'var(--accent-cyan)' },
            { value: 4, suffix: '', label: 'Projets collaboratifs', color: 'var(--warning-orange)' },
          ].map(stat => (
            <AnimatedStat key={stat.label} {...stat} />
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

function AnimatedStat({
  value,
  suffix,
  label,
  color,
}: {
  value: number;
  suffix: string;
  label: string;
  color: string;
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.3 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 1400;
    const step = 16;
    const increment = value / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div ref={ref as any} className="chiffre-item">
      <span className="chiffre-value" style={{ color }}>
        {count}{suffix}
      </span>
      <span className="chiffre-label">{label}</span>
    </div>
  );
}
