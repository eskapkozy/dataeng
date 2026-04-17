import React from 'react';

export function Section({ children, className = '', ...props }) {
  return (
    <section
      className={`py-12 ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
