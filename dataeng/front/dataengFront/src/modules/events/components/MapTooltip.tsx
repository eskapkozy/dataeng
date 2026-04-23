import React from 'react'
import './styles/city-vibration.css'

// Interface générique pour réutilisable dans d'autres contextes
interface MapTooltipProps {
  title?: string
  content: string
  position: { x: number; y: number }
  isVisible: boolean
  theme?: 'default' | 'minimal' | 'detailed'
  customClass?: string
  showIndicator?: boolean
  showBars?: boolean
  showHint?: boolean
}

// Props par défaut pour une utilisation flexible
const MapTooltip: React.FC<MapTooltipProps> = ({ 
  title,
  content,
  position, 
  isVisible,
  theme = 'default',
  customClass = '',
  showIndicator = true,
  showBars = true,
  showHint = true
}) => {
  // Classes CSS dynamiques selon le thème et la visibilité
  const tooltipClasses = [
    'map-tooltip',
    'events-tooltip',
    `map-tooltip--${theme}`,
    isVisible ? 'visible' : '',
    customClass
  ].filter(Boolean).join(' ')

  // Utilisation des variables CSS globales pour cohérence
  return (
    <div 
      className={tooltipClasses}
      style={{
        /* Variables globales de positionnement */
        position: 'fixed',
        left: `${position.x + 15}px`,
        top: `${position.y - 50}px`,
        zIndex: 999999,
        pointerEvents: 'auto',
        
        /* Variables globales d'apparence */
        background: 'var(--bg-surface)',
        border: '1px solid var(--accent-blue)',
        borderRadius: '8px',
        padding: '12px 16px',
        fontSize: '13px',
        fontFamily: 'Martian Mono, monospace',
        color: 'var(--text-primary)',
        boxShadow: '0 6px 20px rgba(79, 110, 247, 0.6), 0 0 0 1px rgba(79, 110, 247, 0.2)',
        whiteSpace: 'nowrap',
        minWidth: '200px',
        maxWidth: '300px',
        
        /* Variables globales d'animation */
        opacity: isVisible ? 1 : 0,
        transform: isVisible 
          ? 'translateY(0) scale(1)' 
          : 'translateY(15px) scale(0.85)',
        transition: 'opacity 0.25s ease-out, transform 0.25s ease-out, left 0.1s linear, top 0.1s linear',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)'
      }}
    >
      {/* Header optionnel avec titre */}
      {title && (
        <div className="tooltip-header">
          <div style={{ 
            fontWeight: 'var(--map-tooltip-title-weight, 600)', 
            color: 'var(--map-tooltip-title-color, var(--accent-blue))'
          }}>
            {title}
          </div>
          {showIndicator && (
            <div className="tooltip-indicator">
              consulter
            </div>
          )}
        </div>
      )}
      
      {/* Contenu principal */}
      <div style={{ 
        fontSize: 'var(--map-tooltip-info-font-size, 11px)',
        color: 'var(--map-tooltip-info-color, var(--text-secondary))',
        margin: 'var(--map-tooltip-content-margin, 8px 0)'
      }}>
        {content}
      </div>
      
      {/* Footer optionnel avec barres animées et hint */}
      {(showBars || showHint) && (
        <div className="tooltip-footer">
          {showBars && (
            <div className="tooltip-bars">
              <div className="tooltip-bar"></div>
              <div className="tooltip-bar"></div>
              <div className="tooltip-bar"></div>
            </div>
          )}
          {showHint && (
            <div className="tooltip-hint">
              Survoler pour consulter
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default MapTooltip
