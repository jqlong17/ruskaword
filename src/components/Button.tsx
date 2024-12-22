import React from 'react';
import { RotateCcw } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  icon?: boolean;
}

export function Button({ 
  variant = 'primary', 
  loading, 
  icon,
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = "px-6 py-3 rounded-lg font-normal text-base transition-colors tracking-wide min-w-[120px]";
  const variants = {
    primary: "bg-[#9B9B9B] text-white hover:bg-[#888888] disabled:bg-[#DADADA]",
    secondary: "border border-[#9B9B9B] text-[#9B9B9B] hover:bg-[#F8F8F6] disabled:border-[#DADADA] disabled:text-[#DADADA]"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${icon ? 'flex items-center gap-2' : ''} ${className}`}
      {...props}
    >
      {icon && <RotateCcw className="w-4 h-4" />}
      {loading ? '生成中...' : children}
    </button>
  );
}