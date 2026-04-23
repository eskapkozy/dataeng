import React from 'react';
import './ConnectionLinesAnimation.css';

const ConnectionLinesAnimation: React.FC = () => {
  return (
    <div className="connection-lines-container">
      <div className="connection-lines">
        <div className="connection-line line-1"></div>
        <div className="connection-line line-2"></div>
        <div className="connection-line line-3"></div>
      </div>
    </div>
  );
};

export default ConnectionLinesAnimation;
