import React, { useState } from 'react';
import { Button } from './Button';
import { WordDisplay } from './WordDisplay';
import type { GeneratedWord } from '../types';

interface WordSectionProps {
  loading: boolean;
  words: GeneratedWord[];
  onGenerate: (topic: string) => void;
  onReset: () => void;
  onDeleteWord: (timestamp: number) => void;
}

export function WordSection({ loading, words, onGenerate, onReset, onDeleteWord }: WordSectionProps) {
  const [topic, setTopic] = useState('');

  return (
    <div className="space-y-6">
      <div className="max-w-md mx-auto">
        <label htmlFor="topic" className="block text-sm text-[#484848] mb-2 text-left">
          请输入你感兴趣的主题
        </label>
        <input
          type="text"
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-[#EFEFEF] focus:outline-none focus:ring-2 focus:ring-[#9B9B9B] text-[#484848] placeholder-[#9B9B9B] mb-4"
          placeholder="例如：旅行、美食、科技..."
        />
      </div>

      <div className="flex justify-center gap-3">
        <Button
          variant="secondary"
          onClick={onReset}
          disabled={loading || !words.length}
          icon
        >
          重置
        </Button>

        <Button 
          onClick={() => onGenerate(topic)}
          disabled={loading}
          loading={loading}
        >
          单词生成
        </Button>
      </div>

      <WordDisplay words={words} onDelete={onDeleteWord} />
    </div>
  );
}