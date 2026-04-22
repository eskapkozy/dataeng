import React from 'react';
import './TabSwitchAnimation.css';

interface TabSwitchAnimationProps {
  activeTab: 'upcoming' | 'past';
  children: React.ReactNode;
}

const TabSwitchAnimation: React.FC<TabSwitchAnimationProps> = ({ activeTab, children }) => {
  return (
    <div className={`tab-switch-animation ${activeTab}`}>
      {children}
    </div>
  );
};

export default TabSwitchAnimation;
