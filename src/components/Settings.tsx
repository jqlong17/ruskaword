import React, { useState } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';
import type { ZhipuConfig } from '../types';

interface SettingsProps {
  config: ZhipuConfig;
  onSave: (config: ZhipuConfig) => void;
}

export function Settings({ config, onSave }: SettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState(config.apiKey);

  const handleSave = () => {
    onSave({ apiKey });
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
        aria-label="Settings"
      >
        <SettingsIcon className="w-5 h-5 text-[#484848]" />
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="设置"
      >
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="apiKey" className="text-sm text-[#484848]">
                智谱 API Key
              </label>
              <a
                href="https://bigmodel.cn/usercenter/proj-mgmt/apikeys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#CC9999] hover:text-[#BB8888] transition-colors"
              >
                领取免费key
              </a>
            </div>
            <input
              type="password"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[#EFEFEF] focus:outline-none focus:ring-2 focus:ring-[#9B9B9B] text-[#484848] placeholder-[#9B9B9B]"
              placeholder="请输入您的 API Key"
            />
          </div>
          
          <Button
            onClick={handleSave}
            className="w-full"
          >
            保存
          </Button>
        </div>
      </Modal>
    </>
  );
}