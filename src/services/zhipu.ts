import { ZhipuConfig, Message, Sentence } from '../types';

const API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
const TIMEOUT_MS = 30000; // 30 seconds timeout

interface ZhipuResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

async function makeZhipuRequest(apiKey: string, messages: Message[]): Promise<ZhipuResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'glm-4-plus',
        messages
      }),
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json() as ZhipuResponse;
    return data;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function generateWord(
  apiKey: string, 
  previousWords: string[] = [], 
  historyWords: string[] = [],
  topic: string = ''
): Promise<string> {
  try {
    const allAvoidWords = [...new Set([...previousWords, ...historyWords])];
    const topicContext = topic ? `主题是"${topic}"，` : '';
    
    const content = previousWords.length === 0
      ? `${topicContext}生成一个与该主题强相关的英语单词，只返回这个单词，不要其他解释。这个单词应该是常用词汇。请避免使用以下单词：${allAvoidWords.join('、')}`
      : `已经生成了以下单词：${previousWords.join('、')}。${topicContext}请生成一个新的英语单词，这个单词应该是常用词汇，并且和已生成的单词相关（可以组成一个有意义的短语或句子）。请避免使用以下单词：${allAvoidWords.join('、')}。只返回这个单词，不要其他解释和引号。`;

    const data = await makeZhipuRequest(apiKey, [
      { role: 'user', content }
    ]);

    if (!data.choices?.[0]?.message?.content) {
      throw new Error('无效的API响应');
    }

    return data.choices[0].message.content.trim().replace(/['"]/g, '');
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('请求超时，请重试');
      }
      throw new Error(error.message);
    }
    throw new Error('生成单词失败');
  }
}

export async function generateSentence(apiKey: string, words: string[]): Promise<Sentence> {
  try {
    const wordsString = words.join('、');
    const content = `使用以下英语单词创作一个通顺流畅的英语句子：${wordsString}。只返回英语句子和对应的中文翻译，格式为：英文句子|||中文翻译`;

    const data = await makeZhipuRequest(apiKey, [
      { role: 'user', content }
    ]);

    if (!data.choices?.[0]?.message?.content) {
      throw new Error('无效的API响应');
    }

    const [english, chinese] = data.choices[0].message.content
      .trim()
      .replace(/['"*]/g, '')
      .split('|||')
      .map(str => str.trim());

    if (!english || !chinese) {
      throw new Error('无效的句子格式');
    }

    return { english, chinese };
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('请求超时，请重试');
      }
      throw new Error(error.message);
    }
    throw new Error('生成句子失败');
  }
}