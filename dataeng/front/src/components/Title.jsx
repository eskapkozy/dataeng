import React from 'react';

export function Title({ children, level = 1, className = '', ...props }) {
  const Tag = `h${level}`;
  
  const sizes = {
    1: 'text-4xl font-bold',
    2: 'text-3xl font-bold',
    3: 'text-2xl font-semibold',
    4: 'text-xl font-semibold',
    5: 'text-lg font-medium',
    6: 'text-base font-medium',
  };

  return (
    <Tag
      className={`${sizes[level]} text-gray-900 ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
