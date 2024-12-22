export interface ZhipuConfig {
  apiKey: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface GeneratedWord {
  word: string;
  timestamp: number;
}

export interface Sentence {
  english: string;
  chinese: string;
}