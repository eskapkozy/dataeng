import React from 'react';
import './CardHoverAnimation.css';

interface CardHoverAnimationProps {
  children: React.ReactNode;
  eventType?: 'meetup' | 'workshop' | 'hackathon' | 'online';
}

const CardHoverAnimation: React.FC<CardHoverAnimationProps> = ({ children, eventType = 'meetup' }) => {
  return (
    <div className={`card-hover-animation ${eventType}`}>
      {children}
    </div>
  );
};

export default CardHoverAnimation;
