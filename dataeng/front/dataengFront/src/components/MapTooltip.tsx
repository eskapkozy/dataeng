import { createPortal } from 'react-dom';
import { useRef, useEffect, useState } from 'react';
import { useTooltip } from '../context/TooltipContext';
import '../modules/events/styles/city-vibration.css'; // Importer les variables globales

const departmentData: Record<string, DeptInfo> = {
  brazzaville: {
    name: 'Brazzaville',
    status: 'actif',
    membres: 142,
    events: 6,
    articles: 18,
    meetup_prochain: '15 juin 2025',
    coordinateur: 'Junior M.',
    tags: ['data-engineering', 'ml', 'python'],
  },
  pointe_noire: {
    name: 'Pointe-Noire',
    status: 'actif',
    membres: 47,
    events: 2,
    articles: 8,
    meetup_prochain: '30 août 2025',
    coordinateur: 'Ornella T.',
    tags: ['analytics', 'visualisation'],
  },
  cuvette: {
    name: 'Cuvette',
    status: 'prévu',
    membres: 12,
    events: 0,
    articles: 3,
    meetup_prochain: 'Q4 2025',
    coordinateur: null,
    tags: ['data-science'],
  },
  oyo: {
    name: 'Oyo',
    status: 'actif',
    membres: 25,
    events: 2,
    articles: 5,
    meetup_prochain: '20 juillet 2025',
    coordinateur: 'Luc P.',
    tags: ['data-engineering', 'python'],
  },
  kinshasa: {
    name: 'Kinshasa',
    status: 'actif',
    membres: 89,
    events: 4,
    articles: 12,
    meetup_prochain: '10 septembre 2025',
    coordinateur: 'Gilles K.',
    tags: ['ml', 'big-data', 'analytics'],
  }
};

type DeptInfo = {
  name: string;
  status: 'actif' | 'prévu' | 'inactif';
  membres: number;
  events: number;
  articles: number;
  meetup_prochain: string | null;
  coordinateur: string | null;
  tags: string[];
};

export function MapTooltip() {
  const { state, dispatch } = useTooltip();
  const dept = departmentData[state.deptKey];
  const tooltipRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  // Calcul position intelligente - ne jamais sortir de l'écran
  useEffect(() => {
    if (!state.visible || !tooltipRef.current) return;
    
    const tw = tooltipRef.current.offsetWidth;
    const th = tooltipRef.current.offsetHeight;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const offset = 20;

    let finalX = state.x + offset;
    let finalY = state.y - 60;

    if (finalX + tw > vw - 16) finalX = state.x - tw - offset;
    if (finalY + th > vh - 16) finalY = vh - th - 16;
    if (finalY < 8) finalY = 8;

    setPos({ x: finalX, y: finalY });
  }, [state.x, state.y, state.visible]);

  // Gestion du hover sur le tooltip lui-même
  const handleTooltipMouseEnter = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
  };

  const handleTooltipMouseLeave = () => {
    hideTimerRef.current = setTimeout(() => {
      dispatch({ type: 'HIDE' });
    }, 100);
  };

  // TOUJOURS rendu - jamais de return null
  // createPortal sort le tooltip de la hiérarchie DOM complètement
  return createPortal(
    <div
      ref={tooltipRef}
      onMouseEnter={handleTooltipMouseEnter}
      onMouseLeave={handleTooltipMouseLeave}
      style={{
        position: 'fixed',
        top: pos.y,
        left: pos.x,
        // PAS de transform ici - on utilise top/left directement
        // pour éviter tout conflit avec les parents
        zIndex: 'var(--map-tooltip-z-index, 2147483647)', // Variable globale avec fallback
        pointerEvents: state.visible ? 'auto' : 'none', // auto quand visible
        opacity: state.visible && dept ? 'var(--global-opacity-visible, 1)' : 'var(--global-opacity-hidden, 0)',
        transition: 'var(--global-transition-quick, opacity 0.25s ease-out)', // Variable globale
        willChange: 'opacity', // PAS transform ici - évite le bug parent
        minWidth: '280px',
        maxWidth: '320px',
        maxHeight: '400px',
        overflowY: 'auto', // scrollable si contenu long
      }}
    >
      {dept && (
        <div style={{
          background: '#141414',
          border: '1px solid #2a2a2a',
          borderRadius: '10px',
          overflow: 'hidden',
          fontFamily: "'DM Mono', 'Fira Code', monospace",
          fontSize: '12px',
          lineHeight: '1.6',
          boxShadow: '0 8px 32px rgba(0,0,0,0.7)',
        }}>
          {/* Barre titre macOS */}
          <div style={{
            background: '#252525',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            borderBottom: '1px solid #2a2a2a',
          }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
            <span style={{ color: '#444', fontSize: 10, marginLeft: 6, letterSpacing: '0.06em' }}>
              data_community ~ {state.deptKey}.json
            </span>
          </div>

          {/* Corps JSON */}
          <div style={{ padding: '12px 14px', background: '#141414' }}>
            <CodeLine n={1}><Brace>{'{'}</Brace></CodeLine>
            <CodeLine n={2}><Key>"departement"</Key><Brace>: </Brace><Str>"{dept.name}"</Str><Brace>,</Brace></CodeLine>
            <CodeLine n={3}><Key>"statut"</Key><Brace>: </Brace><Status s={dept.status} /></CodeLine>
            <CodeLine n={4}><Key>"membres"</Key><Brace>: </Brace><Num>{dept.membres}</Num><Brace>,</Brace></CodeLine>
            <CodeLine n={5}><Key>"evenements"</Key><Brace>: </Brace><Num>{dept.events}</Num><Brace>,</Brace></CodeLine>
            <CodeLine n={6}><Key>"articles"</Key><Brace>: </Brace><Num>{dept.articles}</Num><Brace>,</Brace></CodeLine>
            <CodeLine n={7}><Key>"prochain_meetup"</Key><Brace>: </Brace>
              {dept.meetup_prochain ? <Str>"{dept.meetup_prochain}"</Str> : <Null>null</Null>}
              <Brace>,</Brace>
            </CodeLine>
            <CodeLine n={8}><Key>"coordinateur"</Key><Brace>: </Brace>
              {dept.coordinateur ? <Str>"{dept.coordinateur}"</Str> : <Null>null</Null>}
              <Brace>,</Brace>
            </CodeLine>
            <CodeLine n={9}><Key>"tags"</Key><Brace>: </Brace>
              <Brace>[</Brace>
              {dept.tags.map((t, i) => (
                <span key={t}><Str>"{t}"</Str>{i < dept.tags.length - 1 && <Brace>, </Brace>}</span>
              ))}
              <Brace>]</Brace>
            </CodeLine>
            <CodeLine n={10}><Brace>{'}'}</Brace><Cursor /></CodeLine>
          </div>
        </div>
      )}
    </div>,
    document.body // rendu directement dans body - aucun parent React
  );
}

// Micro-composants syntaxe
const CodeLine = ({ n, children }: { n: number; children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 12, minHeight: 18 }}>
    <span style={{ color: '#2a2a2a', fontSize: 10, minWidth: 14, textAlign: 'right', userSelect: 'none' }}>{n}</span>
    <span>{children}</span>
  </div>
);

const Brace  = ({ children }: { children: React.ReactNode }) => <span style={{ color: '#666' }}>{children}</span>;
const Key    = ({ children }: { children: React.ReactNode }) => <span style={{ color: '#9ECBFF' }}>{children}</span>;
const Str    = ({ children }: { children: React.ReactNode }) => <span style={{ color: '#9EE09E' }}>{children}</span>;
const Num    = ({ children }: { children: React.ReactNode }) => <span style={{ color: '#F78C6C' }}>{children}</span>;
const Null   = ({ children }: { children: React.ReactNode }) => <span style={{ color: '#F07178' }}>{children}</span>;

const Status = ({ s }: { s: string }) => {
  const color = s === 'actif' ? '#3ecf8e' : s === 'prévu' ? '#F5A623' : '#555';
  return <><span style={{ color }}>"{s}"</span><span style={{ color: '#666' }}>,</span></>;
};

const Cursor = () => (
  <span style={{
    display: 'inline-block', width: 7, height: 13,
    background: '#4F6EF7', verticalAlign: 'middle', marginLeft: 2,
    animation: 'tooltipBlink 1s step-end infinite',
  }} />
);
