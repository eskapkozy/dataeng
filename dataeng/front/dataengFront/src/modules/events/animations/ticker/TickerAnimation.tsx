import React from 'react';
import './TickerAnimation.css';

interface TickerAnimationProps {
  words: string[];
  accentWords?: string[];
}

const TickerAnimation: React.FC<TickerAnimationProps> = ({ words, accentWords = [] }) => {
  return (
    <div className="ticker-animation">
      <div className="ticker-content">
        {words.map((word, i) => (
          <span 
            key={i} 
            className={`ticker-word ${accentWords.includes(word) ? 'accent' : ''}`}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TickerAnimation;
