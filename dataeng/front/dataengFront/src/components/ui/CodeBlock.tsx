import React from 'react';

interface CodeBlockProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function CodeBlock({ title = "community.js", children, className = "" }: CodeBlockProps) {
  return (
    <div className={`code-block-container ${className}`}>
      <div className="code-block-header">
        <div className="code-block-dots">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <span className="code-block-title">{title}</span>
      </div>
      <div className="code-block-content">
        {children}
      </div>
    </div>
  );
}
