import React, { useState } from 'react';
import { generateWord, generateSentence } from '../services/zhipu';
import { wordHistory } from '../services/wordHistory';
import { WordSection } from './WordSection';
import { SentenceSection } from './SentenceSection';
import type { GeneratedWord, Sentence } from '../types';

interface WordGeneratorProps {
  apiKey: string;
}

export function WordGenerator({ apiKey }: WordGeneratorProps) {
  const [words, setWords] = useState<GeneratedWord[]>([]);
  const [sentence, setSentence] = useState<Sentence | null>(null);
  const [wordLoading, setWordLoading] = useState(false);
  const [sentenceLoading, setSentenceLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleGenerateWord = async (topic: string) => {
    if (!apiKey) {
      setError('请先设置 API Key');
      return;
    }

    setWordLoading(true);
    setError('');
    
    try {
      const previousWords = words.map(w => w.word);
      const historyWords = Array.from(wordHistory.getAll());
      const newWord = await generateWord(apiKey, previousWords, historyWords, topic);
      
      wordHistory.add(newWord);
      setWords(prev => [...prev, {
        word: newWord,
        timestamp: Date.now()
      }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成失败');
    } finally {
      setWordLoading(false);
    }
  };

  const handleDeleteWord = (timestamp: number) => {
    setWords(prev => prev.filter(word => word.timestamp !== timestamp));
    setSentence(null); // Reset sentence when a word is deleted
  };

  const handleGenerateSentence = async () => {
    if (!apiKey) {
      setError('请先设置 API Key');
      return;
    }

    if (words.length === 0) {
      setError('请先生成一些单词');
      return;
    }

    setSentenceLoading(true);
    setError('');
    
    try {
      const wordList = words.map(w => w.word);
      const newSentence = await generateSentence(apiKey, wordList);
      setSentence(newSentence);
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成句子失败');
    } finally {
      setSentenceLoading(false);
    }
  };

  const handleReset = () => {
    setWords([]);
    setSentence(null);
    setError('');
  };

  const handleResetSentence = () => {
    setSentence(null);
    setError('');
  };

  return (
    <div className="text-center space-y-8 max-w-2xl mx-auto w-full">
      <WordSection
        loading={wordLoading}
        words={words}
        onGenerate={handleGenerateWord}
        onReset={handleReset}
        onDeleteWord={handleDeleteWord}
      />

      {words.length > 0 && (
        <SentenceSection
          loading={sentenceLoading}
          sentence={sentence}
          onGenerate={handleGenerateSentence}
          onReset={handleResetSentence}
        />
      )}

      {error && (
        <div className="text-[#CC9999] mt-4 tracking-wide text-sm">
          {error}
        </div>
      )}
    </div>
  );
}