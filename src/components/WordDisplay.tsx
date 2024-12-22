import React from 'react';
import { X } from 'lucide-react';
import type { GeneratedWord } from '../types';

interface WordDisplayProps {
  words: GeneratedWord[];
  onDelete?: (timestamp: number) => void;
}

export function WordDisplay({ words, onDelete }: WordDisplayProps) {
  if (words.length === 0) return null;

  return (
    <div className="py-8 flex flex-wrap justify-center gap-4 items-center">
      {words.map((item, index) => (
        <div 
          key={item.timestamp}
          className="group relative inline-flex items-center animate-fade-in"
        >
          <span className="text-3xl font-normal text-[#484848] tracking-wider">
            {item.word}
          </span>
          
          {onDelete && (
            <button
              onClick={() => onDelete(item.timestamp)}
              className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-2 -right-2 p-1 rounded-full bg-[#CC9999] hover:bg-[#BB8888]"
              aria-label="删除单词"
            >
              <X className="w-3 h-3 text-white" />
            </button>
          )}
          
          {index < words.length - 1 && (
            <span className="mx-4 text-[#9B9B9B] inline-block transform translate-y-[-2px]">→</span>
          )}
        </div>
      ))}
    </div>
  );
}