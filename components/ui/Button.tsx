import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function Button({ 
  variant = 'primary', 
  className = '', 
  children, 
  style,
  ...props 
}: ButtonProps) {
  const baseStyles = 'px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[#121212] text-white hover:bg-[#2a2a2a] active:scale-[0.98] shadow-lg hover:shadow-xl',
    secondary: 'bg-[#E5E5E5] text-[#121212] hover:bg-[#d0d0d0] active:scale-[0.98]',
    outline: 'border-2 border-[#E5E5E5] text-[#121212] hover:border-[#121212] hover:bg-gray-50 active:scale-[0.98]'
  };

  const defaultStyle = variant === 'primary' 
    ? { backgroundColor: '#121212', color: '#ffffff' }
    : {};

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={{ ...defaultStyle, ...style }}
      {...props}
    >
      {children}
    </button>
  );
}

