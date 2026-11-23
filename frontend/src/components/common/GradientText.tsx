import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'blue-cyan' | 'purple-pink' | 'orange-red' | 'blue-purple';
}

export const GradientText: React.FC<GradientTextProps> = ({ 
  children, 
  className = '', 
  variant = 'blue-cyan' 
}) => {
  const gradients = {
    'blue-cyan': 'from-blue-400 via-cyan-300 to-indigo-400',
    'purple-pink': 'from-purple-400 via-pink-400 to-rose-400',
    'orange-red': 'from-amber-400 via-orange-400 to-red-500',
    'blue-purple': 'from-blue-500 via-purple-400 to-cyan-300',
  };

  return (
    <span className={`bg-gradient-to-r ${gradients[variant]} bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
};
