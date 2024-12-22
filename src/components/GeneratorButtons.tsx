import React from 'react';
import { RotateCcw } from 'lucide-react';

interface GeneratorButtonsProps {
  onGenerateWord: () => void;
  onReset: () => void;
  onGenerateSentence: () => void;
  onResetSentence: () => void;
  wordLoading: boolean;
  sentenceLoading: boolean;
  hasWords: boolean;
  hasSentence: boolean;
}

export function GeneratorButtons({
  onGenerateWord,
  onReset,
  onGenerateSentence,
  onResetSentence,
  wordLoading,
  sentenceLoading,
  hasWords,
  hasSentence
}: GeneratorButtonsProps) {
  return (
    <>
      <div className="flex justify-center gap-3">
        <button
          onClick={onGenerateWord}
          disabled={wordLoading}
          className="bg-[#9B9B9B] text-white px-6 py-2 rounded-none font-normal text-base
                   hover:bg-[#888888] transition-colors disabled:bg-[#DADADA]
                   min-w-[120px] tracking-wide"
        >
          {wordLoading ? '生成中...' : '单词生成'}
        </button>

        <button
          onClick={onReset}
          disabled={wordLoading || !hasWords}
          className="border border-[#9B9B9B] text-[#9B9B9B] px-4 py-2 rounded-none font-normal text-base
                   hover:bg-[#F8F8F6] transition-colors disabled:border-[#DADADA] disabled:text-[#DADADA]
                   flex items-center gap-2 min-w-[100px] tracking-wide"
        >
          <RotateCcw className="w-4 h-4" />
          重置
        </button>
      </div>

      {hasWords && (
        <div className="flex justify-center gap-3">
          <button
            onClick={onGenerateSentence}
            disabled={sentenceLoading}
            className="bg-[#9B9B9B] text-white px-6 py-2 rounded-none font-normal text-base
                     hover:bg-[#888888] transition-colors disabled:bg-[#DADADA]
                     min-w-[120px] tracking-wide"
          >
            {sentenceLoading ? '生成中...' : '生成句子'}
          </button>

          <button
            onClick={onResetSentence}
            disabled={sentenceLoading || !hasSentence}
            className="border border-[#9B9B9B] text-[#9B9B9B] px-4 py-2 rounded-none font-normal text-base
                     hover:bg-[#F8F8F6] transition-colors disabled:border-[#DADADA] disabled:text-[#DADADA]
                     flex items-center gap-2 min-w-[100px] tracking-wide"
          >
            <RotateCcw className="w-4 h-4" />
            重置句子
          </button>
        </div>
      )}
    </>
  );
}