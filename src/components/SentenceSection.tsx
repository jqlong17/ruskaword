import React from 'react';
import { Button } from './Button';
import type { Sentence } from '../types';

interface SentenceSectionProps {
  loading: boolean;
  sentence: Sentence | null;
  onGenerate: () => void;
  onReset: () => void;
}

export function SentenceSection({ loading, sentence, onGenerate, onReset }: SentenceSectionProps) {
  return (
    <div className="space-y-6">
      <div className="inline-flex gap-3">
        <Button
          variant="secondary"
          onClick={onReset}
          disabled={loading || !sentence}
          icon
        >
          重置句子
        </Button>

        <Button
          onClick={onGenerate}
          disabled={loading}
          loading={loading}
        >
          生成句子
        </Button>
      </div>

      {sentence && (
        <div className="p-6 bg-white border border-[#EFEFEF] rounded-lg text-left">
          <p className="text-lg text-[#484848] leading-relaxed tracking-wide mb-3">
            {sentence.english}
          </p>
          <p className="text-base text-[#888888] leading-relaxed tracking-wide">
            {sentence.chinese}
          </p>
        </div>
      )}
    </div>
  );
}