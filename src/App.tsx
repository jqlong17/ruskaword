import React, { useState } from 'react';
import { Settings } from './components/Settings';
import { WordGenerator } from './components/WordGenerator';
import { Contact } from './components/Contact';
import type { ZhipuConfig } from './types';

export default function App() {
  const [config, setConfig] = useState<ZhipuConfig>({
    apiKey: localStorage.getItem('zhipu_api_key') || '',
  });
  const [showContact, setShowContact] = useState(false);

  const handleSaveConfig = (newConfig: ZhipuConfig) => {
    setConfig(newConfig);
    localStorage.setItem('zhipu_api_key', newConfig.apiKey);
  };

  return (
    <div className="min-h-screen bg-[#F8F8F6] flex flex-col">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-[#EFEFEF] z-20">
        <div className="w-full px-6 py-4 flex items-center justify-between max-w-2xl mx-auto">
          <div className="flex-1" />
          <h1 className="text-lg font-normal text-[#484848] flex-1 text-center tracking-wide">随机单词</h1>
          <div className="flex-1 flex justify-end">
            <Settings config={config} onSave={handleSaveConfig} />
          </div>
        </div>
      </div>

      {/* Main Content with top padding for fixed header and bottom padding */}
      <div className="flex-1 pt-[72px] pb-24">
        <div className="px-6 py-8">
          <WordGenerator apiKey={config.apiKey} />
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 py-4 text-center text-xs text-[#888888] bg-white border-t border-[#EFEFEF]">
        <button 
          onClick={() => setShowContact(true)}
          className="hover:text-[#484848] transition-colors tracking-wide"
        >
          Ruska制作
        </button>
      </div>

      <Contact isOpen={showContact} onClose={() => setShowContact(false)} />
    </div>
  );
}