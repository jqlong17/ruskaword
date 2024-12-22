import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, className = '' }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className={`bg-white rounded-xl shadow-lg max-w-md w-full animate-slide-up ${className}`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EFEFEF]">
          <h2 className="text-xl text-[#484848] tracking-wide">{title}</h2>
          <button
            onClick={onClose}
            className="text-[#9B9B9B] hover:text-[#484848] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}