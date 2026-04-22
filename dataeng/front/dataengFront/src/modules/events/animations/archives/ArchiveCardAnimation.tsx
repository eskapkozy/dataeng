import React from 'react';
import './ArchiveCardAnimation.css';

interface ArchiveCardAnimationProps {
  children: React.ReactNode;
  cardType?: 'main' | 'mini';
}

const ArchiveCardAnimation: React.FC<ArchiveCardAnimationProps> = ({ children, cardType = 'main' }) => {
  return (
    <div className={`archive-card-animation ${cardType}`}>
      {children}
    </div>
  );
};

export default ArchiveCardAnimation;
