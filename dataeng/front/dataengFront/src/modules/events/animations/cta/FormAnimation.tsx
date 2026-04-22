import React from 'react';
import './FormAnimation.css';

interface FormAnimationProps {
  children: React.ReactNode;
}

const FormAnimation: React.FC<FormAnimationProps> = ({ children }) => {
  return (
    <div className="form-animation">
      {children}
    </div>
  );
};

export default FormAnimation;
