import React from 'react';
import './ConnectionLinesAnimation.css';

interface ConnectionLinesAnimationProps {
  isActive: boolean;
}

const ConnectionLinesAnimation: React.FC<ConnectionLinesAnimationProps> = ({ isActive }) => {
  return (
    <div className="connection-lines-container">
      <div className={`connection-lines ${isActive ? 'spinning' : ''}`}>
        <div className="connection-line line-1"></div>
        <div className="connection-line line-2"></div>
        <div className="connection-line line-3"></div>
      </div>
    </div>
  );
};

export default ConnectionLinesAnimation;
