class WordHistory {
  private history: Set<string> = new Set();

  add(word: string): void {
    this.history.add(word.toLowerCase());
  }

  has(word: string): boolean {
    return this.history.has(word.toLowerCase());
  }

  getAll(): Set<string> {
    return new Set(this.history);
  }

  clear(): void {
    this.history.clear();
  }
}

export const wordHistory = new WordHistory();